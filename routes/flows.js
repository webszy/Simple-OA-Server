var express = require('express');
var router = express.Router();
const flowActions=require('../common/flowActions')
const commFunc=require('../common/commFunc')

router.get('/all', function(req, res, next) {
  flowActions.getAll().then(t=>{
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
  reqdatas.content=JSON.parse(reqdatas.content)
  flowActions.getAll().then(t=>{
      reqdatas.sid=commFunc.getNextid(t)
      flowActions.savetoDB(reqdatas).then(d=>{
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
  if(req.query.type==undefined){
    flowActions.getFlowPage(pagenum,num).then(t=>{
      res.json(t)
    })
  }else{
    flowActions.getFlowTypePage(pagenum,num,type).then(t=>{
      res.json(t)
    })
  }
 
})
router.get('/', function(req, res, next) {
  let sid=parseInt(req.query.sid),
  type=parseInt(req.query.type)
  
    if(sid==undefined&&type==undefined){
      res.json({code:"111",msg:"请传入相应参数"})
    }else{
      if(sid!=undefined){
        flowActions.getFlowByID(sid).then(t=>{
          res.json(t)
        })
      }else if(type!=undefined){
        flowActions.getFlowByType(type).then(t=>{
          res.json(t)
        })
      }else{
        res.json({code:"111",msg:"sid与type不能同时传入"})
      }
    }

})
router.get('/del', function(req, res, next) {
  if(req.query.sid==undefined){res.json({code:"111",msg:"请传入sid"})}
  let sid=parseInt(req.query.sid)

  flowActions.deleteByID(sid).then(t=>{
    res.json(t)
  })
})


  module.exports = router;
