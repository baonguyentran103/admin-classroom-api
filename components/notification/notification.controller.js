const express = require('express');
const notificationService = require('./notification.service');
const router = express.Router();


router.post('/user/:userID', async (req, res, next) => {
    const result = await notificationService.addNoti(req.params.userID, req.body.content, req.body.link);
    res.json(result);
});
router.get('/user/:userID', async (req, res, next) => {
    const result = await notificationService.getNotiOfUser(req.params.userID);
    res.json(result);
});
router.put('/:notiID', async (req, res, next) => {
    const result = await notificationService.editNoti(req.params.notiID);
    res.json(result);
});
module.exports = router;


