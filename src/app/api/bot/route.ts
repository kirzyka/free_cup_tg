import { ROOT_URL } from "@/constClient";
import { BOT_KEY } from "@/constServer";
import { getTranslationFn } from "@/i18n/Translations";
import { Bot, webhookCallback } from "grammy";

const bot = new Bot(BOT_KEY);

bot.on("message:text", async (ctx) => {
  //const chatId = ctx.chat.id;
  const text = ctx.message.text;
  const lang = ctx.from.language_code;
  const t = getTranslationFn(lang); 

  if (text === "/start") {
    const imgUrl: string = "https://free-cup-tg.vercel.app/images/cup_c_e.png";
    const btnText: string = "FreeCup";

    const keyboard = {
      inline_keyboard: [
        [
          {
            text: btnText, // Текст кнопки
            web_app: {
              url: ROOT_URL, // URL вашего мини-приложения
            },
          },
        ],
        [
          {
            text: t("BOT_INSTRUCTION_BUTTON_TEXT"), // Локализованный текст для инструкции
            callback_data: "show_instruction", // Callback для инструкции
          },
        ],
        [
          {
            text: "Adroid version of App",
            url: "https://play.google.com/store/apps/details?id=com.kirzyka.freecup",
          }
        ]
      ],
    };

    await ctx.replyWithPhoto(imgUrl, {
      caption: t("BOT_START_DESCRIPTION"),
      reply_markup: keyboard,
    });
    return;
  }
  /*
  if (text === "/link") {
    await ctx.reply("FreeCup: ", {
      reply_markup: new InlineKeyboard().url(
        "Android version",
        "https://free-cup-tg.vercel.app"
      ),
    });
    return;
  }
  */

  await ctx.reply(ctx.message.text);
});

bot.on("callback_query:data", async (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  
  // Обрабатываем нажатие на кнопку "Инструкция"
  if (callbackData === "show_instruction") {
    const lang = ctx.from.language_code; // Язык пользователя
    const t = getTranslationFn(lang); // Функция перевода для инструкций

    // Получаем текст инструкции из файла локализации
    const instructionMessage = t("BOT_INSTRUCTION_MESSAGE");

    // Отправляем инструкцию
    await ctx.answerCallbackQuery();
    await ctx.reply(instructionMessage);
  }
});

export const POST = webhookCallback(bot, "std/http");
