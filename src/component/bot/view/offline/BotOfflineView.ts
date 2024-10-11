import { BotCommand } from "@/app/api/bot/BotCommand";
import { getTranslationFn } from "@/i18n/Translations";
import { Context } from "grammy";

export const botOfflineView = async (ctx: Context) => {
    const lang: string | undefined = ctx.from?.language_code;
    const t = getTranslationFn(lang);

    const message = t("BOT_OFFLINE_MESSAGE");

    await ctx.answerCallbackQuery();
    await ctx.reply(message, {        
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Android",
                        url: "https://play.google.com/store/apps/details?id=com.kirzyka.freecup",
                    },
                ],
                [
                    {
                        text: t("CMN_BACK"),
                        callback_data: BotCommand.SHOW_MAIN,
                    },
                ],
            ],
        },
    });
};