
function manageTooltip(element, showTooltip) {
    // Check if the tooltip should be shown or removed
    if (showTooltip) {
        // Get the position of the element on the screen
        const rect = element.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;

        // Get the value of the 'my-title' attribute
        const myTitle = element.getAttribute('my-title');

        // Create a div element to display the tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = myTitle;
        tooltip.style.position = 'absolute';
        tooltip.style.border = '1px solid #ccc';
        tooltip.style.padding = '5px';
        tooltip.style.backgroundColor = '#20202090';
        tooltip.style.zIndex = '9999';
        tooltip.style.color = '#fafafa';
        tooltip.style.fontSize = '12px';
        tooltip.style.maxWidth = '256px';
        tooltip.style.wordBreak = 'break-word';

        // Calculate preferred positions
        const preferredTop = top - tooltip.offsetHeight - 10;
        const preferredBottom = top + rect.height + 10;
        const preferredLeft = left - tooltip.offsetWidth - 10;
        const preferredRight = left + rect.width + 10;

        // Check if the pointer is within the last 64px to the right
        const isNearRightEdge = window.innerWidth - event.clientX < 200;

        // Check if the pointer is within the last 64px to the bottom
        const isNearBottomEdge = window.innerHeight - event.clientY < 100;

        // Determine preferred position based on pointer position
        if (isNearRightEdge) {
            tooltip.style.left = preferredLeft + 'px';
        } else {
            tooltip.style.left = preferredRight - 20 + 'px';
        }

        if (isNearBottomEdge) {
            tooltip.style.top = preferredTop - 5 + 'px';
        } else {
            tooltip.style.top = preferredBottom + 'px';
        }

        // Add the tooltip to the body of the document
        document.body.appendChild(tooltip);
    } else {
        // Remove the tooltip if it exists
        const existingTooltip = document.querySelector('.tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    }
}

let title = document.getElementById('f-title');
let description = document.getElementById('f-description');
let priority = document.getElementById('f-priority');
let date = document.getElementById('f-date');
let submit = document.getElementById('sub');

if(submit != null){

submit.addEventListener('click', async(e)=> {
    e.preventDefault();
    let [day, month, year] = date.value.split('/');
    if(!day) day = '';
    if(!month) month = '';
    if(!year) year = '';
    let id = document.getElementById('_id');
    let info = {
        title: title.value,
        description: description.value,
        date: `${year}-${month}-${day}`,
        id: id ? id.value : '',
        priority: priority.value
    }
    if(info.date === '--') info.date = false;
    if(info.title.length < 1 || info.description.length < 1) return showAlert($t.titles.error, $t.messages.missingFields, false);
    fetch(api+'new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    }).then(res => res.json()).then(data => {
        if(data.success) return window.location.href='/tasks';
        else return showAlert($t.titles.error, $t.messages.dontSaveTaskEnded, false);
    })
})
}

async function showAlert(title, message, reload=false){
    let modalTitle = document.getElementById('app-modal-title');
    let modalMessage = document.getElementById('app-modal-message');
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    let modal = document.getElementById('app-modal-overlay'); 
    modal.style.display = 'flex';
    reloadModal = reload;
}
async function hideAlert(){
    let modal = document.getElementById('app-modal-overlay');
    modal.classList.remove('animate__fadeIn');
    modal.classList.add('animate__fadeOut');
    setTimeout(() => {
        modal.style.display = 'none';
        if(reloadModal){
            window.location.reload();
        }
        modal.classList.remove('animate__fadeOut');
        modal.classList.add('animate__fadeIn');
    }, 300);
}

if(activeComponent == 's-tasks'){
    let priority = document.getElementById('tasks-priority');
    let order = document.getElementById('tasks-order-by');
    let status = document.getElementById('tasks-status');
    let limit = document.getElementById('tasks-limit');
    let input = document.getElementById('input-search');
    let page = 1;

    priority.addEventListener('change', filterTasks);
    order.addEventListener('change', filterTasks);
    status.addEventListener('change', filterTasks);
    limit.addEventListener('change', filterTasks);
    input.addEventListener('input', filterTasks);

    async function filterTasks(){
        let tasksElement = document.getElementById('tasks');
        let res = await fetch(api+`getTasks?priority=${priority.value}&order_by=${order.value}&status=${status.value}&limit=${limit.value}&page=${page??1}&search=${input.value}`);
        let { tasks, pages, total } = await res.json();
        tasksElement.innerHTML = '';
        for(let task of tasks){
            let taskContainer = document.createElement('div');
            taskContainer.className = 'task';
            let taskTitle = document.createElement('h3');
            taskTitle.textContent = task.title;
            taskTitle.className = 'task-title';
            let taskDate = document.createElement('p');
            taskDate.textContent = task.date;
            taskDate.className = 'task-date';
            let taskIconContainer = document.createElement('div');
            taskIconContainer.className = 'task-icon-bg';
            let taskPriorityIcon = document.createElement('i');
            taskPriorityIcon.className = 'task-icon';
            if(task.priority){
                taskPriorityIcon.classList.add(`fa`);
                taskPriorityIcon.classList.add(`${task.priority?.icon??'fa-thumbtack'}`);
                taskPriorityIcon.classList.add(`priority-${task.priority?.name}`);
            }
            let taskCalendarIcon = document.createElement('i');
            taskCalendarIcon.onclick = () => {
                let id = task.id;
                window.location.href = `/task?id=${id}&route=tasks`;
            }
            taskCalendarIcon.className = 'icon-bg';
            taskCalendarIcon.classList.add('fa');
            taskCalendarIcon.classList.add('fa-calendar');
            taskCalendarIcon.classList.add('fa-regular');
            taskIconContainer.appendChild(taskPriorityIcon);
            taskIconContainer.appendChild(taskCalendarIcon);
            taskContainer.appendChild(taskTitle);
            taskContainer.appendChild(taskDate);
            taskContainer.appendChild(taskIconContainer);
            tasksElement.appendChild(taskContainer);
        }
        let pagination = document.getElementById('pagination-numbers');
        pagination.innerHTML = '';
        let pagesItems = [];
        for(let i=1; i <= pages; i++){
            let pageNumberButton = document.createElement('button');
            pageNumberButton.textContent = i;
            pageNumberButton.className = 'pagination-btn';
            pageNumberButton.addEventListener('click', (e) => {
                page = i;
                filterTasks();
            });
            pagesItems.push(pageNumberButton);
        }
        let paginatedItems = pagesItems.slice(page-1, page+9);
        for(let item of paginatedItems){
            pagination.appendChild(item);
        }
        if(paginatedItems[paginatedItems.length-1].textContent !== pagesItems[pagesItems.length-1].textContent){
            let ellipsis = document.createElement('button');
            ellipsis.textContent = '...';
            ellipsis.className = 'pagination-btn';
            ellipsis.classList.add('disabled');
            pagination.appendChild(ellipsis);
            let lastPage = document.createElement('button');
            lastPage.textContent = pages;
            lastPage.className = 'pagination-btn';  
            lastPage.addEventListener('click', (e) => {
                page = pages;
                filterTasks();
            });
            pagination.appendChild(lastPage);
        }
        if(paginatedItems[0].textContent !== '1'){
            let ellipsis = document.createElement('button');
            ellipsis.textContent = '...';
            ellipsis.className = 'pagination-btn';
            ellipsis.classList.add('disabled');
            pagination.insertBefore(ellipsis, pagination.firstChild);
            let firstPage = document.createElement('button');
            firstPage.textContent = 1;
            firstPage.className = 'pagination-btn';
            firstPage.addEventListener('click', (e) => {
                page = 1;
                filterTasks();
            });
            pagination.insertBefore(firstPage, pagination.firstChild);
        }
        paginatedItems = [];
        page = 1;
    }
    filterTasks();
    let tSearch = document.getElementById('tasks-search-task');
    let closeInput = document.getElementById('close-input');
    let inputShow = false;
    if(tSearch && closeInput){
        tSearch.addEventListener('click', async (e) => {
            e.preventDefault();
            let inputSearchContainer = document.getElementById('input-search-container');
            if(!inputShow){
                inputSearchContainer.style.display = 'flex';
                inputShow = true;
                input.focus();
            } else {
                inputSearchContainer.style.display = 'none';
                inputShow = false;
            }
        });
        closeInput.addEventListener('click', async (e) => {
            e.preventDefault();
            let inputSearchContainer = document.getElementById('input-search-container');
            inputSearchContainer.style.display = 'none';
            inputShow = false;
        });
    }
}

let sideContainerClose = document.getElementById('side-container-close');
let sideContainer = document.getElementById('side-container');

if(sideContainerClose && sideContainer){
    sideContainerClose.addEventListener('click', async (e) => {
        sideContainer.style.right = '-30vw';
    });
}

let menuSections = document.querySelectorAll('.menu-section');
menuSections.forEach(section => {
    if(!configs.showMenuTitles) return;
    section.addEventListener('mouseover', () => {
        manageTooltip(section, true);
    });
    section.addEventListener('mouseout', () => {
        manageTooltip(section, false);
    });
});

