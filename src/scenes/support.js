const { Scenes, Markup } = require('telegraf');
const nodemailer = require('nodemailer');

const buttons = Markup.keyboard([
    Markup.button.callback('Отменть операцию', 'cancel'),
]).resize();

async function handleCancel(ctx) {
    await ctx.reply('Операция отменена.', Markup.removeKeyboard());
    return ctx.scene.leave();
}

const cancelText = 'скасувати операцію';

const supportScene = new Scenes.WizardScene(
    'supportScene',
    async (ctx) => {
        await ctx.reply(
            'Заполните форму, чтобы мы могли связаться с Вами.\n\nВведите имя:',
            buttons,
        );
        ctx.wizard.state.userData = {};
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text.toLowerCase() === cancelText) {
            return handleCancel(ctx);
        }
        ctx.wizard.state.userData.firstName = ctx.message.text;
        await ctx.reply('Введите фамилию:', buttons);
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text.toLowerCase() === cancelText) {
            return handleCancel(ctx);
        }
        ctx.wizard.state.userData.lastName = ctx.message.text;
        await ctx.reply('Введите электронную почту', buttons);
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text.toLowerCase() === cancelText) {
            return handleCancel(ctx);
        }
        ctx.wizard.state.userData.email = ctx.message.text;
        await ctx.reply('Введить сообщения', buttons);
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text.toLowerCase() === cancelText) {
            return handleCancel(ctx);
        }

        ctx.wizard.state.userData.message = ctx.message.text;

        const user = ctx.wizard.state.userData;

        const data = `Имя: ${user.firstName}\nФамилия: ${user.lastName}\nЭлектронная почта: ${user.email}\nСообщения: ${user.message}`;

        const reply = `Спасибо! Ваши данные получены:\n\n${data}\n\nОжидайте!`;

        await ctx.reply(reply, Markup.removeKeyboard());

        try {
            const emailMessage = `User's data:
                1. First name - ${user.firstName}
                2. Last name - ${user.lastName}
                3. Email - ${user.email}
                4. Message - ${user.message}
            `;

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });

            const mailOptions = {
                from: user.email,
                to: process.env.EMAIL,
                subject:
                    'Новое сообщение из формы службы поддержки бота "Interview Frontend Bot"',
                text: emailMessage,
            };

            await transporter.sendMail(mailOptions);

            console.log('Email sent successfully.');
        } catch (error) {
            console.log(error);
            console.error('Error sending data to server:', error.message);
        }

        return ctx.scene.leave();
    },
);

module.exports = supportScene;
