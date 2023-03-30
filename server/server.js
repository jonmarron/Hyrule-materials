const mongoose = require('mongoose');
const Material = require('./Model/Material.js')

const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 9000;

mongoose.connect("mongodb+srv://jonmarron:mmKJucyyCBjcSNsl@cluster0.tfvjd7h.mongodb.net/test");

const getMaterials = async () => {
  const response = await fetch('https://botw-compendium.herokuapp.com/api/v2/category/materials');

  const data = await response.json();
  data.data.map(material => {
    const newMat = {
      ...material,
      isFavourite: false
    }
    const mat = new Material(newMat)
    mat.save()
  })
  
  const list = await Material.find({});
  return list
}
const firstGet = async () => {
  let list = await Material.find({});
  if(list.length === 0) list = getMaterials();
}

firstGet();

app.get('/api/materials', async (req, res, next) => {
  let list = await Material.find({});
  res.json(list)
}).put('/api/materials', async (req, res, next) => {
  const {_id, isFavourite} = req.body;
  const update = {isFavourite: !isFavourite};
  const filter = {_id: _id};
  
  try {
    const favEdit = await Material.findOneAndUpdate(filter, update, {
      new: true
    });
    if(!favEdit){
      return res.status(400).json({error: 'Material not found'})
    }
    res.json(favEdit);
  } catch (err) {
    next(err);
  }
})

app.listen(PORT, () => console.log(`App ist listenin on http://localhost:${PORT} \nfavs on ---> http://localhost:${PORT}/api/fav-materials`));