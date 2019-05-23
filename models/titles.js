let mongoose = require("mongoose");

//create title schema
let titleSchema = mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  genre:{
    type:String,
    require: true
  }
})


let Title = module.exports = mongoose.model("Title", titleSchema);
