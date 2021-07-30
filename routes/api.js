const request = require('request');
var result;
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
if(String(month).length == 1) {
    month = '0'+ String(month);
}

const api = function(req, res) {
    var url = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=";
    url += year;
    url += "&solMonth=";
    url += month;
    url += "&ServiceKey=KPaCtj8yNtsrUIcnM5YIgcc3MbZV29njPsLjAhlEfbeWKVR1GR4Y%2BkTt9Rze846qu0Du5fR869fB4RW4SdQtog%3D%3D";

    request(url, function (err, res, body) {
        if(err) {
            throw err;
        }
        result = body;
    });

    res.send(result);
}

module.exports = api;