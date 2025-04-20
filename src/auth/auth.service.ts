import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ActivateDto,
  CreateAuthDto,
  LoginAuthDto,
  ResetPasswordDto,
  SendOtpDto,
} from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EskizService } from 'src/eskiz/eskiz.service';
import * as DeviceDetector from 'device-detector-js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { totp } from 'otplib';
import { CreateAdminDto } from './dto/create-admin.dto';
totp.options = { step: 600, digits: 5 };

@Injectable()
export class AuthService {
  private ACCKEY = process.env.ACCKEY;
  private REFKEY = process.env.REFKEY;
  private OTPKEY = process.env.OTPKEY;
  private deviceDetector = new DeviceDetector();

  constructor(
    private prisma: PrismaService,
    private eskizService: EskizService,
    private jwtServices: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { company, ...data } = createAuthDto;
    try {
      const user = await this.prisma.user.findUnique({
        where: { phone: data.phone },
      });
      if (user) {
        throw new ConflictException('User already exists');
      }

      if (data.region_id) {
        const region = await this.prisma.region.findUnique({
          where: { id: data.region_id },
        });
        if (!region) {
          throw new NotFoundException('Not found region');
        }
      }

      const hashedpassword = await bcrypt.hash(data.password, 10);
      const newUser = await this.prisma.user.create({
        data: { ...data, password: hashedpassword },
      });

      if (newUser.role == 'USER_YUR' && company) {
        const newCompany = await this.prisma.company.create({
          data: { ...company, user_id: newUser.id },
        });
      }

      const otp = totp.generate(this.OTPKEY + data.phone);
      // await this.eskizService.sendSMS(otp, data.phone);

      return {
        otp,
        data: 'Registration was successful. The code was sent to your phone number, please activate your account',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  async login(loginAuthDto: LoginAuthDto, req: Request) {
    const { phone, password } = loginAuthDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { phone } });
      if (!user) {
        throw new UnauthorizedException('Not found user');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new UnauthorizedException('Phone number or password is wrong');
      }

      if (!user.status) {
        throw new ForbiddenException(
          'Your account is not active, please activate your account',
        );
      }

      const session = await this.prisma.session.findFirst({
        where: { ip_address: req.ip, user_id: user.id },
      });

      if (!session) {
        const useragent: any = req.headers['user-agent'];
        const device = this.deviceDetector.parse(useragent);

        const newSession: any = {
          ip_address: req.ip,
          user_id: user.id,
          device: { ...device },
        };

        await this.prisma.session.create({
          data: newSession,
        });
      }

      const payload = { id: user.id, role: user.role };
      const accessToken = this.genAccessToken(payload);
      const refreshToken = this.genRefreshToken(payload);

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  async sendOTP(sendOtpDto: SendOtpDto) {
    const { phone } = sendOtpDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { phone } });
      if (!user) {
        throw new UnauthorizedException('Not found user');
      }

      const otp = totp.generate(this.OTPKEY + phone);
      // await this.eskizService.sendSMS(otp, phone)

      return { data: 'OTP sent to your phone number', otp };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  async activate(activateDto: ActivateDto) {
    const { phone, otp } = activateDto;
    try {
      const isValid = totp.check(otp, this.OTPKEY + phone);
      if (!isValid) {
        throw new UnauthorizedException('OTP code or phone number is wrong');
      }

      await this.prisma.user.update({
        where: { phone },
        data: { status: true },
      });

      return { data: 'Your account has been successfully activated' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { phone, otp, newPassword } = resetPasswordDto;
    try {
      const isValid = totp.check(otp, this.OTPKEY + phone);
      if (!isValid) {
        throw new UnauthorizedException('OTP code or phone number is wrong');
      }

      const hashedpassword = await bcrypt.hash(newPassword, 10);
      await this.prisma.user.update({
        where: { phone },
        data: { password: hashedpassword },
      });

      return { data: 'Your password updated successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  async logout(req: Request) {
    const user = req['user'];
    try {
      await this.prisma.session.deleteMany({
        where: { ip_address: req.ip, user_id: user.id },
      });

      return { data: 'Logged out successfully' };
    } catch (error) {
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  async createAdmin(createAdmin: CreateAdminDto) {
    try {
      const hashedpassword = await bcrypt.hash(createAdmin.password, 10);
      let data = await this.prisma.user.create({
        data: { ...createAdmin, status: true, password: hashedpassword },
        omit: { password: true },
      });

      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async me(req: Request) {
    const user = req['user'];
    try {
      const session = await this.prisma.session.findFirst({
        where: { ip_address: req.ip, user_id: user.id },
      });

      if (!session) {
        throw new UnauthorizedException();
      }

      const data = await this.prisma.user.findUnique({
        where: { id: user.id },
        omit: { password: true },
        include: {
          Company: true,
          Order: true,
          BacketItems: true,
          Region: true,
          Comment: {
            include: { MasterRatings: { include: { Master: true } } },
          },
        },
      });

      return { data };
    } catch (error) {
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  async myBacket(req: Request) {
    const user = req['user'];
    try {
      const backets = await this.prisma.backetItems.findMany({
        where: { user_id: user.id },
        include: {
          Level: true,
          Profession: true,
          Tool: true,
          User: { omit: { password: true } },
        },
      });

      return { data: backets };
    } catch (error) {
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  async mysession(req: Request) {
    const user = req['user'];
    try {
      const sessions = await this.prisma.session.findMany({
        where: { user_id: user.id },
      });

      return { data: sessions };
    } catch (error) {
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  async myorders(req: Request) {
    const user = req['user'];
    try {
      const orders = await this.prisma.order.findMany({
        where: { user_id: user.id },
        include: {
          OrderItems: {
            include: { Level: true, Tool: true, Profession: true },
          },
        },
      });

      return { data: orders };
    } catch (error) {
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  refreshToken(req: Request) {
    const user = req['user'];
    try {
      const accessToken = this.genAccessToken({ id: user.id, role: user.role });

      return { accessToken };
    } catch (error) {
      throw new BadRequestException(error?.message || 'Something went wrong');
    }
  }

  genAccessToken(payload: any) {
    return this.jwtServices.sign(payload, {
      secret: this.ACCKEY,
      expiresIn: '12h',
    });
  }

  genRefreshToken(payload: any) {
    return this.jwtServices.sign(payload, {
      secret: this.REFKEY,
      expiresIn: '7d',
    });
  }
}
