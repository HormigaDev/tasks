module.exports = (app, { affairs }) => {
  app.post('/delete-affair', async (req, res) => {
    let ids = req.body.ids;
    for(let id of ids){
      try{
        await affairs.removeOne({ id })
      } catch(err){
        console.log(err);
      }
    }
    res.dispatch({ messages: 'Asunto eliminado' });
  });
}