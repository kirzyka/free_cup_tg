import { BotCommand } from "@/app/api/bot/BotCommand";
import { ROOT_URL } from "@/constClient";
import { getTranslationFn } from "@/i18n/Translations";
import { Context } from 'grammy';

export const botMainView = async (ctx: Context) => {
    const lang: string | undefined = ctx.from?.language_code;
    const t = getTranslationFn(lang); 
    const imgUrl: string = "https://free-cup-tg.vercel.app/images/cup_c_e.png";
    const btnText: string = "FreeCup";
    const keyboard = {
        inline_keyboard: [
          [
            {
              text: btnText,
              web_app: {
                url: ROOT_URL,
              },
            },
          ],
          [
            {
              text: t("BOT_INSTRUCTION_BTN_TEXT"),
              callback_data: BotCommand.SHOW_INSTRUCTION,
            },
          ],
          [
            {
              text: t("BOT_OFFLINE_BTN_TEXT"),
              callback_data: BotCommand.SHOW_OFFLINE,
            }
          ]
        ],
    };

    return await ctx.replyWithPhoto(imgUrl, {
        caption: t("BOT_START_DESCRIPTION"),
        reply_markup: keyboard,
    });
}