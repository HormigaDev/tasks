// import { randomColor } from './randomColor.js';

export function showAffairData(affair){
  let conntainer = document.getElementById('affair-content');
  let list = document.getElementById('affair-list');
  list.innerHTML = '';
  let affair_title = document.getElementById('affair-content-title');
  affair_title.textContent = affair.title;
  for (let timeline of affair.timeline){
    let item = document.createElement('li');

    item.setAttribute('style', `--accent-color: #b39965`)

    let title = document.createElement('div');
    let date = document.createElement('div');
    let description = document.createElement('div');

    title.classList.add('title');
    date.classList.add('date');
    description.classList.add('descr');
    let _date = timeline.date.split(' ');
    let [year, month, day] = _date[0].split('-');
    let [hour, minute] = _date[1].split(':');

    date.textContent = `${day}/${month}/${year} ${hour}:${minute}`;
    title.textContent = `${timeline.person.name} | ${timeline.person.phone}`;
    description.textContent = timeline.description;

    item.appendChild(date);
    item.appendChild(title);
    item.appendChild(description);
    list.appendChild(item);
  }

  let newTimeline = document.createElement('li');
  newTimeline.onclick = () => {
    let modalForm = document.getElementById('modal-affairs');
    let formAffairTitle = document.getElementById('form-affair-title');
    formAffairTitle.value = affair.title;
    modalForm.style.top = '0';
    document.getElementById('affair-_id').value = affair.id;
  }
  newTimeline.setAttribute('style', `--accent-color: #b39965`)
  let newDate = document.createElement('div');
  let newIcon = document.createElement('i');
  newIcon.classList.add('fa', 'fa-plus');
  newDate.classList.add('date');
  newDate.style.cursor = 'pointer';
  newDate.appendChild(newIcon);
  newTimeline.appendChild(newDate);
  list.appendChild(newTimeline);

  conntainer.style.display = 'block';
}