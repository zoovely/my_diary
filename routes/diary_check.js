const db = require('./db_connection');

const diary_check = function(req, res) {
    var date = req.body.data;
    const query_data = ['%'+date+'%', id];
    db.query("SELECT emotion, sentence, happy, hard, tomorrow FROM diary WHERE date LIKE ? AND id=?", query_data, function(err, row, fields) {
        if(row.length == 0) {
            res.send('0');
        } else {
            var result = [];
            result.push(date);
            for(i in row) {
                result.push({emotion:row[i].emotion, sentence:row[i].sentence, happy:row[i].happy, hard:row[i].hard, tomorrow:row[i].tomorrow});
                res.send(result);
            }
        }
    });
}

module.exports = diary_check;