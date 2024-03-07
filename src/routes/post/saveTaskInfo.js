module.exports = (app, { db }) => {
  app.post('/save-task-info', async (req, res) => {
    let { title, description, priority } = req.body;
    let lastTaskInfo = await db.get('lasttask')??{};
    lastTaskInfo.title = title;
    lastTaskInfo.description = description;
    lastTaskInfo.priority = priority;
    db.set('lasttask', lastTaskInfo);
    db.set('selectDate', true);
    res.json({success: true})
  });
}