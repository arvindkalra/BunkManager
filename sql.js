/**
 * Created by arvind on 10/7/17.
 */
var sql = require('mysql');

var dbconfig = {
    host : 'localhost',
    user : 'arvindkalra',
    password : 'Arvind97@',
    database : 'Bunks'
};


function addSubject(obj, callback) {
    var subjectname = obj.subj;
    var attended = parseInt(obj.atten);
    var bunked = parseInt(obj.bunk);
    var total = attended + bunked;
    var percent = (attended / total) * 100;
    var color = obj.color;
    getSafe(total, attended, function (safe) {
        var connection = sql.createConnection(dbconfig);

        connection.connect();
        console.log("SQL Connected");
        var query = "INSERT INTO subjects (subname, attended, bunked, total, percent, safe, color) VALUES('"+subjectname+"', "+attended+", "+bunked+", "+total+", "+percent+", "+safe+", '"+color+"')";
        connection.query(query, function (error, result) {
            connection.end();
            callback(safe);
        });
    })
}

function getSafe(tot, atten, cb){
    var i = 0;
    while(true){
        i = i + 1;
        tot = tot + 1;
        var percent = (atten/ tot) * 100;
        if(percent < 75){
            break
        }
    }
    cb(i - 1);
}

module.exports = {
  addSubject : addSubject
};