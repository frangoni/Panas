//                                /api/user

const express = require("express");
const router = express.Router();
const { register, login, logOut, me } = require("../controllers/user");
const passport = require("passport");

router.post("/register", register);
router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logOut);
//PERSISTENCIA DE SESIÓN
router.get("/me", me);

module.exports = router;
