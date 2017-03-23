const pluralize = require('pluralize');
const DEFAULT_ROUTES = {
    'options': {
        method: 'OPTIONS',
        url: '/'
    },
    'create': {
        method: 'GET',
        url: '/create'
    },
    'store': {
        method: 'POST',
        url: '/'
    },
    'edit': {
        method: 'GET',
        url: '/:%name%/edit'
    },
    'update': {
        method: 'PUT',
        url: '/:%name%'
    },
    'index': {
        method: 'GET',
        url: '/',
    },
    'show': {
        method: 'GET',
        url: '/:%name%',
    },
    'destroy': {
        method: 'DELETE',
        url: '/:%name%'
    }
};

class Resource {
    static init(router, routeName, controller) {
        let name = typeof routeName == 'string' ? routeName : null;

        let id = name ? pluralize.singular(name) : 'id';
        let base = name ? '/' + name : '/';
        for (let methodName in DEFAULT_ROUTES) {
            let action = controller[methodName];
            if (action) {
                let route = DEFAULT_ROUTES[methodName];
                let path = route.url.replace('%name%', id);
                path = base + path;
                console.log(path);
                router[route.method.toLowerCase()](path, action);
            }
        }
    }
}

module.exports = Resource;