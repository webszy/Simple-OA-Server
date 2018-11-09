var express = require('express');
var router = express.Router();
const fileActions=require('../common/fileActions')
const commFunc=require('../common/commFunc')

router.get('/all', function(req, res, next) {
  fileActions.getAll().then(t=>{
    res.json(t)
  })
})
router.post('/save', function(req, res, next) {
  let reqdatas=req.body
  if(reqdatas.content==''||reqdatas.title==''){
    res.json({
      code:'222',
      msg:'内容或标题不能为空'
    })
  }

  fileActions.getAll().then(t=>{
      reqdatas.sid=commFunc.getNextid(t)
    fileActions.savetoDB(reqdatas).then(d=>{
      res.json(d)
    })
  })
})
router.get('/page', function(req, res, next) {
  if(req.query.pagenum==''
      ||req.query.pagenum==undefined
      ||req.query.num==''
      ||req.query.num==undefined
  ){
    res.json({
      code:'222',
      msg:'传入参数错误'
    })
  }
  let pagenum=parseInt(req.query.pagenum),
  num=parseInt(req.query.num)
  fileActions.getFilePage(pagenum,num).then(t=>{
    res.json(t)
  })
})
router.get('/', function(req, res, next) {
  if(req.query.sid==undefined){res.json({code:"111",msg:"请传入sid"})}
  let sid=parseInt(req.query.sid)
  fileActions.getFileByID(sid).then(t=>{
    res.json(t)
  })
})
router.get('/del', function(req, res, next) {
  if(req.query.sid==undefined){res.json({code:"111",msg:"请传入sid"})}
  let sid=parseInt(req.query.sid)

  fileActions.deleteByID(sid).then(t=>{
    res.json(t)
  })
})

  module.exports = router;
