const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const filePath = './favMaterials.json';

const PORT = 9000;

const cors = require('cors');

app.use(cors());
app.use(express.json());

let favMaterials = {favMaterials: []};

fs.access(filePath, fs.constants.F_OK, (err) => {
  if(err){
    fs.writeFileSync(filePath, JSON.stringify(favMaterials));
  }
  favMaterials = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
})

app.get('/api/fav-materials', (req, res, next) => {
  res.json(favMaterials)
}).post('/api/fav-materials', (req, res, next) => {
  const material = req.body;
  favMaterials.favMaterials.push(material);
  fs.writeFileSync(filePath, JSON.stringify(favMaterials));
  res.status(200).send('POST succesful');
})

app.listen(PORT, () => console.log(`App ist listenin on http://localhost:${PORT} \nfavs on ---> http://localhost:${PORT}/api/fav-materials`));