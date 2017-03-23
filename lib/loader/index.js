


/**
 * Module dependencies.
 */

const Router = require('koa-router');
//const Resource = require('koa-resource-router');
const debug = require('debug')('api');
const path = require('path');
const fs = require('fs');
const join = path.resolve;
const readdir = fs.readdirSync;
const Resource = require('../router/Resource');

class Loader {
    constructor(app) {
        this.app = app;
        let root = app.rootDir + '/api';
        readdir(root).forEach((file) => {
            let dir = join(root, file);
            console.log(dir);
            let stats = fs.lstatSync(dir);
            if (stats.isDirectory()) {
                let conf = require(dir + '/config.json');
                conf.name = file;
                conf.directory = dir;
                if (conf.routes) this.route(conf);
                else this.resource(conf);
            }
        });
    }

    route(conf) {
        debug('routes: %s', conf.name);
        let controller = new (require(conf.directory))();

        for (let key in conf.routes) {
            let actionName = conf.routes[key];
            let method = key.split(' ')[0];
            let path = key.split(' ')[1];
            debug('%s %s -> .%s', method, path, actionName);

            let action = controller[actionName];
            if (!action) throw new Error(`action ${conf.name}.${actionName} is not defined`);

            this.app.router[method.toLowerCase()](path, action);
        }
    }

    resource(conf) {
        if (!conf.name) throw new Error('Name in ' + conf.directory + '/config.json is required');
        debug('resource: %s', conf.name);

        let controller = new (require(conf.directory))();
        Resource.init(this.app.router, conf.name, controller);
    }
}

module.exports = Loader;