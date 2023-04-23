const reducer = require('./Utils/reducer');
const db = require('./Utils/database');
const generateID = require('./Utils/generateID');
const date = require('./Utils/date');

module.exports = (app) => {
    // app.get('/', (req, res) => {
    //     res.render('template', {title: "Hello World",component:'s-tasks' ,data: {}});
    // });
    app.get('/tasks', async(req, res) => { //petición enviada a través de un link
        let ts = await db.get('tasks');
        if(!ts) ts = [];
        let tasks = [];
        for (let i=0;i<ts.length; i++){
            let task = ts[i];
            task.description = reducer(task.description, 50);
            task.title = reducer(task.title, 23);
            tasks.push(task);
        }
        tasks = ts.filter(task => task.after > Date.now());
        res.render('template', {title: "Tasks", component:'s-tasks' ,data: {tasks: tasks}});
    });

    app.post('/new', async(req,res) => { //petición enviada a través de un script
        let { title, id, description, after } = req.body;
        if(!title || !description || !after) return res.json({success: false});
        let tasks = await db.get('tasks');
        if(!tasks) tasks = [];
        tasks = tasks.filter(t => t.after > Date.now());
        if(id.length > 0) {
            let task = tasks.find(task => task.id === id);
            task.title = title;
            task.description = description;
            task.after = Date.now() + (after*1000*3600*24);
            tasks[tasks.indexOf(task)] = task;
            db.set('tasks', tasks);
            return res.json({success: true})
        }
        tasks.push({title, date: date(), description, id: id.length>0 ? id : generateID(24), after: Date.now() + (after*1000*3600*24)});
        db.set('tasks', tasks);
        res.json({success: true});
    });
    app.get('/new', async(req, res) => { //petición enviada a través de un link
        let edit = req.query.edit;
        if(!edit) edit = false;
        let task = false;
        if(edit){
            let tasks = await db.get('tasks');
            if(!tasks) tasks = [];
            task = tasks.find(task => task.id === edit);
            if(!task) return res.render('404', {
                title: "Error 404"
            });
        }
        res.render('template', {title: edit ? "New task" : "Edit task", component:'s-new' ,task, content: task ? true : false, data: {} });
    });
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
        if(!title) return res.render('template', {title: "Search", component:'s-search' ,data: {tasks: result}})
        res.render('template', {title: "Search", component:'s-search' ,data: {tasks: result, word: word ? word : ''}});
    });
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
    app.get('/task', async (req, res) => {
        let { id } = req.query;
        let tasks = await db.get('tasks');
        if(!tasks) tasks = [];
        let task = tasks.find(task => task.id === id);
        if(!task) return res.render('404', {
            title: "Error 404"
        });
        res.render('task', {title: task.title ,task,id});
        
    });
    app.get('/delete', async (req, res) => {
        let { id } = req.query;
        let tasks = await db.get('tasks');
        if(!tasks) tasks = [];
        tasks = tasks.filter(task => task.id !== id);
        db.set('tasks', tasks);
        res.redirect('/tasks');
    })
}