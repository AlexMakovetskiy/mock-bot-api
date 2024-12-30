class BotController {
    async wakeupAction(request, response, next) {
        response
            .status(200)
            .send("Wake up action");
    }

    async handleOptions(request, response, next) {
        response.header('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN);
        response.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Server,Date,access-control-allow-methods,access-control-allow-origin');
        response.header('Access-Control-Allow-Methods','POST,OPTIONS');
        response.send('data');
    } 
}

module.exports = new BotController();