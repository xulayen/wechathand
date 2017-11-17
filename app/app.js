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


app.get('/access_token',function(req,res){
    var appId=req.query.appid;
    var appSecret=req.query.appsecret;
    var url=req.query.url;
    access_token(appId,appSecret)
    .then(function (data) {
      return JSON.parse(data);
    })
    .then(function (data) {
      getticket(appId,data['access_token']).then(t => {
          console.log(t);
          var sign=getsign(data['access_token'],url);
          res.render('index.html', {access: data, t: JSON.parse(t),sign:sign});  
          
      })
    });
})
module.exports=app;

