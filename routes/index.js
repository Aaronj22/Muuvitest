const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authorize, ensureAuth, ensureGuest } = require('../middleware/auth');
const DiaryEntry = require('../models/diaryModel')

const Story = require('../models/StoryModel');

// @desc    Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

router.get('/etusivu_opiskelija', ensureAuth, authorize('patient'), async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user._id }).lean();
    // const stories = await Story.find({}).lean();

    res.render('frontpage_student', {
      layout: 'student/frontpage_student',
      username: req.user.username,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500', {
      layout: 'error',
    });
  }
});

// @desc    Dashboard-staff
// @route   GET /dashboard-staff
router.get(
  '/potilaslista', ensureAuth, authorize('nurse'), async (req, res) => {
    try {
      res.render('patientlist', {
        layout: 'nurse/patientlist',
        role: req.user.role,
      });
    } catch (err) {
      console.error(err);
      res.render('error/500', {
        layout: 'error',
      });
    }
  }
);

// @desc    Dashboard
// @route   GET /dashboard
// router.get('/dashboard', ensureAuth, async (req, res) => {
//     try {
//     const decoded = jwt.verify(req.cookies.cookieToken, process.env.SECRET);
//     const stories = await Story.find({ user: decoded._id }).lean();
//     // const stories = await Story.find({}).lean();
//     res.render('dashboard', {
//       // username: decoded.username,
//       stories,
//       });
//     } catch (err) {
//       console.error(err);
//     res.render('error/500');
//     }
// });

router.get('/liikuntasuunnitelma_potilas', (req, res) => {
  res.render('student_excercise_plan', {
    layout: 'student/student_excercise_plan',
  });
});

router.get('/aktiviteetit_ja_paivakirja', (req, res) => {
  res.render('activities_and_diary', {
    layout: 'student/activities_and_diary',
  });
});

router.get('/hrv_mittaukset', (req, res) => {
  res.render('hrv_measurements', {
    layout: 'student/hrv_measurements',
  });
});


router.get('/liikuntasuunnitelma', (req, res) => {
  res.render('excercise_plan', {
    layout: 'nurse/excercise_plan',
  });
});

router.get('/etusivu_ammattilainen', (req, res) => {
  res.render('frontpage_nurse', {
    layout: 'nurse/frontpage_nurse',
  });
});

router.get('/potilaslista', (req, res) => {
  res.render('patientlist', {
    layout: 'nurse/patientlist',
  });
});

module.exports = router;
