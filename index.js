const express = require('express');
const path = require('path');
const app = express();

app.use('/node_modules', express.static(path.join(__dirname, '/node_modules'))); //jquery 사용
app.use(express.static(__dirname+'/')); //css, js 등 외부 파일 사용

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log('Listening at 8080');
});