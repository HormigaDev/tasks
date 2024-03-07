module.exports = (app, { db }) => {
  app.post('/select-date', async (req, res) => {
    let { date } = req.body;
    let lastTaskInfo = await db.get('lasttask')??{};
    lastTaskInfo.date = date;
    db.set('lasttask', lastTaskInfo);
    await db.set('selectDate', false);
    res.json({success: true})
  });
}