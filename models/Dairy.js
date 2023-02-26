const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Dairy = require("../schemas/DairyData");

// Get all notes
router.get("/getallnotes", fetchUser, async(req, res)=>{
    try{
    const data = req.user.id;
    const userData = await Dairy.find({user: data});
    res.json(userData);
  } catch {
    {
      error: "Some internal Error occured";
    }
  }
});

// adding notes

router.post(
    "/addnote",fetchUser,
    [
      body("title", "Enter valid title").isLength({ min: 3 }),
      body("description", "Enter valid Description").isLength({ min: 10 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let data = await Dairy.findOne({ title: req.body.title });
      if (data) {
        
        return res.status(400).json({ erorr: "Enter a unique title" });
      }
  try{
      data = await Dairy.create({
          user: req.user.id,
          title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      res.json( req.body);
    }catch {
        {
          error: "Some internal Error occured";
        }
    }
});

  // Updating the note
  router.post(
    "/updatenote/:id",fetchUser,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({  errors: errors.array()});
      }
      const {title, description, tag} = req.body;
      const newNote = {};
      if(title){
        newNote.title = title
      }
      if(description){
        newNote.description = description
      }
      if(tag){
        newNote.tag = tag
      }
      
      let note = await Dairy.findById(req.params.id)
      if(!note){
        return res.status(400).send("Invalid details");
      }
      note = await Dairy.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
      res.send( note);
    })
    // For Deleting the note
router.delete(
    "/deletenote/:id",fetchUser,
    async (req, res) => {
      let note = await Dairy.findById(req.params.id)
      if(!note){
        return res.status(400).send("Invalid details");
      }
      note = await Dairy.findByIdAndDelete(req.params.id)
      res.send({"succes":"You note has been succefully deleted"});
    })
  
module.exports = router;
