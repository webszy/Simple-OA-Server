const mongoose=require("./connectMongoDB")
let  Schema = mongoose.Schema

let teamSchema= new Schema({
  sid:{type:Number},
  title:{type:String},
  username:{type:String},
  content:{type:String},
  ptime:{type:String},
  replys:[]
})

let teamModel = mongoose.model('bbs',teamSchema)

module.exports={
  savetoDB:function(data){
    return new Promise((reslove,reject)=>{
      let newteamPaper=new teamModel (data);
      newteamPaper.save((error,res)=>{
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
  getdiscussPage:function(pagenum,num){
    pagenum=pagenum-1<=0?0:pagenum-1;
    return new Promise((reslove,reject)=>{
      teamModel.find({}).skip(pagenum*num).limit(num).exec((err,results)=>{
          reslove && reslove(results)
      })
    })
  },
  getdiscussByID:function(id){
    return new Promise((reslove,reject)=>{
      teamModel.find({sid:id},(err,results)=>{
            reslove&& reslove(results)
      })
    }) 
  },
  getAll:function(){
    return new Promise((reslove,reject)=>{
      teamModel.find({},(err,results)=>{
            reslove&& reslove(results)
      })
    }) 
  },
  deleteByID:function(id){
    return new Promise((reslove,reject)=>{
      teamModel.deleteOne({sid:id},(err)=>{
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
  updateByID:function(id,data){
    return new Promise((reslove,reject)=>{
      teamModel.findOneAndUpdate({sid:id}, {replys:data},(err,results)=>{
        reslove&& reslove({
          code:'000',
          msg:'回复成功'
        })
      })
    }) 
  }
}
