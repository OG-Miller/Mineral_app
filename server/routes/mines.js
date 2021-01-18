// const { json } = require('express');
const express = require('express');
const router = express.Router();
const Mine = require('../models/Mine');

// gets back all the MINES
router.get('/mines', async (req, res) => {
	try {
		const mines = await Mine.find(); // append .limit etc to not return every mine
		console.log(mines);
		res.json(mines);
	} catch (err) {
		res.json({ message: err });
	}
	return;
});

//find specific MINE
router.get('/:mineId', async (req, res) => {
	try {
		const mine = await Mine.findById(req.params.mineId); //we can use the Model attributes to search/filter
		console.log(mine);
		res.json(mine);
	} catch (err) {
		res.json({ message: err });
	}
});

// creates a MINE
router.post('/', async (req, res) => {
	const mine = new Mine({
		title: req.body.title,
		bookmarkLink: req.body.bookmarkLink,
		body: req.body.body,
		mineStatus: req.body.mineStatus,
	});
	try {
		const savedMine = await mine.save();
		console.log(res.json(savedMine));
	} catch (err) {
		res.json({ message: err });
	}
});

//delete entire MINE
router.delete('/:mineId', async (req, res) => {
	try {
		const deletedMine = await Mine.deleteOne({ _id: req.params.mineId });
		res.json(deletedMine);
	} catch (err) {
		res.json({ message: err });
	}
});

// delete a specific NOTE by id
router.patch('/del/:mineId/:noteIdent', async (req, res) => {
	try {
		const deletedNote = await Mine.updateOne(
			{ _id: req.params.mineId },
			{ $pull: { notes: { _id: req.params.noteIdent } } }
		);
		res.json(deletedNote);
	} catch (err) {
		res.json({ message: err });
	}
});

//update a MINE
router.patch('/:specMineId', async (req, res) => {
	try {
		const updatedMine = await Mine.updateOne(
			{ _id: req.params.specMineId },
			{
				$set: {
					title: req.body.title,
					body: req.body.body,
					bookmarkLink: req.body.bookmarkLink,
					mineStatus: req.body.mineStatus,
				},
			} // add more fields here
		);
		res.json(updatedMine);
	} catch (err) {
		res.json({ message: err });
	}
});

//add NOTE to notes array
router.patch('/:mineId/add', async (req, res) => {
	try {
		const addedNote = await Mine.updateOne(
			{ _id: req.params.mineId },
			{
				$push: {
					notes: [
						{
							title: req.body.title,
							link: req.body.link,
							note: req.body.note,
						},
					],
				},
			}
		);
		console.log(req.body);
		res.json(addedNote);
	} catch (err) {
		res.json({ message: err });
	}
});

//update specific NOTE
router.patch('/:mineId/update/:specNoteId', async (req, res) => {
	try {
		const updatedMine = await Mine.updateOne(
			//array filter
			{ 'notes._id': req.params.specNoteId }, //query
			{
				$set: {
					// this uses the note specified in query, $ will identify the correct element in the array to update without explicitly specifying the position of the element in the array
					'notes.$': [
						{
							_id: req.params.specNoteId,
							title: req.body.title,
							link: req.body.link,
							note: req.body.note,
						},
					],
				},
			}
		);
		res.json(updatedMine);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
