
var _w = require('jquery_wechat_sdk');

// var wechatMgr=_w.WeChart({
//     appId: 'your appid',
//     timestamp: 'your timestamp',
//     nonceStr: 'your nonceStr',
//     signature: 'your signature ',
//     access_token:'your access_token   12323',
//     debug:true
// });

var params={
    appid:'yourappid',
    appsecret:'yoursecret',
    timestamp:'1448938941',
    nonceStr:'k4DIrgjFCvQ2xRRE'
}

var wechatMgr=_w.WeChart({
    api:'/access_token',
    data:params,
    async:false,
    debug:true
});

wechatMgr.InitWeChat(function(result){
    this.appId = params.appid;
    this.timestamp = params.timestamp;
    this.nonceStr = params.nonceStr;
    this.signature = result.signature;
    this.access_token = result.access_token;
});