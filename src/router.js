const reducer = require('./Utils/reducer');
const { DB, EncryptedLocalListDB } = require('./Utils/database');
const db = new DB('db');
const configs = new DB('config');
const affairs = new EncryptedLocalListDB('affairs');
const generateID = require('./Utils/generateID');
const date = require('./Utils/date');
const lang = {
    es: require('./locales/es.json'),
    en: require('./locales/en.json'),
    pt: require('./locales/pt.json')
}
const path = require('path');
const fs = require('fs');

module.exports = (app) => {

    // Middleware para configurar el lenguaje
    let APP_VERSION = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'version.json')))
    async function setLanguage(req, res, next){

        req.configs = {}
        let configurations = await configs.get('configurations');
        if(configurations){
            for (let config in configurations){
                req.configs[config] = configurations[config];
            }
        }
        if(!req.configs.language) req.configs.language = 'es';
        req.lang = lang[req.configs.language??'es'];

        res.dispatch = async (json, status=200) => {
            json.$t = req.lang;
            json.configs = req.configs;
            json.APP_PORT = app.get('port');

            return res.status(status).json(json);
        }
        res.dispatchRender = function(template, data, status=200){
            data.$t = req.lang;
            data.configs = req.configs;
            data.configurations = req.configs;
            data.APP_PORT = app.get('port');
            data.APP_VERSION = APP_VERSION;

            return res.status(status).render(template, data);
        }

        next();
    }

    app.use(setLanguage); // Middleware para configurar el lenguaje

    // Rutas
    let routesDir = path.join(__dirname, 'routes');
    ['get', 'post', 'delete'].forEach(method => {
        let routes = fs.readdirSync(path.join(routesDir, method)).filter(file => file.endsWith('.js'));
        for (let route of routes){
            route = require(path.join(routesDir, method, route));
            route(app, { db, configs, lang, date, reducer, generateID, affairs })
        }
    });
}

