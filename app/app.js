var express=require('express');
var path=require('path');
var ejs=require('ejs');


var app=express();

app.engine('.html',ejs.__express);
app.set('view engine','html');

app.set('views',path.join(__dirname,'../views'));

var access_token=require('./access_token/webtoken');
var getticket=require('./ticket/ticket');
var getsign=require('./signature/sign');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));


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
module.exports=app;

