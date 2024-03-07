const db = require('../../../databases/main.json');
const downloadAndSendPdfFile = require('../../utils/downloadAndSendPdfFile/downloadAndSendPdfFile');

const lessonDetails = async (ctx) => {
    const sectionMatch = ctx.match[1];
    const themeMatch = ctx.match[2];

    const data = db[sectionMatch][themeMatch];

    if (!data || !data.fileId) {
        return ctx.reply('Скоро завезем конспект!');
    }

    await downloadAndSendPdfFile(ctx, data.fileId, data.title);
};

module.exports = lessonDetails;
