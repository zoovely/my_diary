const db = require('./db_connection');

const new_check = function(req, res) {
    //date 열에 삽입할 오늘 날짜 계산
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(String(month).length==1) {
        month = '0'+String(month);
    }
    if(String(day).length==1) {
        day = '0'+String(day);
    }
    var today = String(year) + '-' + String(month) + '-' + String(day);

    //사용자 입력 내용 받아오기
    var emotion = req.body.emotion;
    var sentence = req.body.sentence;
    var happy = req.body.happy;
    var hard = req.body.hard;
    var tomorrow = req.body.tomorrow;
    var insert = [id, today, emotion, sentence, happy, hard, tomorrow];
    var query = [today, id];
    
    //빈칸을 모두 채워 제출했을 때 데이터 베이스에 내용 삽입 (하루 한번)
    if(emotion && sentence && happy && hard && tomorrow) {
        db.query("SELECT * FROM diary WHERE date=? AND id=?", query, function(err, row, fields) {
            if(row.length != 0) {
                res.send("<script>alert('오늘은 일기를 이미 작성했어요.');window.location='/diary';</script>");
            } else {
                db.query("INSERT INTO diary (id, date, emotion, sentence, happy, hard, tomorrow) VALUES (?,?,?,?,?,?,?)", insert, function(err, row, fields) {
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