// const { json } = require('express');
const express = require('express');
const router = express.Router();
const Mine = require('../models/Mine'); 

// gets back all the mines ** WORKING AND IN USE!
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

//find specific mine  - ** WORKING AND IN USE!
router.get('/:mineId', async (req, res) => {
  try {
    const mine = await Mine.findById(req.params.mineId);   //we can use the Model attributes to search/filter
    console.log(mine);      
    res.json(mine); 
  } catch(err) {
    res.json({message: err});
  } 
});


// creates a mine ** WORKING AND IN USE!
router.post('/', async (req, res) => {
  const mine = new Mine({
    title: req.body.title,
    bookmarkLink: req.body.bookmarkLink,
    body:req.body.body, 
    mineStatus: req.body.mineStatus
  });
  try{
    const savedMine = await mine.save();
    console.log(res.json(savedMine));
  }catch(err){
    res.json({message: err})
  } 

})



//delete entire mine ** WORKING AND IN USE!
router.delete('/:mineId', async (req, res) => {
 try{
   const deletedMine = await Mine.deleteOne({_id: req.params.mineId});
   res.json(deletedMine);
   } catch(err) {
   res.json({message: err});
 } 
 
})

// delete a specific note by id ** WORKING AND IN USE!
router.patch('/del/:mineId/:noteIdent', async (req, res) => {
  try {
    const deletedNote = await Mine.updateOne(
    { _id: req.params.mineId},
    { $pull: { notes: { _id: req.params.noteIdent } } }
   );
      res.json(deletedNote);
   } catch(err) {
     res.json({message:err})
  }
});
      

 //update a MINE - WORKING AND IN USE!
router.patch('/:specMineId', async (req, res) => {
  try{
    const updatedMine = await Mine.updateOne(
      { _id: req.params.specMineId},
      { $set: { title: req.body.title , body: req.body.body , bookmarkLink: req.body.bookmarkLink  , mineStatus: req.body.mineStatus} } // add more fields here
      );
      res.json(updatedMine);
  } catch(err) {
    res.json({ message:err })
  } 
});


//add note to notes array ** WORKING AND IN USE!
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

//update a specific note #1
// router.patch('/:mineId/update/:specNoteId', async (req, res) => {
//   try{
//     const updatedNote = await Mine.notes.updateOne(
//       { _id: req.params.specMineId },
//       { $set: { notes:
//         [
//         {
//           title: req.body.title,
//           link: req.body.link,
//           note: req.body.note
//         } ]
//       }}
//     );
//     console.log(req.body);
//     res.json(updatedNote);
//   } catch(err) {
//     res.json({message:err})
//   }
// });

//update specific note#2 NOT WORKING BUT IN USE!!!
router.patch('/:mineId/update/:specNoteId', async (req, res) => {
  try{
    const updatedMine = await Mine.updateOne( //array filter
      { "notes._id": req.params.specNoteId }, //query 
      { $set: { "notes.$": // this uses the note specified in query, $ will identify the correct element in the array to update without explicitly specifying the position of the element in the array
        [ 
        
          {
            _id: req.params.specNoteId,
            title: req.body.title,
            link: req.body.link,
            note: req.body.note
          } 
      ]
      }}
    
      );
      res.json(updatedMine);
  } catch(err) {
    res.json({ message:err })
  } 
});


module.exports = router; 