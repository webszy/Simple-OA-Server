const mongoose=require("./connectMongoDB")
let  Schema = mongoose.Schema

let riliSchema= new Schema({
    sid:{type:Number},
    username:{type:String},
    title:{type:String},
    startdate:{type:String},
    enddate:{type:String}
})
let riliModel = mongoose.model('rilis',riliSchema)
module.exports={
  savetoDB:function(data){
    return new Promise((reslove,reject)=>{
      let newrili=new riliModel(data);
      newrili.save((error,res)=>{
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
  getAll:function(){
    return new Promise((reslove,reject)=>{
        riliModel.find({},(err,results)=>{
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
  deleteByID:function(id){
    return new Promise((reslove,reject)=>{
      riliModel.deleteOne({sid:id},(err,result)=>{
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