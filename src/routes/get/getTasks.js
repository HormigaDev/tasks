module.exports = (app, { reducer, db }) => {
  app.get('/getTasks', async (req, res) => {
    let { priority, order_by, status, limit, page, search } = req.query;
    search = (search??'').toLowerCase();
    let rawTasks = await db.get('tasks')??[];
    let tasks = [];
    for(let task of rawTasks){
      if(!task.priority) task.priority = { name: 'low', icon: 'fa-thumbtack' }
      if(!task.status) task.status = 'created';
      if(search){
        if(
          !task.title.toLowerCase().includes(search)
          && !task.description.toLowerCase().includes(search)
        ){
          continue;
        }
      }
      if(priority !== 'all' && task.priority !== priority) continue;
      if(status !== 'all' && task.status !== status) continue;
      delete task.description;
      task.title = reducer(task.title, 40);
      tasks.push(task);
    }
    tasks = tasks.sort((a, b) => {
      let aRawDate = a.date.split('-');
      let bRawDate = b.date.split('-');
      let [aDay, aMonth, aYear] = aRawDate;
      let [bDay, bMonth, bYear] = bRawDate;
      let aDate = new Date(aYear, aMonth, aDay);
      let bDate = new Date(bYear, bMonth, bDay);
      if(order_by === 'ancient'){
        if(aDate > bDate) return 1;
        if(aDate < bDate) return -1;
        return 0;
      }
      if(order_by === 'recent'){
        if(aDate < bDate) return 1;
        if(aDate > bDate) return -1;
        return 0;
      }
    });
    let pages = tasks.pages(limit);
    let total = tasks.length;
    tasks = tasks.paginate(limit, page??1);
    res.status(200).json( { tasks , pages, total });
  });
}