const mongoose=require("./connectMongoDB")
let  Schema = mongoose.Schema
/**{
    page:'',
    read:false,
    write:false,
    delete:false
  }*/
let groupSchema= new Schema({
  sid:{type:Number},
  groupname:{type:String},
  access:[]
})
let groupModel = mongoose.model('groups',groupSchema)
module.exports={
  savetoDB:function(data){
    return new Promise((reslove,reject)=>{
      let newGroup=new groupModel(data);
      newGroup.save((error,res)=>{
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
  getAccess:function(name){
    return new Promise((reslove,reject)=>{
      groupModel.find({groupname:name},(err,results)=>{
        reslove&& reslove(results)
      })
    })
  }
}