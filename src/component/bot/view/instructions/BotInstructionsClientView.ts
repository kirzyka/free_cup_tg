import { BotCommand } from "@/app/api/bot/BotCommand";
import { getTranslationFn } from "@/i18n/Translations";
import { Context } from "grammy";

export const botInstructionsClientView = async (ctx: Context) => {
    const lang: string | undefined = ctx.from?.language_code;
    const t = getTranslationFn(lang);

    const instructionMessage = t("BOT_INSTRUCTION_CLIENT_MSG");

    await ctx.answerCallbackQuery();
    await ctx.reply(instructionMessage, {
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: t("CMN_BACK"),
                        callback_data: BotCommand.SHOW_INSTRUCTIONS_MAIN,
                    },
                ],
            ],
        },
    });
};
