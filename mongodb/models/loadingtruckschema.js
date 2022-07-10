const mongoose = require('mongoose')
const Schema  = mongoose.Schema;

const LoadTruckSchema = new Schema({
name: String,
location: String
})

const LoadTruckModel = mongoose.model('loadtruck',LoadTruckSchema)
module.exports =LoadTruckModel;

var myChar
