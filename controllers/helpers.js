//ROUTER SETUP
//=========================================
var express = require('express');
var router = express.Router();

router.get('/get-user', function(req, res){
  var user = req.user;
  console.log("USER LOGGED IN >>>>>>>", user);
  res.json({user: user});
});


module.exports = router;
