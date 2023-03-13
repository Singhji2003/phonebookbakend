const mongoose = require('mongoose')
const { Schema } = mongoose;

const NumberSchema = new Schema({
 user:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user'
 },
  name:{
    type:String,
    default:""
  },
  number:{
    type: String,
    required: true,
    default:""
  },
  email:{
    type:String,
    default:""
  },
  label:{
    type:String,
    default:""
  }

});
const Numbers =  mongoose.model("number", NumberSchema);
module.exports = Numbers