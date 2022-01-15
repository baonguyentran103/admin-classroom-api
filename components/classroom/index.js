const express = require('express');
const router = express.Router();
const ClassService = require('./class.model');
/* GET home page. */
router.get('/', async function(req, res, next) {
  classes = await ClassService.allClass()
  res.json(classes);
});
router.post('/', async function(req, res, next) {
  var classs = {
    Name: req.body.Name,
    Topic: req.body.Topic
  };
  await ClassService.createClass(classs);
  res.json(ClassService.allClass());
});


module.exports = router;
