const express = require('express');
const bcrypt = require('bcryptjs')
const route = express.Router();
const userModel = require('../../components/user/user.model');
const { use } = require('passport');
route.post('/', async function (req, res, next) {
    console.log(req);
    const hash = bcrypt.hashSync(req.body.password, 10);
    var user = {
        UserID: req.body.id,
        Password: hash,
        Email: req.body.email,
        FullName: req.body.fullName,
    };
    console.log(user);
    await userModel.addUser(user);
    res.json('success');
})
module.exports = route;