var express = require('express');
var router = express.Router();
const logactions=require('../common/logActions')
const commFunc=require('../common/commFunc')
const systems=require('../common/system')
const permissions=require('../common/permissions')
const users=require('../common/userActions')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    Msg:"接口地址错误，该地址不允许请求",
  })
  // res.header("Content-Type", "text/html;charset=utf-8"); 
  // res.render("index",{
  //   title:'a'
  // })
});
router.post('/', function(req, res, next) {
  res.json({
    Msg:"POST接口地址错误，该地址不允许请求",
  })
});
router.delete('/', function(req, res, next) {
  res.json({
    Msg:"delete接口地址错误，该地址不允许请求",
  })
});
//增加一条日志
router.get('/getlog', function(req, res, next) {
  logactions.getlogAll().then(t=>{
    res.json(t)
  })
});
router.get('/getlognum', function(req, res, next) {
  logactions.getlogAll().then(t=>{
    res.json(t.length)
  })
});
router.get('/getlog/page', function(req, res, next) {
  let pagenum=parseInt(req.query.pagenum),
  num=parseInt(req.query.num)
  if(pagenum==undefined||num==undefined){
    res.json({
      code:"111",
      Msg:"传入参数不正确"
    })
  }
  logactions.getlogPage(pagenum,num).then(t=>{
    res.json(t)
  })
});
router.get('/addlog', function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");  

  let username=req.query.username,
      content=req.query.content
  logactions.getlogAll().then(datas=>{
    let time=commFunc.getNowTime();
    console.log(commFunc.getNextid(datas))
    logactions.savetoDB({
      "sid":commFunc.getNextid(datas),
      "username":username,
      "content":content,
      "time":time
    }).then(data=>{
      res.json(data)
    })
  })

  
});
router.post('/session/add',function(req,res,next){
  let r=req.body
  if(r.guid==undefined){res.json({code:"111",msg:"传入参数为空或不存在"})}
  r.time=commFunc.getms()
  r.timestring=commFunc.getNowTime()
  systems.savetoDB(r).then(t=>{
    res.json(t)
  })
})

router.post('/session', function(req, res, next) {
  let guid=req.body.guid
  console.log(guid)
  if(guid==undefined){res.json({code:"111",msg:"请传入guid"});return}
  systems.getsession(guid).then(t=>{
    if(t.length==0){
      res.json({
        code:'111',
        msg:'guid不存在，请重新登陆'
      })
      return
    }else if(t.length==1){
      let before=t[0].time
      let now=new Date().getTime()
      let seq=Math.ceil((now-before)/(1000*60))
      if(seq>=commFunc.userLoginTimeGap){
          res.json({
            code:'111',
            msg:'登陆超时，请重新登陆'
          })
          return
      } else{
        systems.updateTime()
        console.log('a')
        res.json({
          code:'000',
          msg:'登陆状态正常'
        })
      }
  }
    else{
      res.json({
        code:'111',
        msg:'guid重复，请重新登陆'
      })
    }

  })


});

// 获取用户权限组
router.get('/access', function(req, res, next) {
  let username=req.query.username
  if (username==''||username==undefined){
    res.json({code:"111",msg:"传入参数为空或不存在"})
    return
  }
  users.getUserInfo(username).then(t=>{
    console.log(t[0])
    let groupname=t[0].usergroup
    permissions.getAccess(groupname).then(d=>{
      res.json(d[0].access)
    })
  })
});
module.exports = router;


