const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users')
const User = require('../models/user');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.login)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.renderLogin)

router.get('/logout', users.logout)
module.exports = router;