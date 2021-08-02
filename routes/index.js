const express = require("express");
const router = express.Router();
const regi_check = require('./regi_check');
const login_check = require('./login_check');
const diary_check = require('./diary_check');
const api = require('./api');
const new_check = require('./new_check');
const diary_list = require('./diary_list');
const diary_update = require('./diary_update');

router.get('/', function(req, res) {
    res.render("index.html");
});

router.get('/login', function(req,res) {
    res.render("login.html");
});
router.post('/login_check', login_check);

router.get('/register', function(req,res) {
    res.render("register.html");
});
router.post('/regi_check', regi_check);

router.get('/diary', function(req,res) {
    res.render("diary.html");
});
router.post('/diary_list', diary_list);
router.post('/diary_check', diary_check);
router.post('/diary_update', diary_update);

router.get('/popup', function(req,res) {
    res.render("popup.html");
});

router.get('/new_diary', function(req,res) {
    res.render("newdiary.html");
});
router.post('/api', api);
router.post('/new_check', new_check);

module.exports = router;