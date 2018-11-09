var express = require('express');
var router = express.Router();
var usersactions=require('../common/userActions')
const commFunc=require('../common/commFunc')
/* GET users listing. */
router.post('/login', function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
  // if(req.session.user==null||req.session.user==undefined){
  //   res.json({
  //     code:'222',
  //     msg:'登陆超时'
  //   })
  // }
  let username=req.body.username
  let userpass=req.body.userpass

  usersactions.checkUserPass(username,userpass).then((r)=>{
    // if(r.code == '000'){
    //   req.session.user ={username:username,time:commFunc.getms()};  
    //   console.log("addSession",req.session)
    // }
    res.json(r)
  })
});
router.get('/', function(req, res, next) {
  let username=req.query.username
  if(username==''||username==undefined){
    res.json({
      code:'222',
      msg:'用户名不能为空'
    })
    return
  }
  usersactions.getUserInfo(username).then(d=>{
    res.json(d)
  })
})
router.get('/all', function(req, res, next) {

  usersactions.getAllUser().then(d=>{
    res.json(d)
  })
})
router.post('/save', function(req, res, next) {
  console.log(req.body)
  if(req.body.username==''||req.body.userpass==''){
    res.json({
      code:'222',
      msg:'用户名密码不能为空'
    })
    return
  }
  let r=req.body
  usersactions.getAllUser().then(d=>{
    // res.json(d)
    for(let v of d){
      if(r.name==v.username){
        res.json({
          code:"222",
          msg:"用户名重复"
        })
        return
      }
    }
    r.sid=parseInt(commFunc.getNextid(d))
    r.createdate=commFunc.getNowTime()
    // console.log(r)
    usersactions.savetoDB(r).then(t=>{
      res.json(t)
    })
  })
})
router.get('/del', function(req, res, next) {
  if(req.query.sid==undefined||req.query.sid==''||req.query.sid==null){
    res.json({
      code:'222',
      msg:'请传入sid'
    })
    return
  }
  let sid=parseInt(req.query.sid)
  usersactions.deleteByID(sid).then(d=>{
    res.json(d)
  })
})
router.post('/update', function(req, res, next) {
  if(req.body.data==''  ){
    res.json({
      code:'222',
      msg:'用户名密码不能为空'
    })
    return
  }
  let data=JSON.parse(req.body.data)

  usersactions.updateUserInfo(data).then(t=>{
    res.json(t)
  })
})

module.exports = router;
