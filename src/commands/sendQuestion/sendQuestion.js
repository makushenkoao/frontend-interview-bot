const getRandomQuestion = require("../../utils/getRandomQuestion/getRandomQuestion");
const { Markup } = require("telegraf");
const sendQuestion = async (ctx) => {
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
};

module.exports = sendQuestion;
