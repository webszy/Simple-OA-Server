var express = require('express');
var router = express.Router();
const teamActions=require('../common/teamActions')
const commFunc=require('../common/commFunc')

router.get('/all', function(req, res, next) {
  teamActions.getAll().then(t=>{
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

  teamActions.getAll().then(t=>{
      reqdatas.sid=commFunc.getNextid(t)
      reqdatas.ptime=commFunc.getNowTime()
      // console.log(reqdatas)
      teamActions.savetoDB(reqdatas).then(d=>{
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
  teamActions.getdiscussPage(pagenum,num).then(t=>{
    res.json(t)
  })
})
router.get('/', function(req, res, next) {
  if(req.query.sid==undefined){res.json({code:"111",msg:"请传入sid"})}
  let sid=parseInt(req.query.sid)
  teamActions.getdiscussByID(sid).then(t=>{
    res.json(t)
  })
})
router.get('/del', function(req, res, next) {
  if(req.query.sid==undefined){res.json({code:"111",msg:"请传入sid"})}
  let sid=parseInt(req.query.sid)

  teamActions.deleteByID(sid).then(t=>{
    res.json(t)
  })
})
router.post('/reply', function(req, res, next) {
  if(req.body.sid==undefined||req.body.reply==undefined){res.json({code:"111",msg:"传入参数错误"})}
  let sid=parseInt(req.body.sid),reply={
    msg:req.body.reply,
    time:commFunc.getNowTime()
  }
  console.log(reply)
  teamActions.getdiscussByID(sid).then(d=>{
    console.log(d[0])
    let ans=(d[0].replys==undefined?[]:d[0].replys)
    ans.push(reply)
    console.log(ans)
    teamActions.updateByID(sid,ans).then(t=>{
          res.json(t)
    })
  })
})

  module.exports = router;
