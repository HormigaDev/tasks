module.exports = (app, { configs: configsDB }) => {
  app.post('/change-configs', async (req, res) => {
    let admiteds = ['en', 'es', 'pt'];
    let configurations = req.body.configurations;
    if(!configurations) return res.status(400).json({ message: "Configuraciones no enviadas" });
    if(configurations?.length === 0) {
      return res.status(201).json({ message: 'No hay configuraciones para actualizar' });
    }
    let configs = {};
    for (let config of configurations){
      configs[config.name] = config.value;
    }
    if(configs.language && !admiteds.includes(configs.language)) return res.status(400).json({ message: "Idioma no admitido" });
    await configsDB.set('configurations', configurations);
    res.status(200).json({ message: 'Configuraciones actualizadas' });
  });
}