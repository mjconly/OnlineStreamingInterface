let mongoose = require("mongoose");

//create title schema
let upcomingSchema = mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  src:{
    type:String,
    require: true
  }
})


let Upcoming = module.exports = mongoose.model("Upcoming", upcomingSchema);
