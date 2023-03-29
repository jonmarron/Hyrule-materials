const mongoose = require('mongoose');
const Material = require('./Model/Material.js')

const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 9000;

mongoose.connect("mongodb+srv://jonmarron:mmKJucyyCBjcSNsl@cluster0.tfvjd7h.mongodb.net/test");

app.get('/api/fav-materials', async (req, res, next) => {
  const list = await Material.find({});
  res.json(list)
}).post('/api/fav-materials', (req, res, next) => {
  const material = new Material(req.body);
  material.save()
  .then(material => res.json(material))
  .catch(err =>res.status(400).json({success:false}));
})

app.listen(PORT, () => console.log(`App ist listenin on http://localhost:${PORT} \nfavs on ---> http://localhost:${PORT}/api/fav-materials`));