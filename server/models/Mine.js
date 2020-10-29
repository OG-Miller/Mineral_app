const mongoose = require('mongoose');

const MineSchema = mongoose.Schema({
  title: {
   type: String,
   required: true,
  },
  bookmarkLink: {
    type: String,
    required: true,
   },
  body: Object,
  author: String,
},
  { timestamps:true }
);

module.exports = mongoose.model('Mine', MineSchema);


