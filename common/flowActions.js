const mongoose=require("./connectMongoDB")
let  Schema = mongoose.Schema

let flowSchema= new Schema({
  sid:{type:Number},
  title:{type:String},
  username:{type:String},
  content:{},
  type:{type:String},
})
let flowModel = mongoose.model('flows',flowSchema)
module.exports={
  savetoDB:function(data){
    return new Promise((reslove,reject)=>{
      let newFlow=new flowModel (data);
      newFlow.save((error,res)=>{
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
  getFlowPage:function(pagenum,num){
    pagenum=pagenum-1<=0?0:pagenum-1;
    return new Promise((reslove,reject)=>{
      flowModel.find({}).skip(pagenum*num).limit(num).exec((err,results)=>{
          reslove && reslove(results)
      })
    })
  },
  getFlowTypePage:function(pagenum,num,type){
    pagenum=pagenum-1<=0?0:pagenum-1;
    return new Promise((reslove,reject)=>{
      flowModel.find({type:type}).skip(pagenum*num).limit(num).exec((err,results)=>{
          reslove && reslove(results)
      })
    })
  },
  getFlowByID:function(id){
    return new Promise((reslove,reject)=>{
      flowModel.find({sid:id},(err,results)=>{
            reslove&& reslove(results)
      })
    }) 
  },
  getFlowByType:function(type){
    return new Promise((reslove,reject)=>{
      flowModel.find({"type":type},(err,results)=>{
            reslove&& reslove(results)
      })
    }) 
  },
  getAll:function(){
    return new Promise((reslove,reject)=>{
      flowModel.find({},(err,results)=>{
            reslove&& reslove(results)
      })
    }) 
  },
  deleteByID:function(id){
    return new Promise((reslove,reject)=>{
      flowModel.deleteOne({sid:id},(err)=>{
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
  }
}
