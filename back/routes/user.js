//                                /api/user
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register, login, logOut, me, getUsers, updatePass } = require('../controllers/user');
const { isAdmin } = require('../middleware/isUser');

router.post('/register', register);
router.post('/login', passport.authenticate('local'), login);
router.post('/logout', logOut);
router.post('/change', isAdmin, updatePass);
router.get('/', getUsers);
//PERSISTENCIA DE SESIÓN
router.get('/me', me);

module.exports = router;
