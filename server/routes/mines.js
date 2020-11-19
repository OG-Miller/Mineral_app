// const { json } = require('express');
const express = require('express');
const router = express.Router();
const Mine = require('../models/Mine'); 

// gets back all the mines
router.get('/mines', async (req, res) => {
  try {
    const mines = await Mine.find();// append .limit etc to not return every mine
    console.log(mines);
    res.json(mines);
    
    // console.log("mines here: " + mines);///test
  } catch(err){
    res.json({ message: err })
  } return;

});

//find specific mine  - 
router.get('/:mineId', async (req, res) => {
  try {
    const mine = await Mine.findById(req.params.mineId);   //we can use the Model attributes to search/filter
    console.log(mine);      
    res.json(mine); 
  } catch(err) {
    res.json({message: err});
  } 
});


// creates a mine
router.post('/', async (req, res) => {
  const mine = new Mine({
    title: req.body.title,
    bookmarkLink: req.body.bookmarkLink,
    body:req.body.body 
  });
  try{
    const savedMine = await mine.save();
    console.log(res.json(savedMine));
  }catch(err){
    res.json({message: err})
  } 

})



//delete post
router.delete('/:mineId', async (req, res) => {
 try{
   const deletedMine = await Mine.deleteOne({_id: req.params.mineId});
   res.json(deletedMine);
   } catch(err) {
   res.json({message: err});
 } 
 
})

//update a post
router.patch('/:mineId', async (req, res) => {
  try{
    const updatedMine = await Mine.updateOne(
      { _id: req.params.mineId },
      { $set: { title: req.body.title } }
      );
      res.json(updatedMine);
  } catch(err) {
    res.json({ message:err })
  } 
});


//try add data to array
router.patch('/:mineId/add', async (req, res) => {
  try{
    const addedNote = await Mine.updateOne(
      { _id: req.params.mineId },
      { $push: { notes:
        [
        {
          title: req.body.title,
          link: req.body.link,
          note: req.body.note
        } ]
      }}
    );
    console.log(req.body);
    res.json(addedNote);
  } catch(err) {
    res.json({message:err})
  }
});


module.exports = router; 