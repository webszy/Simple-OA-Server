const mongoose=require("mongoose");
//step1: 建立连接
mongoose.connect("mongodb://localhost:27017/oa",{ useNewUrlParser: true });

module.exports =mongoose
