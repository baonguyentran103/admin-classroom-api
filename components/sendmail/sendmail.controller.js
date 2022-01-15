const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sendmailService = require('./sendmail.service');

router.post('/', async function (req, res, next) {
    const ilink = req.body.ilink;
    const rmail = req.body.email;
    console.log(ilink, rmail);
    await sendmailService.sendmail(ilink, rmail);
    res.json('success');

});






module.exports = router;
