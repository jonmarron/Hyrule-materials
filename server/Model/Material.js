const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const materialSchema = new Schema({
  category:String,
  common_locations: Array,
  cooking_effect: String,
  description: String,
  hearts_recovered: Number,
  id: Number,
  image: String,
  name: String,
  isFavourite: Boolean
})

const Material = model('Material', materialSchema);

module.exports = Material;