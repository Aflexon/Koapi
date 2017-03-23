/**
 * Module dependencies.
 */

const compress = require('koa-compress');
const Koa = require('koa');
const logger = require('koa-logger');
const Loader = require('./lib/loader');
const ratelimit = require('koa-ratelimit');
const redis = require('redis');
const Router = require('koa-router');
const responseTime = require('koa-response-time');

/**
 * Environment.
 */

const env = process.env.NODE_ENV || 'development';

class Api {
    constructor(opts) {
        opts = opts || {};
        this.app = new Koa();
        this.rootDir = __dirname;

        // logging
        if ('test' != env) this.app.use(logger());

        // x-response-time
        this.app.use(responseTime());

        // compression
        this.app.use(compress());

        // rate limiting
        this.app.use(ratelimit({
            max: opts.ratelimit,
            duration: opts.duration,
            db: redis.createClient()
        }));

        this.router = new Router();
        this.app.use(this.router.routes());

        // boot
        this.loader = new Loader(this);
    }
}

module.exports = Api;