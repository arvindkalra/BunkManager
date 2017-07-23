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

function removeSubject(obj) {
    var connection = sql.createConnection(dbconfig);
    connection.connect();
    var sbjtbr = obj.subject;
    var query = "DELETE FROM subjects WHERE subname='"+sbjtbr+"'";
    connection.query(query);
    connection.end();
}

function initialize(callback) {
    var connection = sql.createConnection(dbconfig);
    connection.connect();
    console.log("SQL Connected");
    var query = "SELECT * FROM subjects";
    connection.query(query, function (err, result) {
        if(err){
            throw err;
        }
        var rv = [];
        for(var i = 0; i < result.length; i++){
            var objtba = {
                subjname : result[i].subname,
                safe : result[i].safe,
                percent : result[i].percent,
                color : result[i].color
            };
            rv.push(objtba);
        }
        connection.end();
        callback(rv);
    })
}


function addSubject(obj, callback) {
    var subjectname = obj.subj;
    var attended = parseInt(obj.atten);
    var bunked = parseInt(obj.bunk);
    var total = attended + bunked;
    var percent = (attended / total) * 100;
    percent = Math.round(percent * 100)/100;
    var color = obj.color;
    getSafe(total, attended, function (safe) {
        var connection = sql.createConnection(dbconfig);

        connection.connect();
        console.log("SQL Connected");
        var query = "INSERT INTO subjects (subname, attended, bunked, total, percent, safe, color) VALUES('"+subjectname+"', "+attended+", "+bunked+", "+total+", "+percent+", "+safe+", '"+color+"')";
        connection.query(query, function (error, result) {
            connection.end();
            var rv = {
                safe : safe,
                percentage : percent
            };
            callback(rv);
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
  addSubject : addSubject,
  initialize : initialize,
  removeSubject : removeSubject
};