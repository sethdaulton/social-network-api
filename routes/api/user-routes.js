const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  newUser,
  putUserById,
  deleteUserById,
  createFriend,
  deleteFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

///api/users/:userId/friends/:friendId//
router.route('/:studentId/users/:userId/friends/:friendId').post(createFriend);

///api/users/:userId/friends/:friendId//
router.route('/:studentId/users/:userId/friends/:friendId').delete(deleteFriend);

// /api/users/:userId
router
  .route('/:courseId')
  .get(getUserById)
  .put(updateUser)
  .post(newUser)
  .put(putUserById)
  .delete(deleteUserById);

module.exports = router;
