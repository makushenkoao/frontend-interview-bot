const axios = require('axios');

const downloadAndSendPdfFile = async (ctx, fileId, fileName) => {
    const baseUrl = 'https://drive.google.com/uc?export=download';

    try {
        const message = await ctx.reply(
            'Немного подождите, идёт загрузка PDF-файла...',
        );

        const response = await axios.get(`${baseUrl}&id=${fileId}`, {
            responseType: 'arraybuffer',
        });

        await ctx.replyWithDocument({
            source: Buffer.from(response.data),
            filename: `${fileName}.pdf`,
        });

        await ctx.deleteMessage(message.message_id);
    } catch (error) {
        console.error('Error sending PDF:', error);
        ctx.reply('К сожалению, при отправке PDF-файла произошла ошибка.');
    }
};

module.exports = downloadAndSendPdfFile;
