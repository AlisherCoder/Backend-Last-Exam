import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TelegrambotModule } from 'src/telegrambot/telegrambot.module';

@Module({
  imports: [TelegrambotModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
