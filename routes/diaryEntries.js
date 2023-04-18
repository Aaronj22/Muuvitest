const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ensureAuth } = require('../middleware/auth');

const DiaryEntry = require('../models/diaryModel');

router.post('/', async (req, res) => {
  try {
 //   console.log('POST request to /diaryEntries');
    console.log('Request body:', req.body);

    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    req.body.user = decoded._id;

    const { diary_date, body, emojiClass } = req.body;

    // Creating a new diary which includes date, text (body), emoji and user info
    const newEntry = await DiaryEntry.create({ diary_date, body, emojiClass, user: req.body.user });
    
    console.log('New diary entry created:', newEntry);

    res.redirect('/activities_and_diary');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

router.get('/', ensureAuth, async (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  try {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
    const diaryEntries = await DiaryEntry.find({ user: decoded._id }).sort({ diary_date: -1 }).skip(skip).limit(10).lean();
    res.json(diaryEntries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch diary entries', error: err });
  }
});


// router.get('/', ensureAuth, async (req, res) => {
//   const skip = parseInt(req.query.skip) || 0;
//   try {
//     const diaryEntries = await DiaryEntry.find({ user: req.user._id }).sort({ diary_date: -1 }).skip(skip).limit(10).lean();
//     res.json(diaryEntries);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch diary entries', error: err });
//   }
// });

router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const diaryEntry = await DiaryEntry.findById(req.params.id).lean();
    res.json(diaryEntry);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
