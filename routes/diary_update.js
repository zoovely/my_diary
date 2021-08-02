const db = require('./db_connection');

const diary_update = function (req, res) {
    const query_data = ['%'+req.body.data+'%', id];
    db.query("SELECT date, emotion FROM diary WHERE date LIKE ? AND id=?", query_data, function(err, row, fields) {
        if(row.length == 0) {
            res.send('0');
        } else {
            var result = [];
            for(i in row) {
                result.push({date:row[i].date, emotion:row[i].emotion});
            }
            res.send(result);
            console.log(result);
        }
    });
}

module.exports = diary_update;