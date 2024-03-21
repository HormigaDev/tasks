module.exports = (app, { reducer, db, configs }) => {
  app.get('/tasks', async(req, res) => { //petición enviada a través de un link
    let ts = await db.get('tasks');
    // await db.set('tasks', []);
    // await configs.set('language', 'es');
    if(!ts) ts = [];
    let tasks = [];
    for (let i=0;i<ts.length; i++){
        let task = ts[i];
        task.description = reducer(task.description, 50);
        task.title = reducer(task.title, 40);
        tasks.push(task);
    }
    tasks = ts.filter(task => task.after > Date.now());
    res.dispatchRender('template', {title: "tasks", component:'s-tasks' ,data: {tasks: tasks }});
  });
}

