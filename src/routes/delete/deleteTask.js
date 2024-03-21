module.exports = (app, { db }) => {
  app.delete('/delete', async (req, res) => {
    let { id } = req.query;
    let tasks = await db.get('tasks');
    if(!tasks) tasks = [];
    let task = tasks.find(task => task.id === id);
    if(task.status === 'ended') return res.status(403).json({ message: 'No es posible eliminar una tarea finalizada' });
    tasks = tasks.filter(task => task.id !== id);
    db.set('tasks', tasks);
    res.json({ success: true });
  });
}

