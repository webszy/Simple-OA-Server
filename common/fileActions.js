const mongoose=require("./connectMongoDB")
let  Schema = mongoose.Schema

let fileSchema= new Schema({
  sid:{type:Number},
  title:{type:String},
  username:{type:String},
  content:{type:String}
})
let fileModel = mongoose.model('files',fileSchema)
module.exports={
  savetoDB:function(data){
    return new Promise((reslove,reject)=>{
      let newFile=new fileModel (data);
      newFile.save((error,res)=>{
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
  getFilePage:function(pagenum,num){
    pagenum=pagenum-1<=0?0:pagenum-1;
    return new Promise((reslove,reject)=>{
      fileModel.find({}).skip(pagenum*num).limit(num).exec((err,results)=>{
          reslove && reslove(results)
      })
    })
  },
  getFileByID:function(id){
    return new Promise((reslove,reject)=>{
      fileModel.find({sid:id},(err,results)=>{
            reslove&& reslove(results)
      })
    }) 
  },
  getAll:function(){
    return new Promise((reslove,reject)=>{
      fileModel.find({},(err,results)=>{
            reslove&& reslove(results)
      })
    }) 
  },
  deleteByID:function(id){
    return new Promise((reslove,reject)=>{
      fileModel.deleteOne({sid:id},(err,result)=>{
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
