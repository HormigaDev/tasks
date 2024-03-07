module.exports = (app, { db }) => {
  app.post('/end-task', async (req, res) => {
    let { id } = req.body;
    let tasks = await db.get('tasks');
    if(!tasks) tasks = [];
    let task = tasks.find(t => {
      if(t.id === id){
        if(t.status === 'ended') {
          t.status = 'created';
          return true;
        }
        t.status = 'ended';
        return true;
      }
    });
    if(!task) return res.status(404).json({ message: 'No se encontró la tarea' });
    db.set('tasks', tasks);
    res.json({ success: true });
  });
}