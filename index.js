const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/public')); //css, js 등 외부 파일 사용

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/login', function(req,res) {
    res.sendFile(path.join(__dirname, 'pages', '/login.html'));
});
app.get('/register', function(req,res) {
    res.sendFile(path.join(__dirname, 'pages', '/register.html'));
});

app.listen(8080, function() {
    console.log('Listening at 8080');
});

//css 적용이 안됨 수정 필요