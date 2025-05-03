const Comment = require('../models/commentModel');
const Photo = require('../models/photoModel');
require('../models/userModel');


const createComment = async function (req, res) {
  try {
    const { message } = req.body;
    const photoId = req.params.id;

    const comment = new Comment({
      message,
      photo: photoId,
      postedBy: req.session.userId
    });

    const savedComment = await comment.save();

    // Poveži s fotografijo
    await Photo.findByIdAndUpdate(photoId, {
      $push: { comments: savedComment._id }
    });

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: 'Napaka pri dodajanju komentarja' });
  }
};
const getCommentsForPhoto = async function (req, res) {
  try {
      const comments = await Comment.find({ photo: req.params.id })
          .populate('postedBy', 'username'); // <-- to je pomembno
      res.json(comments);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Napaka pri nalaganju komentarjev' });
  }
};

module.exports = {
  createComment,
  getCommentsForPhoto
};
