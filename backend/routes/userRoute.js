const express = require("express");
const router = express.Router();

const { getUser, getUsers, newUser, updateUser, deleteUser, login, toggleUserStatus, getUserData  } = require('../controllers/userController')

router.get('/user/:id', getUser);
router.get('/users', getUsers);
router.get('/user-data', getUserData);

router.post('/new', newUser);
router.post('/login', login);

router.patch('/update/:id', updateUser);
router.patch('/toggle-status/:id', toggleUserStatus)


router.delete('/delete/:id', deleteUser);

module.exports = router;