const db = require('./db_connection');
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var today = String(year) + String(month) + String(day);
var index;

const new_check = function(req, res) {
    var emotion = req.body.emotion;
    var sentence = req.body.sentence;
    var happy = req.body.happy;
    var hard = req.body.hard;
    var tomorrow = req.body.tomorrow;

    db.query("SELECT * FROM diary", function(err, row) {
        if(row) {
            index = row.length+1;
        } //row 개수가 undefined로 나올때 수정
    });

    var insert = [index, 'zoovely', today, emotion, sentence, happy, hard, tomorrow];
    console.log(insert);

    if(emotion && sentence && happy && hard && tomorrow) {
        var insert = [index, 'zoovely', today, emotion, sentence, happy, hard, tomorrow];
        db.query("SELECT * FROM diary WHERE date=?", today, function(err, row, fields) {
            if(row) {
                res.send("<script>alert('오늘은 일기를 이미 작성했어요.');window.location='/diary';</script>");
            } else {
                db.query("INSERT INTO diary (number, id, date, emotion, sentence, happy, hard, tomorrow) VALUES (?,?,?,?,?,?,?,?)", insert, function(err, row, fields) {
                    if(err) {
                        throw err;
                    }
                });
                res.send("<script>alert('저장 완료!');window.location='/diary';</script>")
            }
        });
    }
    else {
        res.send("<script>alert('빈칸을 모두 채워주세요');window.location='/new_diary';</script>");
    }
}

module.exports = new_check;