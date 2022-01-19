const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const route = express.Router();
const passport = require('./index');
const adminModel = require('../../components/admin/admin.model');
const { v4: uuidv4 } = require("uuid");
const refreshToken = require('../model/refreshToken.model');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("241758761089-mhhbbvca0eh6nh60sko4td8tp0iqe6r7.apps.googleusercontent.com");
route.post('/', passport.authenticate('local', { session: false }), async function (req, res, next) {
    console.log(req.user);
    let day = new Date();
    day.setTime(day.getTime() + 60480000)

    const user = await adminModel.getAdminByEmail(req.user.email);
    console.log(user);
    res.json({
        token: jwt.sign({
            email: req.user.email,
            id: req.user.id,
            fullName: user.length !== 0 ? user[0].Fullname : '',
            spec: uuidv4(),
        }, process.env.JWT_SECRET, {
            expiresIn: '30m'
        }),
    })
})

module.exports = route;