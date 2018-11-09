var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    Msg:"接口地址错误，该地址不允许请求",
  })
});

module.exports = router;
