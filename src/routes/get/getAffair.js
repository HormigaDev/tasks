module.exports = (app, { affairs }) => {
  app.get('/get-affair', async (req, res) => {
    let { id } = req.query;
    if(!id) return res.status(400).json({ message: 'No se providenció ningún id' });
    let affair = await affairs.findOne({ id });
    if(!affair) return res.status(404).json({ message: 'No se encontró el asunto' });
    return res.dispatch({affair});
  });
}