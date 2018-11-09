var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser')
var session=require('express-session')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var permissionRouter=require('./routes/permission');
var fileRouter=require('./routes/files');
var flowRouter=require('./routes/flows');
var riliRouter=require('./routes/rili');
var teamRouter=require('./routes/team');

var app = express();
var expressWs =require("express-ws")(app)
var util = require('util')
//WebSocket
app.ws('/', function(ws, req) {
  util.inspect(ws);
  ws.on('message', function(msg) {
    console.log('客户端说：'+msg);
    var aWss = expressWs.getWss('/');
    aWss.clients.forEach((cilent)=>{
      cilent.send(msg);
    })
      
  });
  
})

//跨域设置 
app.all("*",(req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Content-Type", "application/json;charset=utf-8");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1') 
  res.header("Content-Type", "application/json;charset=utf-8");   
  next();
});
//session
app.use(session({  
  resave: false, // don't save session if unmodified  
  saveUninitialized: false, // don't create session until something stored  
  secret: 'web',
  cookie: {maxAge: 60 * 1000 * 20 },//20分钟过期时间
  
}));
app.use(function(req, res, next){
  req.session._garbage = Date();
  req.session.touch();
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/per', permissionRouter);
app.use('/file',fileRouter);
app.use('/flow',flowRouter);
app.use('/rili',riliRouter);
app.use('/team',teamRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3008, () => {
  console.log('App listening on port 3008!');
});
module.exports = app;
