const mongoose=require("./connectMongoDB")
const commFunc=require("./commFunc")
let  Schema = mongoose.Schema
let sessionSchema= new Schema({
  username:{type:String},
  guid:{type:String},
  time:{type:String},
  timestring:{type:String}
})

let sessionModel = mongoose.model('sessions',sessionSchema)
module.exports={
    savetoDB:function(data){
      return new Promise((reslove,reject)=>{
        let newsession=new sessionModel(data);
        newsession.save((error,res)=>{
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
    getsession:function(guid){
      return new Promise((reslove,reject)=>{
        sessionModel.find({guid:guid},(err,results)=>{
              reslove&& reslove(results)
        })
      }) 
    },
    updateTime:function(id){
      let now=commFunc.getms()
      return new Promise((reslove,reject)=>{
        sessionModel.findOneAndUpdate({guid:id}, {time:now},(err,results)=>{
          reslove&& reslove({
            code:'000',
            msg:'更新登录状态成功'
          })
        })
      }) 
    }
  
}