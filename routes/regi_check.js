const db = require('./db_connection');

const regi_check = function(req, res) {
    var account = [];
    var id = req.body.id;
    var pw = req.body.pw;
    var pw_c = req.body.pw_check;
    if(id && pw && pw_c) {
        if(pw == pw_c) {
            db.query("SELECT id FROM user", function(err, row, fields) {
                if(err) {
                    throw err;
                } else if(row.some(function(row) {return row.id == id;})) {
                    res.send("<script>alert('이미 존재하는 계정명입니다.');window.location='/register';</script>");
                } else {
                    res.send(`<script>alert('${id}님 환영합니다! 로그인 페이지에서 로그인 해주세요.');window.location='/';</script>`);
                    account.push(id);
                    account.push(pw);
        
                    db.query("INSERT INTO user (id, pw) VALUES (?,?)", account, function(err,rows,fields) {
                        if(err) {
                            throw err;
                        }
                    });
                    account = []; //계정 등록 후 삭제
                }
            });
        } else {
            res.send("<script>alert('비밀번호 확인이 일치하지 않습니다.');window.location='/register';</script>");
        }
    } else {
        res.send("<script>alert('빈칸을 모두 채워주세요.');window.location='/register';</script>");
    }
}

module.exports = regi_check;