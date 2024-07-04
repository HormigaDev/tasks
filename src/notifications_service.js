const path = require('path');
const {exec, spawn } = require('child_process');
const axios = require('axios');
function exitProcess(){
  return new Promise((resolve, reject) => {
    try {
      exec('taskkill /F /IM bbel_notifications_service.exe', (err, stdout, stderr) => {
        if(err){
          console.error('Error al finalizar el proceso');
          // console.error(err);
          resolve();
        }
        console.log('Proceso Anterior finalizado');
        resolve();
      });
    } catch(err){
      console.error('Error al iniciar el proceso');
      resolve();
      // console.error(err);
    }
  })  
}
async function startProcess(processPath, args = []) {
  await exitProcess();
  const process = spawn(processPath, args, {
    detached: false, // Para que el proceso continúe ejecutándose después de que el padre termine
    stdio: 'ignore' // Ignorar la entrada/salida estándar
  });
  process.on('error', (err) => {
    console.error(`Error al iniciar el proceso: ${err}`);
  });

  process.on('exit', (code) => {
    console.log(`Proceso terminado con código ${code}`);
  });

  console.log(`Proceso iniciado: ${processPath}`);
}

const processPath = path.join(__dirname, 'bbel_notifications_service.exe');

function executeNotificationsService(){
  try {
    axios.get('http://localhost:19221/status/notifications').then(response => {
      const data = response.data;
      if(data.status === 'operational'){
        console.log("El servicio de notificaciones ya está en ejecución");
      } else {
        // startProcess(processPath);
      }
    }).catch(err => {
      console.error('Error al verificar el estado del servicio de notificaciones');
      // console.error(err);
      startProcess(processPath);
    });
  } catch(err){
    console.error('Error al verificar el estado del servicio de notificaciones');
    // console.error(err);
    // startProcess(processPath);
  }
}

module.exports = executeNotificationsService;