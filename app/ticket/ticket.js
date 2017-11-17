
'use strict';
const request = require('request');
const qs = require('querystring');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

function get_ticket(appId,access_token){
    let reqUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?';
    let params = {
        access_token: access_token,
        type: 'jsapi'
    };

    let options = {
        method: 'get',
        url: reqUrl+qs.stringify(params)
    };
    console.log('getticket:'+options.url);
    var ticket=myCache.get('jsapi_ticket'+appId);
    if(ticket===undefined){
        return new Promise((resolve, reject) => {
            request(options, function (err, res, body) {
                if (res) {
                    console.log('get ticket info!')
                    console.log(body);
                    myCache.set( "jsapi_ticket"+appId, body, 7200);
                    resolve(body);
                } else {
                    reject(err);
                }
            });
        })
    }else{
        return new Promise((resolve, reject)=>{
            console.log('ticket is not expire!');
            console.log(ticket);
            resolve(ticket);
        })
    }
};
module.exports=get_ticket;
