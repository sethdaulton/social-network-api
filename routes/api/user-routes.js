const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  createFriend,
  deleteFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

///api/users/:userId/friends/:friendId//
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUserById);

///api/users/:userId/friends/:friendId//
// router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;
