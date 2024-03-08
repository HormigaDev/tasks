let configurations = {};
let saveConfigButton = document.getElementById('save-config');

let selects = ['language-select'];
let inputs = ['descriptionLimit'];

selects.forEach(id => {
  let select = document.getElementById(id);
  select.addEventListener('change', () => {
    configurations[select.getAttribute('name')] = select.value;
  })
});

inputs.forEach(id => {
  let input = document.getElementById(id);
  input.addEventListener('input', () => {
    configurations[input.getAttribute('name')] = input.value;
  });
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