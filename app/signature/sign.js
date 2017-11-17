
'use strict';
const request = require('request');
const sha1 = require('sha1');
function getsignature(ticket,url){

    var s='jsapi_ticket='+ticket+'&noncestr=k5dfu7d9gwh7s6h79j&timestamp=1448938941url='+url;
    return sha1(s);

};
module.exports=getsignature;