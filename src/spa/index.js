const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());

const staticPath = path.join(__dirname);
app.use(express.static(staticPath));

function main(){
  app.get('/*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  })
  
  const PORT = 19300;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = main;