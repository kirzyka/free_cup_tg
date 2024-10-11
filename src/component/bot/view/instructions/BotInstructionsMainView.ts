import { BotCommand } from "@/app/api/bot/BotCommand";
import { getTranslationFn } from "@/i18n/Translations";
import { Context } from "grammy";

export const botInstructionsMainView = async (ctx: Context) => {
    const lang: string | undefined = ctx.from?.language_code;
    const t = getTranslationFn(lang);

    const instructionMessage = t("BOT_INSTRUCTION_MAIN_MSG");

    await ctx.answerCallbackQuery();
    await ctx.reply(instructionMessage, {
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: t("BOT_INSTRUCTION_BARISTA_BTN_TEXT"),
                        callback_data: BotCommand.SHOW_INSTRUCTIONS_BARISTA,
                    },
                    {
                        text: t("BOT_INSTRUCTION_CLIENT_BTN_TEXT"),
                        callback_data: BotCommand.SHOW_INSTRUCTIONS_CLIENT,
                    },
                ],
                [
                    {
                        text: t("BOT_INSTRUCTION_SECURITY_BTN_TEXT"),
                        callback_data: BotCommand.SHOW_INSTRUCTIONS_SECURITY,
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
