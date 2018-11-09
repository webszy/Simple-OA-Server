var express = require('express');
var router = express.Router();
const riliactions=require('../common/riliActions')
const commFunc=require('../common/commFunc')

router.post('/save', function(req, res, next) {
  let reqdatas=req.body
  if(reqdatas.title==''||reqdatas.startdate==''||reqdatas.enddate==''){
    res.json({
      code:'222',
      msg:'内容或日期不能为空'
    })
  }

  riliactions.getAll().then(t=>{
      reqdatas.sid=commFunc.getNextid(t)
      reqdatas.time=commFunc.getNowTime()
      riliactions.savetoDB(reqdatas).then(d=>{
      res.json(d)
    })
  })
})
router.get('/all', function(req, res, next) {
  riliactions.getAll().then(t=>{
    res.json(t)
  })
})
router.get('/del', function(req, res, next) {
  if(req.query.sid==''||req.query.sid==undefined){
    res.json({
      code:'111',
      msg:'请传入sid'
    })
  }
  let sid=parseInt(req.query.sid)
  riliactions.deleteByID(sid).then(t=>{
    res.json(t)
  })
})
module.exports = router;


