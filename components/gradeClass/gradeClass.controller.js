const express = require('express');
const gradeClassService = require('./gradeClass.service');
const router = express.Router();


router.put('/user/:userID/class/:classID/rank/:rank', async (req, res, next) => {
    const result = await gradeClassService.addOrEditGrade(req.params.classID, req.params.userID, req.params.rank, req.body.grade);
    res.json(result);
});
router.get('/class/:classID', async (req, res, next) => {
    const result = await gradeClassService.getGradeOfClass(req.params.classID);
    res.json(result);
});
router.get('/class/:classID/user/:userID', async (req, res, next) => {
    const result = await gradeClassService.getGradeOfStudentInClass(req.params.classID, req.params.userID);
    res.json(result);
});
router.put('/comment/user/:userID/class/:classID/rank/:rank', async (req, res, next) => {
    const result = await gradeClassService.EditComment(req.params.classID, req.params.userID, req.params.rank, req.body.tcCmt, req.body.stCmt, req.body.exGrade, req.body.status);
    res.json(result);
});
module.exports = router;


