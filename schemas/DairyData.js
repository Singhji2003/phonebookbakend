const mongoose = require('mongoose')
const { Schema } = mongoose;

const DairySchema = new Schema({
 user:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user'
 },
  title:{
    type:String,
    required: true
  },
  description:{
    type: String,
    required: true,
    unique:true
  },
  tag:{
    type:String
  }

});
const Dairy =  mongoose.model("dairy", DairySchema);
module.exports = Dairy