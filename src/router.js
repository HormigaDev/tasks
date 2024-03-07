const reducer = require('./Utils/reducer');
const DB = require('./Utils/database');
const db = new DB('db');
const configs = new DB('config');
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
    async function setLanguage(req, res, next){
        let language = await configs.get('language');
        if(!language) language = 'es';
        req.lang = lang[language];
        req.configs = {}
        let confiurations = await configs.get('configurations');
        if(confiurations){
            for (let conf of confiurations){
                req.configs[conf.name] = conf.value;
            }
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
            route(app, { db, configs, lang, date, reducer, generateID})
        }
    });
}