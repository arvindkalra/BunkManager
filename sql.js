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

function getSubjectsnColors(callback){
    var connection = sql.createConnection(dbconfig);
    connection.connect();
    var query = "SELECT subname, color FROM subjects";
    connection.query(query, function (err, result) {
        if(err){throw err}
        connection.end();
        callback(result);
    })
}

function update(obj, callback) {
    var attend = parseInt(obj.attended);
    var bunk = parseInt(obj.bunked);
    console.log("ATT = " + attend + ", BUNK = " + bunk);
    var name = obj.subject;
    var total = attend + bunk;
    var percent = (attend / total) * 100;
    percent = Math.round(percent * 100)/100;
    getSafe(total, attend, function (safe) {
    var connection = sql.createConnection(dbconfig);
    connection.connect();
    var query1 = "SELECT * FROM subjects WHERE subname='"+name+"'";
    connection.query(query1, function (err, result) {
        if(err){throw err}
        var oattend = result[0].attended;
        var obunk = result[0].bunked;
        var ototal = result[0].total;
        var query2 = "SELECT * FROM subjects WHERE subname = 'TOTAL'";
        connection.query(query2, function (err1, ans) {
            if(err1){throw err1}
            nbunked = ans[0].bunked - obunk + bunk;
            nattended = ans[0].attended - oattend + attend;
            ntotal = ans[0].total - ototal + total;
            var tpercent = (nattended / ntotal) * 100;
            tpercent = Math.round(tpercent * 100)/100;
            var query3 = "UPDATE subjects SET attended=" + nattended + ",bunked=" + nbunked + ",total=" + ntotal + ",percent=" + tpercent + " WHERE subname='TOTAL'";
            connection.query(query3, function (err2, res) {
                if(err2){throw err2}
                var query = "UPDATE subjects SET attended="+attend+", bunked="+bunk+", total="+total+", percent="+percent+", safe="+safe+" WHERE subname='"+name+"'";
                connection.query(query, function (result) {
                    connection.end();
                    var rv = {
                        safe : safe,
                        percentage : percent,
                        tpercent : tpercent
                    };
                    callback(rv);
                });
            })
        })
    });
});
}

function forBox(obj, callback) {
    var connection = sql.createConnection(dbconfig);
    connection.connect();
    var sbjtbg = obj.subject;
    var query = "SELECT * FROM subjects WHERE subname='"+sbjtbg+"'";
    connection.query(query, function (err, result) {
        if(err){throw err}
        connection.end();
        var rv = {
            attend : result[0].attended,
            bunk   : result[0].bunked
        };
        callback(rv);
    })
}

function removeSubject(obj, callback) {
    var rv = 0;
    var connection = sql.createConnection(dbconfig);
    connection.connect();
    var sbjtbr = obj.subject;
    var query1 = "SELECT * FROM subjects WHERE subname='"+sbjtbr+"'";
    connection.query(query1, function (err, result) {
       var res = result[0];
       var oldtot = res.total;
       var oldbunk = res.bunked;
       var oldatten = res.attended;
       var query4 = "SELECT * FROM subjects WHERE subname='TOTAL'";
       connection.query(query4, function (err, result2) {
          var res2 = result2[0];
          var attend = res2.attended - oldatten;
          var bunk = res2.bunked - oldbunk;
          var total = res2.total - oldtot;
          var percent = (attend/ total) * 100;
          percent = Math.round(percent * 100)/100;
          var query3 = "UPDATE subjects SET attended="+attend+", bunked="+bunk+", total="+total+", percent="+percent+" WHERE subname='TOTAL'";
          connection.query(query3,function () {
              rv = {
                  tpercent : percent
              };
              var query2 = "DELETE FROM subjects WHERE subname='"+sbjtbr+"'";
              connection.query(query2, function () {
                  callback(rv);
              });
              connection.end();
          })
       });
    });
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
    percent = Math.round(percent * 100) / 100;
    var color = obj.color;
    getSafe(total, attended, function (safe) {
        var connection = sql.createConnection(dbconfig);
        connection.connect();
        console.log("SQL Connected");
        var query = "INSERT INTO subjects (subname, attended, bunked, total, percent, safe, color) VALUES('" + subjectname + "', " + attended + ", " + bunked + ", " + total + ", " + percent + ", " + safe + ", '" + color + "')";
        connection.query(query, function (error, result) {
            var rv = {
                safe: safe,
                percentage: percent
            };
            var query4 = "SELECT * FROM subjects WHERE subname='TOTAL'";
            connection.query(query4, function (err, result2) {
                var res2 = result2[0];
                var attend = res2.attended + attended;
                var bunk = res2.bunked + bunked;
                var total = attend + bunk;
                var tpercent = (attend / total) * 100;
                tpercent = Math.round(tpercent * 100) / 100;
                rv.tpercent = tpercent;
                var query3 = "UPDATE subjects SET attended=" + attend + ",bunked=" + bunk + ",total=" + total + ",percent=" + tpercent + " WHERE subname='TOTAL'";
                connection.query(query3, function (err) {
                    if(err){throw err}
                    connection.end();
                    callback(rv);
                });

            });
        });
    });
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
    update : update,
    forBox : forBox,
    addSubject : addSubject,
    initialize : initialize,
    removeSubject : removeSubject,
    getSnC :getSubjectsnColors
};