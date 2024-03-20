module.exports = (app, { db, configs }) => {
  app.get('/config', async (req, res) => {
    let config = await db.get('config');
    if(!config) config = {};
    res.dispatchRender('template', {title: "configurations", component:'s-config' , data: {config}});
  });
}