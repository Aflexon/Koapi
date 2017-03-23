var stats = {
    requests: 100000,
    average_duration: 52,
    uptime: 123123132
};

class StatsController {
    constructor() {

    }

    async all(ctx) {
        ctx.body = stats;
    }

    async get(ctx) {
        ctx.body = stats[ctx.params.name];
    }
}

module.exports = StatsController;