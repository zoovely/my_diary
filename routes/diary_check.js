const db = require('./db_connection');

const diary_check = function(req, res) {
    var a = req.body.data;
    console.log(a);
    res.send({result:a});
}

module.exports = diary_check;