const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const route = express.Router();
const passport = require('./index');
const userModel = require('../../components/user/user.model');
const { v4: uuidv4 } = require("uuid");
const refreshToken = require('../model/refreshToken.model');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("241758761089-mhhbbvca0eh6nh60sko4td8tp0iqe6r7.apps.googleusercontent.com");
route.post('/', passport.authenticate('local', { session: false }), async function (req, res, next) {
    console.log(req.user);
    let _rToken = uuidv4();
    let day = new Date();
    day.setTime(day.getTime() + 60480000)
    const token = {
        Email: req.user.email,
        Token: _rToken,
        ExpiredDate: day,
    }
    await refreshToken.addToken(token);
    const user = await userModel.getUserByEmail(req.user.email);
    console.log(user);
    res.json({
        token: jwt.sign({
            email: req.user.email,
            id: req.user.id,
            fullName: user.length !== 0 ? user[0].FullName : '',
            spec: uuidv4(),
        }, process.env.JWT_SECRET, {
            expiresIn: '5m'
        }),
        refreshToken: _rToken,
    })
})
route.post('/google', async function (req, res, next) {
    const tokenId = req.body.tokenId;
    client.verifyIdToken({ idToken: tokenId, audience: "241758761089-mhhbbvca0eh6nh60sko4td8tp0iqe6r7.apps.googleusercontent.com" }).then(async (response) => {
        const { email_verified, name, email } = response.payload;
        console.log(response.payload);
        if (email_verified) {
            const row = await userModel.findUserByMail(email);
            if (row == null) {
                var newUser = {
                    UserID: uuidv4(),
                    Email: email,
                    FullName: name,
                };
                await userModel.addUser(newUser);
                let _rToken = uuidv4();
                let day = new Date();
                day.setTime(day.getTime() + 60480000)
                const token = {
                    Email: email,
                    Token: _rToken,
                    ExpiredDate: day,
                }
                await refreshToken.addToken(token);
                console.log("123");
                res.json({
                    token: jwt.sign({
                        email: email,
                        id: newUser.UserID,
                        spec: uuidv4(),
                    }, process.env.JWT_SECRET, {
                        expiresIn: '5m'
                    }),
                    refreshToken: _rToken,
                })
            }
            else {
                let _rToken = uuidv4();
                let day = new Date();
                day.setTime(day.getTime() + 60480000)
                const token = {
                    Email: email,
                    Token: _rToken,
                    ExpiredDate: day,
                }
                await refreshToken.addToken(token);
                console.log("456");
                res.json({
                    token: jwt.sign({
                        email: email,
                        id: row[0].UserID,
                        spec: uuidv4(),
                    }, process.env.JWT_SECRET, {
                        expiresIn: '5m'
                    }),
                    refreshToken: _rToken,
                })
            }
        }

    })
})
module.exports = route;