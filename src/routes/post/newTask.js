module.exports = (app, { db, generateID }) => {
  app.post('/new', async(req,res) => { //petición enviada a través de un script
    let { title, id, description, date, priority } = req.body;
    if(!date){
      let now = new Date();
      date = `${now.getFullYear()}-${('0'+(now.getMonth()+1)).slice(-2)}-${('0'+now.getDate()).slice(-2)}`
    }
    if(!title || !description) return res.json({success: false});
    let tasks = await db.get('tasks');
    if(!tasks) tasks = [];
    if(id?.length > 0) {
        let task = tasks.find(task => task.id === id);
        if(!task) return res.json({success: false});
        if(task.status === 'ended') {
          db.set('lasttask', null);
          return res.json({success: false});
        }
        task.title = title;
        task.description = description;
        task.priority = priority;
        let [year, month, day] = date.split('-');
        task.date = `${day}-${month}-${year}`
        tasks.find(t => {
          if(t.id === id){
            t = task;
            return true;
          } else {
            return false;
          }
        });
        db.set('tasks', tasks);
        return res.json({success: true})
    }
    let [year, month, day] = date.split('-');
    let task = {
      id: generateID(24),
      title,
      description,
      priority,
      date: `${day}-${month}-${year}`,
      status: 'created'
    }
    tasks.push(task);
    db.set('tasks', tasks);
    db.set('lasttask', null);
    res.json({success: true});
  });
}

