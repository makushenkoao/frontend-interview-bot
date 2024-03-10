const { Markup } = require('telegraf');

const donate = (ctx) => {
    const buttons = Markup.inlineKeyboard([
        Markup.button.url(
            'Paypal',
            'https://www.paypal.com/donate/?hosted_button_id=3RYKE5FSXQ95Y',
        ),
    ]);

    ctx.replyWithMarkdown('*Monobank* - 4441 1144 2707 0931', buttons);
};

module.exports = donate;
