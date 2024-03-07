let minimize = document.getElementById('appbar-minimize');
let maximize = document.getElementById('appbar-maximize');
let close = document.getElementById('closeapp');

[close, minimize, maximize].forEach(btn => {
    btn.addEventListener('click', async () => {
        let route = btn.getAttribute('route');
        let res = await fetch(`http://localhost:2735/${route}`, {
            method: 'POST'
        });
        let data = await res.json();
        if(data.success){
            console.log('success');
        }
    });
});