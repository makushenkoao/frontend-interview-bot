require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const { getRandomQuestion, getCorrectAnswer } = require("./utils/utils");
const axios = require("axios");
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("start", async (ctx) => {
  const startKeyboard = Markup.keyboard([
    ["HTML", "CSS"],
    ["JavaScript", "TypeScript", "Node"],
    ["React", "RN", "Next"],
    ["Случайный вопрос"],
  ]).resize();
  await ctx.reply(
    "Привет! Я - Frontend Interview Bot 🤖 \nЯ помогу тебе подготовиться к собеседованию по frontend",
  );
  await ctx.reply(
    "С чего начнеём? Выберите тему вопроса в меню 👇",
    startKeyboard,
  );
});

bot.command("learn", async (ctx) => {
  const message = await ctx.reply(
    "Немного подождите, идёт загрузка PDF-файла...",
  );

  try {
    const pdfUrl =
      "https://drive.google.com/file/d/1XEP6rMbC2RJtct8q5z9QvCLrehtsaAt8/view?usp=sharing";
    const pdfResponse = await axios.get(pdfUrl, {
      responseType: "arraybuffer",
    });

    await ctx.replyWithDocument({
      source: Buffer.from(pdfResponse.data),
      filename: "notes.pdf",
    });

    await ctx.deleteMessage(message.message_id);
  } catch (error) {
    console.error("Error sending PDF:", error);
    ctx.reply("К сожалению, при отправке PDF-файла произошла ошибка.");
  }
});

bot.command("docs", async (ctx) => {
  const buttons = [
    { text: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { text: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    {
      text: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    { text: "React", url: "https://reactjs.org/docs/getting-started.html" },
    { text: "React Native", url: "https://reactnative.dev/" },
    { text: "Node.js", url: "https://nodejs.org/ru/docs/" },
    { text: "Angular", url: "https://angular.io/" },
    { text: "Vue", url: "https://vuejs.org/" },
    { text: "Next", url: "https://nextjs.org/" },
    { text: "TypeScript", url: "https://www.typescriptlang.org/" },
  ];

  await ctx.reply("Выберите то, что Вас интересует:", {
    reply_markup: {
      inline_keyboard: buttons.map((button) => [
        { text: button.text, url: button.url },
      ]),
    },
  });
});

bot.hears(
  [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node",
    "Next",
    "TypeScript",
    "RN",
    "Случайный вопрос",
  ],
  async (ctx) => {
    const topic = ctx.message.text.toLowerCase();
    const { question, questionTopic } = getRandomQuestion(topic);

    let inlineKeyboard;

    if (question.hasOptions) {
      const buttonRows = question.options.map((option) => [
        Markup.button.callback(
          option.text,
          JSON.stringify({
            type: `${questionTopic}-option`,
            isCorrect: option.isCorrect,
            questionId: question.id,
          }),
        ),
      ]);

      inlineKeyboard = Markup.inlineKeyboard(buttonRows);
    } else {
      inlineKeyboard = Markup.inlineKeyboard([
        Markup.button.callback(
          "Узнать ответ",
          JSON.stringify({
            type: questionTopic,
            questionId: question.id,
          }),
        ),
      ]);
    }

    await ctx.reply(question.text, inlineKeyboard);
  },
);

bot.action(/.*/, async (ctx) => {
  const callbackData = JSON.parse(ctx.callbackQuery.data);

  if (!callbackData.type.includes("option")) {
    const answer = getCorrectAnswer(callbackData.type, callbackData.questionId);
    await ctx.reply(answer, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
    await ctx.answerCbQuery();
    return;
  }

  if (callbackData.isCorrect) {
    await ctx.reply("Верно ✅");
    await ctx.answerCbQuery();
    return;
  }

  const answer = getCorrectAnswer(
    callbackData.type.split("-")[0],
    callbackData.questionId,
  );
  await ctx.reply(`Неверно ❌ Правильный ответ: ${answer}`);
  await ctx.answerCbQuery();
});

bot.catch((err, ctx) => {
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  console.error(err);
});

bot.launch();
