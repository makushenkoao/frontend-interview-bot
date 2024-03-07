const getCorrectAnswer = require("../../utils/getCorrectAnswer/getCorrectAnswer");
const sendAnswer = async (ctx) => {
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
  await ctx.reply(`Неверно ❌\n\nПравильный ответ: ${answer}`);
  await ctx.answerCbQuery();
};

module.exports = sendAnswer;
