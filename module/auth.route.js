const express = require('express');
const bcrypt = require('bcryptjs')
const route = express.Router();
const jwt = require('jsonwebtoken');
const rTokenModel = require('./model/refreshToken.model');
const userModel = require('../components/user/user.model');
const { v4: uuidv4 } = require("uuid");
route.post('/', async function(req, res, next){
    const _rToken = req.body.refreshToken;
    const row = await rTokenModel.findToken(_rToken);
    if(!row){
        res.json('Unauthorized');
    }
    else{
        let dateEx = new Date(row[0].ExpiredDate);
        let current = new Date();
        console.log(dateEx);
        let cmp = dateEx.getTime()>= current.getTime();
        if(!cmp){
            res.json('Expired');
        }
        else{
            let email = row[0].Email;
            let user = await userModel.findUserByMail(email);
            if(user){
                res.json({
                    token: jwt.sign({
                        email: email,
                        id: user[0].UserID,
                        spec: uuidv4(),
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1h'
                    }),
                    refreshToken: _rToken,
                })
            }
        }


    }
})
module.exports = route;