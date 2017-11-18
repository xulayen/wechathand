'use strict';
var http=require('http');
var express=require('express');
var path=require('path');
var app=require('./app/app');

app.use(express.static('./public'));

const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3031);

var isDev = process.env.NODE_ENV === 'development';
console.log(process.env.NODE_ENV)
if(isDev){
    var server = http.createServer(app);
    server.listen(PORT, function(){
    console.log('App (dev) is now running on port '+PORT+'!');
    });
}


if(!process.env.NODE_ENV){
      var server = http.createServer(app);
    server.listen(PORT, function(){
    console.log('App (debug) is now running on port '+PORT+'!');
    });  
}