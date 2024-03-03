require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const { getRandomQuestion, getCorrectAnswer } = require("./utils/utils");
const path = require("path");

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

bot.command("learn1", async (ctx) => {
    const pdfFilePath = path.join(__dirname, "..", "..", "databases", "web.pdf");
    console.log(pdfFilePath)
    const message = await ctx.reply(
        "Немного подождите, идёт загрузка PDF-файла...",
    );

    try {
        await ctx.replyWithDocument({ source: pdfFilePath });

        await ctx.deleteMessage(message.message_id);
    } catch (error) {
        console.error("Error sending PDF file:", error);
        await ctx.reply(
            "Произошла ошибка при отправке PDF-файла. Воспользуйтесь командой позже.",
        );
    }
});

bot.command("learn2", async (ctx) => {
    const pdfFilePath = path.join(__dirname, "..", "databases", "web.pdf");
    const message = await ctx.reply(
        "Немного подождите, идёт загрузка PDF-файла...",
    );

    try {
        await ctx.replyWithDocument({ source: pdfFilePath });

        await ctx.deleteMessage(message.message_id);
    } catch (error) {
        console.error("Error sending PDF file:", error);
        await ctx.reply(
            "Произошла ошибка при отправке PDF-файла. Воспользуйтесь командой позже.",
        );
    }
});

bot.command("learn3", async (ctx) => {
    const pdfFilePath = path.join(__dirname, "..", "..", "..", "databases", "web.pdf");
    const message = await ctx.reply(
        "Немного подождите, идёт загрузка PDF-файла...",
    );

    try {
        await ctx.replyWithDocument({ source: pdfFilePath });

        await ctx.deleteMessage(message.message_id);
    } catch (error) {
        console.error("Error sending PDF file:", error);
        await ctx.reply(
            "Произошла ошибка при отправке PDF-файла. Воспользуйтесь командой позже.",
        );
    }
});

bot.command("learn4", async (ctx) => {
    const pdfFilePath = '../../databases/web.pdf'
    const message = await ctx.reply(
        "Немного подождите, идёт загрузка PDF-файла...",
    );

    try {
        await ctx.replyWithDocument({ source: pdfFilePath });

        await ctx.deleteMessage(message.message_id);
    } catch (error) {
        console.error("Error sending PDF file:", error);
        await ctx.reply(
            "Произошла ошибка при отправке PDF-файла. Воспользуйтесь командой позже.",
        );
    }
});

bot.command("learn5", async (ctx) => {
    const pdfFilePath = '../../../databases/web.pdf'
    const message = await ctx.reply(
        "Немного подождите, идёт загрузка PDF-файла...",
    );

    try {
        await ctx.replyWithDocument({ source: pdfFilePath });

        await ctx.deleteMessage(message.message_id);
    } catch (error) {
        console.error("Error sending PDF file:", error);
        await ctx.reply(
            "Произошла ошибка при отправке PDF-файла. Воспользуйтесь командой позже.",
        );
    }
});

bot.command("learn6", async (ctx) => {
    const pdfFilePath = '../databases/web.pdf'
    const message = await ctx.reply(
        "Немного подождите, идёт загрузка PDF-файла...",
    );

    try {
        await ctx.replyWithDocument({ source: pdfFilePath });

        await ctx.deleteMessage(message.message_id);
    } catch (error) {
        console.error("Error sending PDF file:", error);
        await ctx.reply(
            "Произошла ошибка при отправке PDF-файла. Воспользуйтесь командой позже.",
        );
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
    ["HTML", "CSS", "JavaScript", "React", "Node", "Next", "TypeScript", "RN", "Случайный вопрос"],
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

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    await bot.handleUpdate(body)
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};
