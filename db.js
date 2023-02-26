const  mongoose = require('mongoose');
const db = process.env.DATABASE;
const connectToMongoose = ()=>{
  mongoose.connect(db, ()=>{
      console.log("Mongoose Connected Succefully")
  })
}
module.exports = connectToMongoose;