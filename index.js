require('dotenv').config();
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const apiRoutes = require("./routes/api-routes");
const botIncomeMassages = require("./helpers/botMassages");
const financeTips = require("./helpers/financeTips");

const app = express();

const bot = new TelegramBot(process.env.TOKEN_BOT, { polling: true });

const mockPort = 6061;
const mainPort = process.env.PORT || mockPort;

let currentCategory = '';

bot.onText(botIncomeMassages.start, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я чат-бот по финансовым советам. Выберите категорию советов: /saving, /investing, /debt_management, /retirement_planning, /fin_security, /tax_planning, /fin_insurance, /inheritance_management, /education_of_children, /buying_house, /budgeting, /financial_literacy, /fin_goals, /fin_pillow, /fin_partnering, /fin_instruments, /future_fin_plans, /fin_independency, /tax_strategy, /fin_responsibility');
});

bot.onText(botIncomeMassages.continue, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Выберите категорию советов: /saving, /investing, /debt_management, /retirement_planning, /fin_security, /tax_planning, /fin_insurance, /inheritance_management, /education_of_children, /buying_house, /budgeting, /financial_literacy, /fin_goals, /fin_pillow, /fin_partnering, /fin_instruments, /future_fin_plans, /fin_independency, /tax_strategy, /fin_responsibility');
});

bot.onText(botIncomeMassages.investing, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[2];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.saving, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[3];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.debt_management, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[4];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.retirement_planning, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[5];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.fin_security, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[6];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.tax_planning, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[7];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.fin_insurance, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[8];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.inheritance_management, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[9];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.education_of_children, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[10];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.buying_house, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[11];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.budgeting, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[12];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.financial_literacy, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[13];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.fin_goals, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[14];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.fin_pillow, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[15];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.fin_partnering, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[16];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.fin_instruments, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[17];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.future_fin_plans, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[18];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.fin_independency, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[19];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.tax_strategy, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[20];
    sendRandomTip(msg.chat.id);
});

bot.onText(botIncomeMassages.fin_responsibility, (msg) => {
    currentCategory = Object.keys(botIncomeMassages)[21];
    sendRandomTip(msg.chat.id);
});

function sendRandomTip(chatId) {
    const tips = financeTips[currentCategory];

    if (tips && tips.length > 0) {
        const randomIndex = Math.floor(Math.random() * tips.length);
        bot.sendMessage(chatId, `Совет: ${tips[randomIndex]}. Чтобы продолжить, введите /continue.`);
    }
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (financeTips[currentCategory] && financeTips[currentCategory].includes(messageText)) {
        bot.sendMessage(chatId, `Совет: ${messageText}. Чтобы продолжить, введите /start.`);
    }
});

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