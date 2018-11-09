const mongoose=require("./connectMongoDB")
let  Schema = mongoose.Schema

let riliSchema= new Schema({
  sid:{type:Number},
  begindate:{type:String},
  enddate:{type:String},
  title:{type:String},
  content:{type:String},
  username:{type:String},
  dayarrange:['','','','','','','','','','','','','','','','','','','','','','','','']

})
let riliModel = mongoose.model('rilis',riliSchema)
module.exports={
  savetoDB:function(data){
    return new Promise((reslove,reject)=>{
      let newRili=new riliModel(data);
      newRili.save((error,res)=>{
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
  }
}