import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EskizService } from './eskiz/eskiz.service';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { UsersModule } from './users/users.module';
import { BrandModule } from './brand/brand.module';
import { SizeModule } from './size/size.module';
import { CapacityModule } from './capacity/capacity.module';
import { UploadModule } from './upload/upload.module';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { ToolsModule } from './tools/tools.module';
import { LevelsModule } from './levels/levels.module';
import { ProfessionsModule } from './professions/professions.module';
import { OrderModule } from './order/order.module';
import { MasterModule } from './master/master.module';
import { BacketitemsModule } from './backetitems/backetitems.module';
import { CommentsModule } from './comments/comments.module';
import { InfoModule } from './info/info.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { PartnersModule } from './partners/partners.module';
import { SessionModule } from './session/session.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegrambotModule } from './telegrambot/telegrambot.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CloudinaryModule.forRootAsync({
      useFactory: () => ({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    PrismaModule,
    RegionModule,
    UsersModule,
    BrandModule,
    SizeModule,
    CapacityModule,
    UploadModule,
    ToolsModule,
    LevelsModule,
    ProfessionsModule,
    OrderModule,
    MasterModule,
    BacketitemsModule,
    CommentsModule,
    InfoModule,
    ContactModule,
    FaqModule,
    ShowcaseModule,
    PartnersModule,
    SessionModule,
    TelegrambotModule,
  ],
  controllers: [AppController],
  providers: [AppService, EskizService],
})
export class AppModule {}
