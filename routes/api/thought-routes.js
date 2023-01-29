const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  removeThought,
} = require('../../controllers/thoughController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/students/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addThought);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:studentId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;