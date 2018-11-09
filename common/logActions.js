const mongoose=require("./connectMongoDB")
let  Schema = mongoose.Schema

let logSchema= new Schema({
    sid:{type:Number},
    username:{type:String},
    content:{type:String},
    time:{type:String}
})
let logModel = mongoose.model('logs',logSchema)
module.exports={
  savetoDB:function(data){
    return new Promise((reslove,reject)=>{
      let newlog=new logModel(data);
      newlog.save((error,res)=>{
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
  getlogAll:function(){
    return new Promise((reslove,reject)=>{
      logModel.find({},(err,results)=>{
          if(err==null){
            reslove&& reslove(results)
          }else{
            reslove&& reslove({
              "code":"111",
              "msg":"查询失败"
            }) 
          }
          })
    })
  },
  getlogPage:function(pagenum,num){
    pagenum=pagenum-1<=0?0:pagenum-1;
    return new Promise((reslove,reject)=>{
      logModel.find({}).skip(pagenum*num).limit(num).exec((err,results)=>{
          reslove && reslove(results)
      })
    })
  },
}