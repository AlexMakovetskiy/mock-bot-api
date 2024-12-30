const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require("cors");

const apiRoutes = require("./routes/api-routes");
const botIncomeMassages = require("./helpers/botMassages");
const nutritionTips = require("./helpers/nutritionTips");

const app = express();

const mockPort = 6062;
const mainPort = process.env.PORT || mockPort;

const bot = new TelegramBot(process.env.TOKEN_BOT, { polling: true });

let currentCategory = '';

bot.onText(botIncomeMassages.start, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я чат-бот по правильному питанию. Выберите категорию советов: /breakfast, /lunch, /dinner');
});

bot.onText(botIncomeMassages.continue, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Выберите категорию советов: /breakfast, /lunch, /dinner');
});

bot.onText(botIncomeMassages.breakfast, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[2];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.lunch, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[3];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.dinner, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[4];
    sendRandomTip(msg.chat.id);
});

function sendRandomTip(chatId) {
    const tips = nutritionTips[currentCategory];

    if (tips && tips.length > 0) {
        const randomIndex = Math.floor(Math.random() * tips.length);
        bot.sendMessage(chatId, `Совет: ${tips[randomIndex]}. Чтобы продолжить, введите /continue.`);
    }
}

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: 'GET,OPTIONS',
    secure: true,
}));
app.use('', apiRoutes);

app.disable('x-powered-by');

const start = async () => {
    try {
        app.listen(mainPort, (error) => {
            error ? console.log(error) : console.log(`Server opened in PORT: ${mainPort}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();