module.exports = (app, { db, reducer }) => {
  app.get('/search', async(req, res) => { //petición enviada a través de un script
    let { title, word } = req.query;
    let tasks = await db.get('tasks');
    if(!tasks) tasks = [];
    let result = [];
    if(title){
        for(let task of tasks){
            if(task.title.toLowerCase().includes(title.toLowerCase())){
                task.description = reducer(task.description, 50);
                task.title = reducer(task.title, 23);
                result.push(task);
            }
        }
    } else {
        for(let task of tasks){
            task.description = reducer(task.description, 50);
            task.title = reducer(task.title, 23);
            result.push(task);
        }
    }
    if(!title) return res.render('template', {title: "search_task", component:'s-search' ,data: {tasks: result}, $t: req.lang})
    res.render('template', {title: "search_task", component:'s-search' ,data: {tasks: result, word: word ? word : ''}, $t: req.lang});
  });
}