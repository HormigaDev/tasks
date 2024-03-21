module.exports = (app, { db }) => {
  app.get('/new', async(req, res) => { //petición enviada a través de un link
    let editing = req.query.editing;
    if(!editing) editing = false;
    let task = await db.get('lasttask')??false;
    if(editing){
      let tasks = await db.get('tasks');
      let editingTask = tasks.find(t => t.id === editing);
      if(editingTask) task = editingTask;
    }
    if(task){
      if(task.date){
        let [year, month, day] = task.date.split('-');
        if(editing) [day, month, year] = task.date.split('-');
        task.formatedDate = `${day}/${month}/${year}`
      }
    }
    let selectDate = await db.get('selectDate');
    res.dispatchRender('template', {title: editing ? "edit_task" : "new_task", component:'s-new' ,task, selectDate, data: {}, editing});
  });
}

