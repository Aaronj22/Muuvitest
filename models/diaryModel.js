const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
  diary_date: {
    type: Date,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  emojiClass: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Diary', DiarySchema);
