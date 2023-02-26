const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Numbers = require("../schemas/NumbersData");

// For getting all numbers
router.get("/getallnumbers",fetchUser,  async (req, res) => {
  try {
    // for fetching the user id
    const data = await req.user.id;
    // Getting data using the id
    const userData = await Numbers.find({user: data});
    res.json(userData);
  } catch {
    {
      error: "Some internal Error occured";
    }
  }
});
// Adding number
router.post(
  "/addnumber",fetchUser,
  [
    body("label", "Enter valid label").isLength({ min: 3 }),
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email Id").isEmail(),
    body("number", "Enter valid number").isLength({ min: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let data = await Numbers.findOne({ number: req.body.number });
    if (data) {
      
      return res.status(400).json({ erorr: "Enter a unique number" });
    }

    data = await Numbers.create({
        user: req.user.id,
      name: req.body.name,
      number: req.body.number,
      email: req.body.email,
      number: req.body.number,
      label: req.body.label,
    });
    res.json( req.body);
  }
);
// For updating the number
router.post(
  "/updatenumber/:id",fetchUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({  errors: errors.array()});
    }
    const {name,number, email, label} = req.body;
    const newNumber = {};
    if(name){
      newNumber.name = name
    }
    if(number){
      newNumber.number = number
    }
    if(email){
      newNumber.email = email
    }
    if(label){
      newNumber.label = label
    }
    let note = await Numbers.findById(req.params.id)
    if(!note){
      return res.status(400).send("Invalid details");
    }
    // if(note.user.toString() !== req.user.id){
    //   return res.status(400).send("Invalid details");

    // }
    note = await Numbers.findByIdAndUpdate(req.params.id, {$set:newNumber}, {new:true})
    res.send( note);
  })
// For Deleting the number
router.get(
  "/deletenumber/:id",fetchUser,
  async (req, res) => {
    let note = await Numbers.findById(req.params.id)
    if(!note){
      return res.status(400).send("Invalid details");
    }
    // if(note.user.toString() !== req.user.id){
    //   return res.status(400).send("Invalid details");

    // }
    note = await Numbers.findByIdAndDelete(req.params.id)
    res.send({"succes":"You note has been succefully deleted"});
  })

module.exports = router;
