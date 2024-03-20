module.exports = (app, { affairs }) => {
  app.post('/archive-affair', async (req, res) => {
    let ids = req.body.ids;
    if(!ids) return res.status(400).send('No se han enviado los ids');
    for(let id of ids){
      try {
        await affairs.updateOne({ id }, { archived: true });
      } catch(err){
        console.log(err);
      }
    }
    return res.dispatch({ message: 'Asuntos archivados correctamente' });
  });
}