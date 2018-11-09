module.exports={
   Trim:function(str){ //去除字符串前后空格
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
    },
  fillupNum:function(n){
    if(this.Trim(n).length==1){
      return '00'+n
    }else if(this.Trim(n).length==2){
      return '0'+n
    }else{
      return n
    }
  },
  getNowTime:function(){
    let now=new Date()
    let month=parseInt(now.getMonth())+1<=9?"0"+now.getMonth():now.getMonth();
    let day=parseInt(now.getDate())<=9?"0"+now.getDate():now.getDate();
    let minute=parseInt(now.getMinutes())<=9?"0"+now.getMinutes():now.getMinutes();
    let second=parseInt(now.getSeconds())<=9?"0"+now.getSeconds():now.getSeconds();

    return `${now.getFullYear()}年${parseInt(month)+1}月`+
    `${day}日 ${now.getHours()}:${minute}:${second}`
  },
  getms:function(){
    let now=new Date()
    return now.getTime()
  },
  getNextid:function(d){
    if(d[0]==undefined){
      return 1
    }else{
      let maxid=parseInt(d[0].sid)
      for(let v of d){
        if(v.sid>maxid){
          maxid=v.sid
        }
      }
      return parseInt(++maxid)
    }
  },
  userLoginTimeGap:20
}