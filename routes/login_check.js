const db = require('./db_connection');

const login_check = function(req, res) {
    var id = req.body.id;
    var pw = req.body.pw;
    if(id && pw) {
        db.query("SELECT pw FROM user WHERE id=?", id, function(err, row, fields) {
            if(err) {
                throw err;
            }
            else if(row[0] == null) {
                res.send("<script>alert('존재하지 않는 계정명입니다.');window.location='/login';</script>");
            }
            else if(row[0].pw == pw) {
                res.send(`<script>alert('${id}님 오늘도 반갑습니다!');window.location='/';</script>`);
            } //일기 페이지로 이동 수정 필요
            else {
                res.send("<script>alert('비밀번호가 맞지 않습니다.');window.location='/login';</script>");
            } 
        });
    } else {
        res.send("<script>alert('빈칸을 모두 채워주세요.');window.location='/login';</script>");
    }
}

module.exports = login_check;