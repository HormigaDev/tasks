module.exports = (app, { db, configs }) => {
  app.get('/config', async (req, res) => {
    let config = await db.get('config');
    if(!config) config = {};
    res.render('template', {title: "configurations", component:'s-config' , data: {config}, $t: req.lang, configs: req.configs});
  });
}