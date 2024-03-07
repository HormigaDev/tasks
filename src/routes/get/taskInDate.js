module.exports = (app, { db }) => {
  app.get('/tasks-in-date', async (req, res) => {
      let { date, all } = req.query;
      let tasks = (await db.get('tasks')).filter(t => {
        let [day, month, year] = t.date.split('-');
        if(date.split("-")[0].length == 4 ? `${year}-${month}-${day}` : t.date === date){
          return true;
        }
        return false;
      });
      // tasks = tasks.clone(30);
      //se retornan las primeras 3 tareas y el número total de tareas
      let total = tasks.length-2;
      if(!all){
        tasks = tasks.slice(0, 2);
      }
      tasks = tasks.map(t => {
        t.shortTitle = t.title.toLength(13);
        t.shortDescription = t.description.toLength(50);
        t.isoDate = t.date.split("-").reverse().join("-");
        return t;
      });
      res.json({ tasks, total });
  })
}