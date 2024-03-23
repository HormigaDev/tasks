import { showAffairData } from './functions/showAffairData.js';

let modalForm = document.getElementById('modal-affairs');
let newAffairButton = document.getElementById('new-affair-btn');
let openModalAffair = false;
let cancelAffairButton = document.getElementById('cancel-affair-btn');
let saveAffairButton = document.getElementById('save-affair-btn');

let formAffairTitle = document.getElementById('form-affair-title');
let formAffairDescription = document.getElementById('form-affair-description');
let formAffairPerson = document.getElementById('form-person-name');
let formAffairPhone = document.getElementById('form-person-phone');

let affair = {
  title: null,
  description: null,
  person: null,
  phone: null
}
let selectedAffairs = [];

function selectAffair(id){
  let index = selectedAffairs.indexOf(id);
  if(index === -1){
    selectedAffairs.push(id);
  } else {
    selectedAffairs.splice(index, 1);
  }
}

newAffairButton.addEventListener('click', function(e) {
  e.preventDefault();
  if(!openModalAffair){
    modalForm.style.top = '0';
  } else {
    modalForm.style.top = '-2000px';
  }
});
cancelAffairButton.addEventListener('click', function(e) {
  e.preventDefault();
  modalForm.style.top = '-100vh';
});

[
  formAffairTitle,
  formAffairDescription,
  formAffairPerson
].forEach((input) => {
  input.addEventListener('input', e => {
    affair[input.getAttribute('aff-id')] = input.value;
  });
})
formAffairPhone.addEventListener('input', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{2})(\d{4,5})(\d{4})/);
  if(!x) return;
  var formattedValue = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2].substr(0, x[2].length - 4) + ' ' + x[2].substr(-4) + (x[3] ? '-' + x[3] : '');
  
  // Verificar si el número está completamente formateado
  if (formattedValue.length === 15 || formattedValue.length === 16) {
      affair.phone = formattedValue;
      e.target.value = formattedValue;
  } else {
    return;
  }
});


saveAffairButton.addEventListener('click', async function(e) {
  e.preventDefault();
  let _id = document.getElementById('affair-_id').value;
  if(
    formAffairTitle.value === '' ||
    formAffairDescription.value === '' ||
    formAffairPerson.value === '' ||
    formAffairPhone.value === ''
  ) {
    return showAlert($t.titles.error, $t.messages.affair_missing_fields);
  }
  let res = await fetch('/new-affair', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: formAffairTitle.value,
      description: formAffairDescription.value,
      person: {
        name: affair.person,
        phone: affair.phone
      },
      _id
    })
  });
  if(res.status === 200){
    modalForm.style.top = '-100vh';
    showAlert($t.titles.all_set, $t.messages.affair_created);
    formAffairDescription.value = '';
    formAffairTitle.value = '';
    formAffairPerson.value = '';
    formAffairPhone.value = '';
    getAffairs();
    let res = await fetch('/get-affair?id='+_id);
    let data = await res.json();
    showAffairData(data.affair);
  } else {
    showAlert($t.titles.error, $t.messages.affair_not_created);
  }
});
[
  'new-affair-btn',
  'search-affair',
  'archive-affair',
  'delete-affair',
  'show-archives-affair',
  'timeline-affair-btn',
  'order_by_az',
  'order_by_za'
].forEach(id => {
  let element = document.getElementById(id);
  if(element){
    element.addEventListener('mouseover', e => {
      manageTooltip(element, true);
    });
    element.addEventListener('mouseout', e => {
      manageTooltip(element, false);
    });
  }
});
let affairCheckboxSelected = false;

let affairHTMLTemplate = (affair) => {
  let _affair = document.createElement('div');
  
  _affair.classList.add('affair');

  _affair.onclick = function(){
    if(affairCheckboxSelected) return;
    localStorage.setItem('opened_affar', 'true');
    showAffairData(affair);
  }
  // let _affair_container = document.getElementById('affair-content');
  let checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', affair.id);
  checkboxLabel.classList.add('checkbox-container', 'box-option');
  let checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('affair-input-chekbox');
  checkbox.onchange = function(e){
    e.preventDefault();
    selectAffair(affair.id);
  }
  checkboxLabel.onmouseover = () => {
    affairCheckboxSelected = true;
  }
  checkboxLabel.onmouseout = () => {
    affairCheckboxSelected = false;
  }
  checkbox.setAttribute('readonly', 'true');
  checkbox.setAttribute('name', affair.id);
  checkbox.setAttribute('id', affair.id);
  let checkboxSpan = document.createElement('span');
  checkboxSpan.classList.add('checkbox-box');
  let checkboxLabelSpan = document.createElement('span');
  checkboxLabelSpan.classList.add('checkbox-label');
  let title = document.createElement('h2');
  title.classList.add('affair-title');
  title.textContent = affair.title;
  let personSection = document.createElement('div');
  personSection.classList.add('affair-person-section');
  let firstPerson = document.createElement('span');
  firstPerson.classList.add('affair-first-person');
  firstPerson.textContent = affair.timeline[0].person.name;
  let personDivisor = document.createElement('span');
  personDivisor.classList.add('affair-person-divisor');
  personDivisor.textContent = ' | ';
  let firstPhone = document.createElement('span');
  firstPhone.classList.add('affair-first-phone');
  firstPhone.textContent = affair.timeline[0].person.phone;
  let toolbarBtn = document.createElement('div');
  toolbarBtn.setAttribute('id', 'timeline-affair-btn');
  toolbarBtn.classList.add('timeline-btn');
  let icon = document.createElement('i');
  if(affair.archived === true || affair.archived === 'true'){
    // _affair.style.outline = '1px solid #fab434';
    let iconArchive = document.createElement('i');
    iconArchive.classList.add('fa', 'fa-archive');
    iconArchive.style.margin = '0 10px';
    toolbarBtn.appendChild(iconArchive);
  }
  icon.classList.add('fa', 'fa-timeline');
  icon.setAttribute('my-title', $t.buttons.timeline);
  toolbarBtn.appendChild(icon);
  personSection.appendChild(firstPerson);
  personSection.appendChild(personDivisor);
  personSection.appendChild(firstPhone);
  personSection.appendChild(toolbarBtn);
  checkboxLabel.appendChild(checkbox);
  checkboxLabel.appendChild(checkboxSpan);
  checkboxLabel.appendChild(checkboxLabelSpan);
  _affair.appendChild(checkboxLabel);
  _affair.appendChild(title);
  _affair.appendChild(personSection);
  return _affair;
}
let getAffairsData = {
  search: '',
  order_by: 'az',
  page: 1,
  results: 10,
  archives: localStorage.getItem('affair_archives') === 'true' ? true : false,
  next: false,
  prev: false
}

function getAffairs(){
  let url = `/get-affairs?search=${getAffairsData.search}&order_by=${getAffairsData.order_by}&page=${getAffairsData.page}&results=${getAffairsData.results}&archives=${getAffairsData.archives}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    let affairsContainer = document.getElementById('affairs');
    let prevBtn = document.getElementById('affair-prev-page');
    let nextBtn = document.getElementById('affair-next-page');
    let page = document.getElementById('affair-page');
    if(!data.prev){
      prevBtn.style.opacity = '0.5';
      getAffairsData.prev = false;
    } else {
      prevBtn.style.opacity = '1';
      getAffairsData.prev = true;
    }
    if(!data.next){
      nextBtn.style.opacity = '0.5';  
      getAffairsData.next = false;
    } else {
      nextBtn.style.opacity = '1';
      getAffairsData.next = true;
    }
    page.textContent = data.page;
    affairsContainer.innerHTML = '';
    data.affairs.forEach(affair => {
      let affairHTML = affairHTMLTemplate(affair);
      affairsContainer.appendChild(affairHTML);
    });
    if(localStorage.getItem('affair_archives') === 'true'){
      showArchivesAffair.classList.add('outlined');
    } else {
      showArchivesAffair.classList.remove('outlined');
    }
    if(localStorage.getItem('affairs_sort') === 'az'){
      orderAZ.classList.add('outlined');
      orderZA.classList.remove('outlined');
    } else if(localStorage.getItem('affairs_sort') === 'za'){
      orderZA.classList.add('outlined');
      orderAZ.classList.remove('outlined');
    } else {
      orderAZ.classList.remove('outlined');
      orderZA.classList.remove('outlined');
    }
  });
}

let searchAffairBtn = document.getElementById('search-affair');
let inputFixed = document.getElementById('search-input-fixed');
let searchAffairBtnOpen = false;
searchAffairBtn.addEventListener('click', e => {
  e.preventDefault();
  let searchInputContainer = document.getElementById('search-input-fixed-container');
  if(!searchAffairBtnOpen){
    searchInputContainer.style.display = 'block';
    searchAffairBtnOpen = true;
  } else {
    searchInputContainer.classList.remove('animate__backInUp');
    searchInputContainer.classList.add('animate__backOutDown');
    setTimeout(() => {
      searchInputContainer.style.display = 'none';
      searchAffairBtnOpen = false;
      searchInputContainer.classList.remove('animate__backOutDown');
      searchInputContainer.classList.add('animate__backInUp');
    }, 600);
  }
});

inputFixed.addEventListener('input', () => {
  getAffairsData.search = inputFixed.value;
  getAffairs();
})

let orderAZ = document.getElementById('order_by_az');
let orderZA = document.getElementById('order_by_za');

orderAZ.addEventListener('click', () => {
  getAffairsData.order_by = 'az';
  localStorage.setItem('affairs_sort', 'az');
  getAffairs();
});

orderZA.addEventListener('click', () => {
  getAffairsData.order_by = 'za';
  localStorage.setItem('affairs_sort', 'za');
  getAffairs();
});

let showArchivesAffair = document.getElementById('show-archives-affair');

showArchivesAffair.addEventListener('click', () => {
  getAffairsData.archives = !getAffairsData.archives;
  localStorage.setItem('affair_archives', getAffairsData.archives ? 'true' : 'false');
  if(localStorage.getItem('affair_archives') === 'true'){
    showArchivesAffair.classList.add('outlined');
  } else {
    showArchivesAffair.classList.remove('outlined');
  }
  showArchivesAffair.setAttribute('my-title', getAffairsData.archives ? $t.buttons.hide_archives : $t.buttons.show_archives);
  getAffairs();
});

let deleteAffairBtn = document.getElementById('delete-affair');
let archiveAffairBtn = document.getElementById('archive-affair');

deleteAffairBtn.addEventListener('click', async () => {
  if(selectedAffairs.length === 0) return showAlert($t.titles.error, $t.messages.affair_not_selected);
  let url = `/delete-affair`;
  let res = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"ids": selectedAffairs})
  });
  if(res.status === 200){
    showAlert($t.titles.all_set, $t.messages.affair_deleted);
    getAffairs();
    selectedAffairs = [];
    return;
  } else {
    return showAlert($t.titles.error, $t.messages.affair_not_deleted);
  }
});

archiveAffairBtn.addEventListener('click', async () => {
  if(selectedAffairs.length === 0) return showAlert($t.titles.error, $t.messages.affair_not_selected);
  let res = await fetch('/archive-affair', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids: selectedAffairs })
  })
  if(res.status === 200){
    showAlert($t.titles.all_set, $t.messages.affair_archived);
    getAffairs();
    selectedAffairs = [];
    return;
  } else {
    return showAlert($t.titles.error, $t.messages.affair_not_archived);
  }
});

let prevBtn = document.getElementById('affair-prev-page');
let nextBtn = document.getElementById('affair-next-page');

prevBtn.addEventListener('click', () => {
  if(getAffairsData.prev){
    getAffairsData.page--;
    getAffairs();
  }
});

nextBtn.addEventListener('click', () => {
  if(getAffairsData.next){
    getAffairsData.page++;
    getAffairs();
  }
});

let affairQuantityResults = document.getElementById('affair-quantity-results');
affairQuantityResults.addEventListener('change', () => {
  getAffairsData.results = Number(affairQuantityResults.value);
  getAffairs();
});

let affairContentClose = document.getElementById('affair-content-close');
affairContentClose.addEventListener('click', () => {
  localStorage.setItem('opened_affar', 'false');
  let affairContent = document.getElementById('affair-content');
  affairContent.classList.remove('animate__fadeIn');
  affairContent.classList.add('animate__fadeOut');
  document.getElementById('affair-_id').value = '';
  setTimeout(() => {
    affairContent.style.display = 'none';
    affairContent.classList.remove('animate__fadeOut');
    affairContent.classList.add('animate__fadeIn');
  }, 300);
});

getAffairs();

