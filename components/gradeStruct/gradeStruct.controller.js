const express = require('express');
const gradeStructService = require('./gradeStruct.service');
const router = express.Router();

router.get('/class/:id', async (req, res, next) => {
    const rs = await gradeStructService.getGradeStruct(req.params.id);
    console.log(rs);
    res.json(rs);

});
router.put('/class/:id/rank/:rank', async (req, res, next) => {
    const rs = await gradeStructService.putGradeStruct(req.params.id, req.params.rank, req.body);
    console.log("PUT RANK", req.params.rank, req.body);
    res.json(rs);
    // res.json(rs);
});
router.delete('/class/:id/rank/:rank', async (req, res, next) => {
    const rs = await gradeStructService.deleteGradeStruct(req.params.id, req.params.rank);
    res.json(rs);
    // res.json(rs);
});
module.exports = router;


