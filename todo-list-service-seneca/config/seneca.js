const Seneca = require('seneca');
const SenecaWeb = require("seneca-web");

const routes = {
    prefix: '/api',
    pin: 'role:todo,cmd:*',
    map: {
        add: { POST: true, alias: '/tasks' },
        getAll: { GET: true, alias: '/tasks' },
        delete: { DELETE: true, suffix: '/:id', alias: '/tasks/:id' },
        edit: { PUT: true, suffix: '/:id', alias: '/tasks/:id' }
    }
};

const senecaWebConfig = {
    routes,
    adapter: require('seneca-web-adapter-express'),
    options: {
        parseBody: false
    }
};

const PORT = '3032';

module.exports = function(serverEngine) {
    const seneca = Seneca()
        .use(SenecaWeb, {...senecaWebConfig, context: serverEngine})
        .use(require('../services/tasks.service')) // Подключение микросервиса для управления задачами
        .ready(() => {
            const server = seneca.export('web/context')()

            server.listen(PORT, () => {
                console.log(`server started on: ${PORT}`)
            });
         });
};
