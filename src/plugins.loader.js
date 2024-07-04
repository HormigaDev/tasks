const fs = require('fs');
const path = require('path');
const dir = path.join("C:/", "BbelStudio", "Apps", "Tasks", "Plugins");
const db = require('./backend/database');
const configurations = require('./backend/configs');

if(!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

class UnidentifiedPluginError extends Error {
  constructor(message){
    super(message);
    this.name = "UnidentifiedPluginError";
  }
}

function executePlugins(app){
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const file of files) {
    try {
      const plugin = require(path.join(dir, file));
      if(!plugin) continue;
      if(plugin.name && plugin.description && plugin.version && plugin.author && plugin.main){
        plugin.main(db, configurations, app);
      } else {
        throw new UnidentifiedPluginError(`Plugin ${file} is not identified`);
      }
    } catch(err){
      if(err instanceof UnidentifiedPluginError){
        console.error(err.message);
      } else {
        console.error(`Error in plugin ${file}: ${err.message || err}`);
      }
    }
  }
}

module.exports = executePlugins;