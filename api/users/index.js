
/**
 * Module dependencies.
 */

/**
 * This file illustrates using resourceful
 * routing using the koa-router module.
 */

var users = {
  tobi: {
    name: 'tobi',
    age: 3,
    species: 'ferret'
  },

  loki: {
    name: 'loki',
    age: 2,
    species: 'ferret'
  },

  jane: {
    name: 'jane',
    age: 7,
    species: 'ferret'
  }
};

module.exports = class UserController {
    /**
     * GET all users.
     */
    async index(ctx) {
        ctx.body = users;
    }

    /**
     * GET user by :name.
     */
    async show(ctx) {
        ctx.body = users[ctx.params.user];
    }

    /**
     * POST a new user.
     */
    async create(ctx) {
        //let body = await parse(ctx);
        if (!body.name) ctx.throw(400, '.name required');
        users[body.name] = body;
        ctx.status = 201;
        ctx.body = 'added!';
    }
}
