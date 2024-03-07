module.exports = (app, { db, reducer }) => {
  app.get('/searchtask', async(req, res) => {
    let { title } = req.query;
    let tasks = await db.get('tasks');
    if(!tasks) tasks = [];
    let result = [];
    for(let task of tasks){
        if(task.title.toLowerCase().includes(title.toLowerCase())){
            task.description = reducer(task.description, 50);
            task.title = reducer(task.title, 23);
            result.push(task);
        }
    }
    res.json({success: true, tasks: result});
  });
}