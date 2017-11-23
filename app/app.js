var express=require('express');
var path=require('path');
var ejs=require('ejs');
var logger = require('morgan');
var seqqueue = require('seq-queue');
var queue = seqqueue.createQueue(1000);

var app=express();

app.engine('.html',ejs.__express);
app.set('view engine','html');

app.set('views',path.join(__dirname,'../views'));

var access_token=require('./access_token/webtoken');
var getticket=require('./ticket/ticket');
var getsign=require('./signature/sign');
var bodyParser = require('body-parser');
var getredpack=require('./redpack/redpack');
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));

app.get('/',function(req,res){
     res.render('index.html');  
});

app.post('/access_token',function(req,res){
    var appId=req.body.appid;
    var appSecret=req.body.appsecret;
    var url=req.body.url;
    var noncestr=req.body.noncestr;
    var timestamp=req.body.timestamp;
    access_token(appId,appSecret)
    .then(function (data) {
      return JSON.parse(data);
    })
    .then(function (data) {
      var access_token=data['access_token'];
      getticket(appId,access_token).then(t => {
          var sign=getsign(t.ticket,url,noncestr,timestamp);
          res.send({access_token: access_token,signature:sign})
      })
    });
})


app.post('/redpack',function(req,res){

    queue.push(function(task){
      var openid=req.body.openid;
      var action=req.body.action;
      var lid=req.body.lid;
      var mobile=req.body.mobile;
      getredpack(openid,action,lid,mobile).then(function(data){
          task.done();
          res.send(data);
      })
    },function() {
      console.log('task timeout');
    },3000);
});


module.exports=app;

