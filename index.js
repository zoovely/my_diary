const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bp = require('body-parser');
const app = express();

var regi = [];

//css, js 등 외부 파일 사용
app.use(express.static(__dirname + '/public'));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

//rds 연결
const connection = mysql.createConnection({
    host: "web-db.covasm3yjqnp.us-east-2.rds.amazonaws.com",
    user: "zoovely",
    password: "zico920914",
    port: "3306",
    database: "my_diary"
})

connection.connect(function(err) {
    if(err) {
        throw err;
    } else {
        console.log('connected');
        // connection.query("SELECT pw FROM user WHERE id='zoovely'", function(err,rows,fields) {
        //     if(err) {
        //         throw err;
        //     } else {
        //         console.log(rows);
        //     }
        // });
    }
});

//페이지 이동시 띄울 html 지정
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/login', function(req,res) {
    res.sendFile(path.join(__dirname, 'pages', '/login.html'));
});
app.get('/register', function(req,res) {
    res.sendFile(path.join(__dirname, 'pages', '/register.html'));
});
app.post('/regi_check', function(req,res) {
    if(req.body.id && req.body.pw && req.body.pw_check) {
        if(req.body.pw==req.body.pw_check) {
            regi.push(req.body.id);
            regi.push(req.body.pw);
            var regi_id = req.body.id;
            console.log(regi);
            res.send(`<script>alert('${regi_id}님 환영합니다!');window.location='/';</script>`);
        }
    } else {
        res.send("<script>alert('빈칸을 모두 채워주세요.');window.location='/register';</script>");
    }
});

//8080 연결시
app.listen(8080, function() {
    console.log('Listening at 8080');
});