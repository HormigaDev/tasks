let getDate = document.getElementById('get-date');

if(getDate){
  getDate.addEventListener('click', async (e) => {
    e.preventDefault();
    let info = {
      title: title.value,
      description: description.value,
      priority: priority.value
    }
    let res = await fetch(api+'save-task-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });
    if(res.ok){
      location.reload();
    }
  });
}