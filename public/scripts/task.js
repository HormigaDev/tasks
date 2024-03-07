let delete_task = document.getElementById('delete-task');
delete_task.addEventListener('click', async (e) => {
  e.preventDefault();
  let id = delete_task.getAttribute('my-id');
  let response = await fetch(api+'delete?id='+id, {
    method: 'DELETE'
  });
  if(response.ok){
    window.location.href = '/tasks';
  } else if(response.status === 403) {
    showAlert($t.titles.error, $t.messages.dontDeleteTaskEnded, false);
  } else {
    showAlert($t.titles.error, $t.messages.dontDeleteTask, false);
  }
});

let endTask = document.getElementById('end-task');
endTask.addEventListener('click', async (e) => {
  e.preventDefault();
  let id = endTask.getAttribute('my-id');
  let response = await fetch(api+'end-task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });
  if(response.ok){
    window.location.href = '/tasks';
  } else {
    showAlert($t.titles.all_set, $t.messages.dontEndTask, false);
  }
});
let edit_task = document.getElementById('edit-task');
let task_back = document.getElementById('task-back');

edit_task.addEventListener('mouseover', () => manageTooltip(edit_task, true));
edit_task.addEventListener('mouseout', () => manageTooltip(edit_task, false));

delete_task.addEventListener('mouseover', () => manageTooltip(delete_task, true));  
delete_task.addEventListener('mouseout', () => manageTooltip(delete_task, false));

endTask.addEventListener('mouseover', () => manageTooltip(endTask, true));
endTask.addEventListener('mouseout', () => manageTooltip(endTask, false));

task_back.addEventListener('mouseover', () => manageTooltip(task_back, true));
task_back.addEventListener('mouseout', () => manageTooltip(task_back, false));