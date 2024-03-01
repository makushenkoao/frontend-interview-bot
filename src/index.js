require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const { getRandomQuestion, getCorrectAnswer } = require("./utils/utils");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("start", async (ctx) => {
    const startKeyboard = Markup.keyboard([
        ["HTML", "CSS"],
        ["JavaScript", "React"],
        ["Случайный вопрос"],
    ]).resize();
    await ctx.reply(
        "Привет! Я - Frontend Interview Prep Bot 🤖 \nЯ помогу тебе подготовиться к интервью по фронтенду",
    );
    await ctx.reply("С чего начнем? Выбери тему вопроса в меню 👇", startKeyboard);
});

bot.hears(
    ["HTML", "CSS", "JavaScript", "React", "Случайный вопрос"],
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
