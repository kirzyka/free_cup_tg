import { getTranslationFn } from "@/i18n/Translations";
import { Context } from "grammy";

export const botInstructionsView = async (ctx: Context) => {
    const lang: string | undefined = ctx.from?.language_code;
    const t = getTranslationFn(lang);

    const instructionMessage = t("BOT_INSTRUCTION_MESSAGE");

    await ctx.answerCallbackQuery();
    await ctx.reply(instructionMessage);
};