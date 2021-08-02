const db = require('./db_connection');

const diary_list = function (req, res) {
    db.query("SELECT date, emotion FROM diary WHERE id=?", id, function(err, row, fields) {
        if(row.length == 0) {
            res.send('0');
        } else {
            var result = [];
            for(i in row) {
                result.push({date:row[i].date, emotion:row[i].emotion});
            }
            res.send(result);
        }
    });
}

module.exports = diary_list;