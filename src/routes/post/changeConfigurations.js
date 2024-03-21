module.exports = (app, { configs: configsDB }) => {
  app.post('/change-configs', async (req, res) => {
    let configurations = req.body.configurations;
    if(JSON.stringify(configurations) === '{}') return res.status(201).json({ message: 'No se enviaron configuraciones' })
    if (!configurations) return res.status(400).json({ message: 'No se enviaron configuraciones' });
    let configs = await configsDB.get('configurations', {});
    for(let key in configurations){
      configs[key] = configurations[key];
    }
    configsDB.set('configurations', configs);
    res.status(200).json({ message: 'Configuraciones actualizadas' });
  });
}

