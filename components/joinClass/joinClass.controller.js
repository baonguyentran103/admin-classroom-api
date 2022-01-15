const express = require('express');
const router = express.Router();
const joinClassService = require('./joinClass.service')



router.get('/invitations/', async (req, res, next) => {
    const rs = 'OK';
    res.json(rs);
})

// add invitation
router.post('/invitations/', async (req, res, next) => {
    const classID = req.body.classID;
    const email = req.body.email;
    const role = req.body.role;
    
    const rs = await joinClassService.addInvitation(email, classID, role); 
    res.json(rs);
})


router.post('/confirm/:classID/', async (req, res, next) => {
    const classID = req.params.classID;
    const email = req.body.email;
    const rs = await joinClassService.addStudentIntoClass(email, classID);
    res.json(rs);
})

module.exports = router;