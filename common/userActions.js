const mongoose=require("./connectMongoDB")
let  Schema = mongoose.Schema

let userSchema= new Schema({
  sid:{type:Number},
  username:{type:String},
  userpass:{type:String},
  userdesc:{type:String},
  usergroup:{type:String},
  createdate:{type:String}
})

let userModel = mongoose.model('users',userSchema)
module.exports={
  userModel,
  savetoDB:function(data){
    return new Promise((reslove,reject)=>{
      let newUsers=new userModel(data);
      newUsers.save((error,res)=>{
        if(error!=null){
          reslove && reslove({
            "code":"111",
            "msg":"添加失败"
          })
        }else{
          reslove && reslove({
            "code":"000",
            "msg":"添加成功"
          })
        }
      })
    })
  },
  checkUserPass:function(name,pass){
    return new Promise((reslove,reject)=>{
      userModel.find({username:name,userpass:pass},(err,results)=>{
          if(results.length==1){
            reslove&& reslove({
              "code":"000",
              "msg":"账号密码正确"
            })
          }else{
            reslove&& reslove({
              "code":"111",
              "msg":"账号密码不匹配"
            }) 
          }
          })
    })
  },
  getUserInfo:function(name){
    return new Promise((reslove,reject)=>{
      userModel.find({username:name},(err,results)=>{
            reslove&& reslove(results)
          })
    })
  },
  getAllUser:function(name){
    return new Promise((reslove,reject)=>{
      userModel.find({},(err,results)=>{
            reslove&& reslove(results)
          })
    })
  },
  deleteByID:function(id){
    return new Promise((reslove,reject)=>{
      userModel.deleteOne({sid:id},(err,result)=>{
        if(err==null){
          reslove&&reslove({
            code:'000',
            msg:'删除成功'        
          })
        }else{
          reslove&&reslove({
            code:'111',
            msg:'删除失败'
          })
        }
      })
    })
  },
  updateUserInfo:function(data){
    return new Promise((reslove,reject)=>{
      userModel.findOneAndUpdate({sid:data.sid},data,(err,results)=>{
        if(err==null){
          reslove&& reslove({
            code:'000',
            msg:'修改成功',
            result:results
               
          })
        }else{
          reslove&& reslove({
            code:'111',
            msg:'修改失败',
            result:results,
            error:err      
          })
        }
            
      })
    })
  },
}
