const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  message: { type: String, required: true },
  photo: { type: Schema.Types.ObjectId, ref: 'Photo' },
  postedBy: { type: Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
