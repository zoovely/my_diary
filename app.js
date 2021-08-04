const express = require('express');
const app = express();
const home = require('./routes/index');
const bp = require('body-parser');
const cors = require('cors');
const path = require('path');

//앱 세팅
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '/views'));

//미들웨어
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use('/', home);
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());

module.exports = app;
