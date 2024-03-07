let saveConfigButton = document.getElementById('save-config');

let language = document.getElementById('language-select')??null;
if(language !== null){
  language.value = language?.getAttribute('defaultLang');
}
document.querySelectorAll('.configuration').forEach((config) => {
  //si es select se le asigna un evento change
  if(!config) return
  if(config.tagName == "SELECT"){
    config.addEventListener('change', (e) => {
      configurations.push({
        name: config.getAttribute('name'),
        value: config.value
      })
    })
  }
  // si es input se le asigna un evento input
  else if(config.tagName == "INPUT"){
    config.addEventListener('input', (e) => {
      configurations.push({
        name: config.getAttribute('name'),
        value: config.getAttribute('type') === 'number' ? +config.value : config.value
      })
    })
  }
});

saveConfigButton?.addEventListener('click', async (e) => {
  e.preventDefault();
  let res = await fetch(api+'change-configs', {
    method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        configurations
      })
  });
  if(res.status == 200){
    showAlert($t.pages.config.configs_updateds, $t.pages.config.configs_updated_sucess, true);
  } else if(res.status == 201){
    showAlert($t.pages.config.configs_updateds, $t.pages.config.no_updated_configs, false);
  }
})