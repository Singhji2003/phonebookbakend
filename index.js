const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const connectToMongoose = require('./db.js');
const mongoose = require('mongoose')
var cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
mongoose.set('strictQuery', false)
app.use(cors())

connectToMongoose();
app.use(express.json())
app.use('/user', require('./models/User'))
app.use('/number', require('./models/Numbers'))
app.use('/dairy', require('./models/Dairy'))

// heroku
// step 3: Heroku 
if ( process.env.NODE_ENV == "production"){
  app.use(express.static("phonebook/build"));
  const path = require("path");
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'phonebook', 'build', 'index.html'));

  })
}

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})