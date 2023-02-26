const mongoose = require('mongoose')
const { Schema } = mongoose;

const NumberSchema = new Schema({
 user:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user'
 },
  name:{
    type:String,
    required: true
  },
  number:{
    type: String,
    required: true,
    unique:true
  },
  email:{
    type:String,
  },
  label:{
    type:String
  }

});
const Numbers =  mongoose.model("number", NumberSchema);
module.exports = Numbers