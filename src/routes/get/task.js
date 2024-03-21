module.exports= (app, { db }) => {
  app.get('/task', async (req, res) => {
    let { id, route } = req.query;
    let tasks = await db.get('tasks');
    if(!tasks) tasks = [];
    let task = tasks.find(task => task.id === id);
    if(!task) return res.render('404', {
        title: "Error 404"
    });
    // let regLinesBreak = /[\r\n]/g;
    // task.splittedDescription = task.description.split(regLinesBreak);
    res.dispatchRender('task', {title: "task" ,task,id, route});
  });
}

