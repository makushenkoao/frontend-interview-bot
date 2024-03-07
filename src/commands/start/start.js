const { Markup } = require("telegraf");
const start = async (ctx) => {
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
    "С чего начнём? Выберите тему вопроса в меню 👇",
    startKeyboard,
  );
};

module.exports = start;
