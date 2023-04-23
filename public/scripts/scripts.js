let title = document.getElementById('f-title');
let description = document.getElementById('f-description');
let after = document.getElementById('f-delete');
let submit = document.getElementById('sub');

if(submit != null){

submit.addEventListener('click', async(e)=> {
    e.preventDefault();
    let id = document.getElementById('_id');
    let info = {
        title: title.value,
        description: description.value,
        after: after.value,
        id: id ? id.value : ''
    }
    fetch(api+'new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    }).then(res => res.json()).then(data => {
        if(data.success) return window.location.href='/tasks';
    })
})
}
let thumbtack = document.getElementById('thumbtack');
if(thumbtack != null){
thumbtack.addEventListener('click', async(e)=> {
    e.preventDefault();
    window.location.href = '/tasks'
})
}

let buscar = document.getElementById('search-input');
if(buscar != null){
    buscar.addEventListener('input', (e) => {
        e.preventDefault();
        let inner = ''
        document.getElementById('search-tasks').innerHTML = inner;
        fetch(api+'searchtask?title='+buscar.value).then(res => res.json()).then(data => {
            let tasks = data.tasks;
            let tasksElement = document.getElementById('search-tasks');
            for(let task of tasks){
                let a = document.createElement('a');
                let img1 = document.createElement('img');
                let img2 = document.createElement('img');
                let h3 = document.createElement('h3');
                let p = document.createElement('p');
                img1.className = 'task-image';
                img2.className = 'task-icon';
                h3.className = 'task-title';
                h3.textContent = task.title;
                p.textContent = task.date;
                p.className = 'task-date';
                img1.src = 'assets/nota.png';
                img2.src = 'assets/thumbtack.png';
                a.className = 'search-task';
                a.href = '/task?id='+task.id;
                a.appendChild(img1);
                a.appendChild(img2);
                a.appendChild(h3);
                a.appendChild(p);
                tasksElement.appendChild(a);
            }

        })
    })
}