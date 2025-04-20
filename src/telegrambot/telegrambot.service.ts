import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegrambotService {
  private bot: Telegraf;

  private readonly chatId = process.env.CHATID!;
  private readonly botToken = process.env.BOT_TOKEN!;

  constructor() {
    this.bot = new Telegraf(this.botToken);
  }

  async sendMessage(order: any) {
    const message = `
🆕 YANGI ORDER

👤 Foydalanuvchi: ${order.User.full_name}
📞 Telefon: ${order.User.phone}
📍 Manzil: ${order.address}
💰 Summa: ${order.total_sum}
💳 To‘lov: ${order.payment_type}
📦 Yetkazib berish: ${order.with_delivery ? 'Ha' : 'Yo‘q'}
📝 Izoh: ${order.comment_delivery ?? '—'}

🛠 Buyurtma:
${order.OrderItems.map(
  (item: any, idx: any) =>
    `#${idx + 1}: 
        Measure: ${item.measure}, 
        Time: ${item.time}, 
        Tool: ${item.Tool ? item.Tool.name_uz : null}, 
        Level: ${item.Level ? item.Level.name_uz : null}, 
        Profession: ${item.Profession ? item.Profession.name_uz : null}, 
        Count: ${item.count} `,
).join('\n')}`;

    try {
      await this.bot.telegram.sendMessage(this.chatId, message);
    } catch (error) {
      console.error('Telegram error:', error);
    }
  }
}
