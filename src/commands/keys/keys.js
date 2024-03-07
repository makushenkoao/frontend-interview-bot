const axios = require("axios");
const { Markup } = require("telegraf");

const keys = async (ctx) => {
  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback("English", "download-keys-en")],
    [Markup.button.callback("Руссикй", "download-keys-ru")],
    [Markup.button.callback("Українська", "download-keys-ua")],
  ]);

  await ctx.replyWithMarkdown("Выберите язык PDF файла:", keyboard);
};

const sendKeys = async (ctx) => {
  const lang = ctx.match[1];

  const baseUrl = "https://drive.google.com/uc?export=download";
  let fileId = "";

  if (lang === "ru") fileId = "1PPt8KA67uyHbBzQCSLfMTxnLMv6HG0nO";
  else if (lang === "ua") fileId = "1XEP6rMbC2RJtct8q5z9QvCLrehtsaAt8";
  else fileId = "15-vjSkGHrtf5c4xEtF54F6zCdieTZ0gf";

  const message = await ctx.reply(
    "Немного подождите, идёт загрузка PDF-файла...",
  );

  try {
    const pdfResponse = await axios.get(`${baseUrl}&id=${fileId}`, {
      responseType: "arraybuffer",
    });

    await ctx.replyWithDocument({
      source: Buffer.from(pdfResponse.data),
      filename: `keys-${lang}.pdf`,
    });

    await ctx.deleteMessage(message.message_id);
  } catch (error) {
    console.error("Error sending PDF:", error);
    ctx.reply("К сожалению, при отправке PDF-файла произошла ошибка.");
  }
};

module.exports = {
  keys,
  sendKeys,
};
