let calendar = document.getElementById('calendar');

function getLastDayOfPrevMonth(now = new Date()){
    let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    let lastDay = new Date(firstDay - 1);
    return lastDay.getDate();
}

if (calendar !== null) {
    let calendarCurrentDate;
    async function createCalendar(date = new Date(), viewType = 'month') {
        calendarCurrentDate = date;
        let month = date.toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
        console.log(month);
        let monthname = document.getElementById('monthname');
        monthname.textContent = `${$t.months[month]} ${$t.words.of} ${date.getFullYear()}` 
        let days = {
            sunday: 0,
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6
        };
        let months = {
            january: 0,
            february: 1,
            march: 2,
            april: 3,
            may: 4,
            june: 5,
            july: 6,
            august: 7,
            september: 8,
            october: 9,
            november: 10,
            december: 11
        };

        if (viewType === 'month') {
            let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            let dayName = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
            console.log(dayName);
            let weekly = 0;
            let i = 1;
            let priorityIcons = {
                urgent: "fa-exclamation-triangle",
                high: "fa-exclamation-circle",
                normal: "fa-circle",
                low: "fa-circle"
            }

            while (i <= lastDay) {
                let day = document.createElement('div');
                day.classList.add('day');
                day.setAttribute('my-date', `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${('0'+i).slice(-2)}`)
                
                if(selectDate === true){
                    let selectedDate = async () => {
                        let res = await fetch(api+'select-date', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                date: day.getAttribute('my-date')
                            })
                        })
                        if(res.ok){
                            let data = await res.json();
                            if(data.success){
                                location.reload();
                            }
                        }
                    }
                    day.addEventListener('click', selectedDate);
                } else {
                    let showTasks = async (element) => {
                        let sideContainer = document.getElementById('side-container');
                        let sideContainerTasks = document.getElementById('side-container-tasks');
                        let res = await fetch(api+'tasks-in-date?date='+element.getAttribute('my-date')+'&all=true');
                        if(res.ok){
                            let data = await res.json();
                            let tasks = data.tasks??[];
                            if(tasks.length > 0){
                                console.log('tasks', tasks);
                                sideContainerTasks.innerHTML = '';
                                for(let task of tasks){
                                    if(task.isoDate !== element.getAttribute('my-date')) continue;
                                    let taskElement = document.createElement('div');
                                    taskElement.setAttribute('my-id', task.id);
                                    taskElement.classList.add('side-container-task');
                                    let title = document.createElement('span');
                                    title.classList.add('side-container-task-title');
                                    title.textContent = task.title;
                                    taskElement.appendChild(title);
                                    // let description = document.createElement('span');
                                    // description.classList.add('side-container-task-description');
                                    // description.textContent = task.shortDescription;
                                    // taskElement.appendChild(description);
                                    let priorityIcon = document.createElement('i');
                                    if(task.status !== 'ended'){
                                        priorityIcon.classList.add('fa', priorityIcons[task.priority], task.priority);
                                    } else {
                                        priorityIcon.classList.add('fa', 'fa-check-double');
                                    }
                                    priorityIcon.classList.add('side-container-task-icon');
                                    taskElement.appendChild(priorityIcon);
                                    taskElement.addEventListener('click', () => {
                                        location.href = '/task?id='+task.id+'&route=calendar';
                                    });
                                    sideContainerTasks.appendChild(taskElement);
                                }
                                sideContainer.style.right = '0';
                                console.log('ok');
                            }
                        }
                    }
                    day.addEventListener('click', () => showTasks(day));
                }
                
                let number = document.createElement('span');

                if (days[dayName] === weekly) {
                    number.textContent = i;
                    number.classList.add('day-number');
                    if(weekly === 0 || weekly === 6){
                        number.classList.add('weekend');
                    }
                    number.classList.add('day-in-month');

                    if(
                        date.getFullYear() === new Date().getFullYear() &&
                        date.getMonth() === new Date().getMonth() &&
                        i === new Date().getDate()
                    ){
                        day.classList.add('today');
                    }
                    // Traer todas las tareas de este día en específico
                    let currentDate = new Date(date.getFullYear(), date.getMonth(), i);
                    let tasks = [];
                    let total = 0;
                    let tasksRes = await fetch(api+'tasks-in-date?date='+`${('0'+currentDate.getDate()).slice(-2)}-${('0'+(currentDate.getMonth()+1)).slice(-2)}-${currentDate.getFullYear()}`);
                    if(tasksRes.ok){
                        let data = await tasksRes.json();
                        tasks = data.tasks??[];
                        total = data.total;
                    }
                    let tasksContainer = document.createElement('div');
                    tasksContainer.classList.add('calendar-tasks-container');
                    for(let task of tasks){
                        let taskElement = document.createElement('div');
                        taskElement.setAttribute('my-title', task.title);
                        taskElement.onmouseover = () => {
                            manageTooltip(taskElement, true);
                        }
                        taskElement.onmouseout = () => {
                            manageTooltip(taskElement, false);
                        }
                        taskElement.classList.add('calendar-task');
                        if(!task.priority){
                            task.priority = 'low';
                        }
                        let iconPriority = document.createElement('i');
                        iconPriority.classList.add('fa', priorityIcons[task.priority], task.priority, 'calendar-task-icon');
                        let bgElement = document.createElement('div');
                        let status = 'done';
                        if(currentDate < new Date(Date.now() - (1000 * 60 * 60 * 24))){
                            status = 'late';
                        } else if(currentDate > new Date()){
                            status = 'future';
                        } else if(currentDate.toDateString() === new Date().toDateString()){
                            status = 'today';
                        } else if(task.done){
                            status = 'done';
                        }
                        bgElement.classList.add('calendar-task-bg', status);
                        bgElement.textContent = task.shortTitle;
                        taskElement.appendChild(bgElement);
                        taskElement.appendChild(iconPriority);
                        tasksContainer.appendChild(taskElement);
                    }
                    let count = document.createElement('span');
                    if(total > 0){
                        count.textContent = `+${total} ${$t.words.tasks}`;
                        count.classList.add('task-count');
                        tasksContainer.appendChild(count);
                    }
                    day.appendChild(tasksContainer);
                    // Fin de traer todas las tareas de este día en específico

                    day.appendChild(number);
                    calendar.appendChild(day);
                    i++;
                } else {
                    let prevMonthLastDay = getLastDayOfPrevMonth();
                    for (let i=prevMonthLastDay; i>0; i--){
                        let now = new Date();
                        let date = new Date(now.getFullYear(), now.getMonth()-1, i);
                        let emptyDayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                        if (days[emptyDayName] === weekly) {
                            day.classList.add('empty-day');
                            number.textContent = i;
                            if(weekly === 0 || weekly === 6){
                                number.classList.add('weekend');
                            }
                            number.classList.add('day-number');
                            day.appendChild(number);
                            calendar.appendChild(day);
                            break;
                        }
                    }
                }

                weekly++;
                if (weekly > 6) {
                    weekly = 0;
                }

                // Actualiza el nombre del día para el siguiente bucle
                dayName = new Date(date.getFullYear(), date.getMonth(), i).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
            }
            let lastDayName = new Date(date.getFullYear(), date.getMonth(), lastDay).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
            let daysToAdd = 7-(days[lastDayName]+1);
            for (let i = 0; i < daysToAdd; i++) {
                let day = document.createElement('div');
                day.classList.add('empty-day', 'day');
                let number = document.createElement('span');
                number.classList.add('day-number');
                if((days[lastDayName]+1+i) === 0 || (days[lastDayName]+1+i) === 6){
                    number.classList.add('weekend');
                }
                number.textContent = i+1;
                day.appendChild(number);
                calendar.appendChild(day);
            }
        }
    }

    createCalendar();

    let prevMonth = document.getElementById('prevmonth');
    let nextMonth = document.getElementById('nextmonth');

    prevMonth.onclick = () => {
        calendar.innerHTML = '';
        let newDate = new Date(calendarCurrentDate.getFullYear(), calendarCurrentDate.getMonth()-1, 1);
        createCalendar(newDate);
    }
    nextMonth.onclick = () => {
        calendar.innerHTML = '';
        let newDate = new Date(calendarCurrentDate.getFullYear(), calendarCurrentDate.getMonth()+1, 1);
        createCalendar(newDate);
    }
}
