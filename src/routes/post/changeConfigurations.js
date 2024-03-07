module.exports = (app, { configs }) => {
  app.post('/change-configs', async (req, res) => {
    let admiteds = ['en', 'es', 'pt'];
    let configurations = req.body.configurations;
    if(!configurations) return res.status(400).json({ message: "Configuraciones no enviadas" });
    if(configurations?.length === 0) {
      return res.status(201).json({ message: 'No hay configuraciones para actualizar' });
    }
    let language = configurations?.find(config => config.name === 'language');
    if(language && !admiteds.includes(language?.value)){
      return res.status(400).json({ message: "Lenguaje no admitida" });
    }
    configurations = configurations.filter(config => config.name !== 'language');
    await configs.set('configurations', configurations);
    await configs.set('language', language?.value);
    return res.json({ sucess: true });
  });
}