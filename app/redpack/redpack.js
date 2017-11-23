
'use strict';
const request = require('request');

function get_redpack(openid,action,lid,mobile){
    let reqUrl = 'http://10.20.26.19/dm/gcjxy/server/gcjxy.ashx';
    let params = {
        openid: openid,
        action: action,
        lid: lid,
        mobile:mobile
    };

    let options = {
        method: 'post',
        url: reqUrl,
        formData:params
    };
    console.log('\x1B[32m%s \x1B[0m', 'get_redpack'+options.url);  //cyan  
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (res) {
                console.log('\x1B[32m%s \x1B[0m','get access info!')
                console.log('\x1B[32m%s \x1B[0m',body);
                resolve(body);
            } else {
                console.log('\x1B[31m%s \x1B[0m',err);
                reject(err);
            }
        });
    })

};
module.exports=get_redpack;
