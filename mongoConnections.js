/**
 * Created by arvind on 30/7/17.
 */

var db = require('mongodb').MongoClient;

var url = "mongodb://arvind:akalra@ds127443.mlab.com:27443/bunkmanager"

var obj = "";
var subsinital = [{name : "TOTAL", attended : 0, bunked: 0, total:0, percent:0}];
var ttinitial = [[],[],[],[],[]];

function connectDB(run_server) {
    db.connect(url, function (err, database) {
        if(err){throw err}
        console.log("Connected to Mlabs...");
        obj = database;
        // obj.collection('userpass').insertOne({"task":1});
        run_server();
    })
}

function createNewCollection(object, callback) {
    var fn = object.fn;
    var sn = object.sn;
    var email = object.email;
    var password = object.password;
    obj.collection('userpass').findOne({username : email}, function (err, result) {
       if(err){throw err}
       if(result === null){
           obj.collection('userpass').insertOne({fn : fn, sn : sn, username : email, password : password}, function () {
               obj.collection('userpass').findOne({username : email}, function (err, result) {
                   if(err){throw err}
                   var id = result._id;
                   var newid = id.toString();
                   console.log(newid);
                   obj.collection("datas").insertOne({id : newid, subjects:subsinital, timetable:ttinitial});
                   callback(true);
               });
           });
       }else{
           callback(false)
       }
    });

}

function findUserName(username, callback) {
    obj.collection("userpass").findOne({username: username}, function (err, result) {
        if(err){throw err}
        callback(result);
    })
}

function checkPassword(username, password, callback) {
    obj.collection("userpass").findOne({username : username}, function (err, result) {
        if(err){throw err}
        if(result.password === password){
            callback(true, result._id);
        }else{
            callback(false);
        }
    })
}

function addNewSubject(id, sbjobj, callback) {
    var rv = {};
    var subjectname = sbjobj.subj;
    var attended = parseInt(sbjobj.atten);
    var bunked = parseInt(sbjobj.bunk);
    var total = attended + bunked;
    var percent = (attended / total) * 100;
    percent = Math.round(percent * 100) / 100;
    rv.percentage = percent;
    var color = sbjobj.color;
    getSafe(total, attended, function (safe) {
        rv.safe = safe;
       var objtba =  {name : subjectname, attended : attended, bunked: bunked, total: total, percent: percent, color: color, safe: safe};
       // obj.collection("datas").updateOne({id: id}, {$push : {subjects : objtba}});
       obj.collection("datas").findOne({id : id}, function (err , result) {
           console.log("Found");
           if(err){throw err}
           var ttcopy = result.timetable;
           var arrcopy = result.subjects;
           arrcopy[0].attended += attended;
           arrcopy[0].bunked +=  bunked;
           arrcopy[0].total += total;
           var perc = (arrcopy[0].attended / arrcopy[0].total) * 100;
           perc = Math.round(perc * 100) / 100;
           rv.tpercent = perc;
           arrcopy[0].percent = perc;
           arrcopy.push(objtba);
           obj.collection("datas").updateOne({id : id}, {id: id, subjects : arrcopy, timetable: ttcopy});
           callback(rv);
       })
    });
}

function findsbjobj(arr, name, callback) {
    var rv = -1;
    for(var i = 0; i < arr.length; i++){
        if(arr[i].name === name){
            rv = i;
        }
    }
    callback(rv);
}

function getAllSubjects(id, callback) {
    console.log(id+"******");
    obj.collection("datas").findOne({id : id}, function (err , result) {
        console.log(result);
        if (err) {
            throw err
        }
        var rv = [];
        var arrcopy = result.subjects;
        for(var i = 0; i < arrcopy.length; i++){
            var objtba = {
                subjname : arrcopy[i].name,
                safe : arrcopy[i].safe,
                percent : arrcopy[i].percent,
                color : arrcopy[i].color
            };
            rv.push(objtba);
        }
        callback(rv);
    });
}

function removeSubject(id, sbj, callback) {
    obj.collection("datas").findOne({id : id}, function (err, result) {
        console.log("Found");
        var rv = {};
        if(err){throw err}
        var arrcopy = result.subjects;
        var name = sbj.subject;
        findsbjobj(arrcopy, name, function (i) {
            var ttcopy = result.timetable;
            arrcopy[0].attended -= arrcopy[i].attended;
            arrcopy[0].bunked -=  arrcopy[i].bunked;
            arrcopy[0].total -= arrcopy[i].total;
            var perc = (arrcopy[0].attended / arrcopy[0].total) * 100;
            perc = Math.round(perc * 100) / 100;
            if(arrcopy[0].attended == 0){
                perc = 0;
            }
            rv.tpercent = perc;
            arrcopy[0].percent = perc;
            arrcopy.splice(i, 1);
            obj.collection("datas").updateOne({id : id}, {id : id, subjects : arrcopy, timetable: ttcopy});
            callback(rv);
        });
    })
}

function update(id, sobj, callback) {
    var rv = {};
    var attend = parseInt(sobj.attended);
    var bunk = parseInt(sobj.bunked);
    var name = sobj.subject;
    var total = attend + bunk;
    getSafe(total, attend, function (safe) {
        obj.collection("datas").findOne({id : id}, function (err, result) {
            if(err){throw err}
            var arrcopy = result.subjects;
            findsbjobj(arrcopy, name, function (i) {
                var ttcopy = result.timetable;
                console.log(i);
                arrcopy[0].attended -= arrcopy[i].attended;
                arrcopy[0].bunked -=  arrcopy[i].bunked;
                arrcopy[0].total -= arrcopy[i].total;
                arrcopy[0].attended += attend;
                arrcopy[0].bunked +=  bunk;
                arrcopy[0].total += total;
                var perc = (arrcopy[0].attended / arrcopy[0].total) * 100;
                perc = Math.round(perc * 100) / 100;
                if(arrcopy[0].attended === 0){
                    perc = 0;
                }
                rv.tpercent = perc;
                arrcopy[0].percent = perc;
                arrcopy[i].attended = attend;
                arrcopy[i].bunked =  bunk;
                arrcopy[i].total = total;
                arrcopy[i].safe = safe;
                rv.safe = safe;
                var perc2 = (arrcopy[i].attended / arrcopy[i].total) * 100;
                perc2 = Math.round(perc2 * 100) / 100;
                arrcopy[i].percent = perc2;
                rv.percentage = perc2;
                obj.collection("datas").updateOne({id : id}, {id : id, subjects : arrcopy, timetable: ttcopy});
                callback(rv);
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

function forBox(id, sobj, callback) {
    var name = sobj.subject;
    obj.collection("datas").findOne({id : id}, function (err , result) {
        if (err) {
            throw err
        }
        var arrcopy = result.subjects;
        findsbjobj(arrcopy, name, function (i) {
            var rv = {
                attend : arrcopy[i].attended,
                bunk   : arrcopy[i].bunked
            };
            callback(rv);
        });
    });
}

function getSubjectsnColors(id ,callback) {
    obj.collection("datas").findOne({id : id}, function (err , result) {
        if (err) {
            throw err
        }
        var rv = [];
        var arrcopy = result.subjects;
        for(var i = 0; i < arrcopy.length; i++){
            var objtba = {
                subname : arrcopy[i].name,
                color : arrcopy[i].color
            };
            rv.push(objtba);
        }
        // console.log(rv);
        callback(rv);
    });
}

function writeFile(id, day,subj,from,to,col,sobj) {
    var otba = {
        "subject" : subj,
        "from" : from,
        "to" : to,
        "color":col
    };
    sobj[day].push(otba);
    obj.collection('datas').findOne({id : id}, function (err, result) {
        if(err){throw err}
        var arrcopy = result.subjects;
        obj.collection('datas').updateOne({id : id}, {id : id, subjects : arrcopy, timetable : sobj}, function (err, res) {
            console.log("File Written...");
        });
    });

}

function readFile(id, callback) {
    obj.collection('datas').findOne({id : id}, function (err, result) {
        console.log(result);
        if(err){throw err}
        var tt = result.timetable;
        callback(tt);
    })
}

function removeSubjects(id, name) {
   obj.collection('datas').findOne({id : id}, function (err, result) {
       if(err){throw err}
       var sbjcopy = result.subjects;
       var tt = result.timetable;
       for(var i = 0; i < tt.length; i++){
           for(var j = 0; j < tt[i].length; j++){
               if(tt[i][j].subject === name){
                   tt[i].splice(j,1);
               }
           }
       }
       obj.collection('datas').updateOne({id : id}, {id : id, subjects: sbjcopy, timetable : tt}, function () {
           console.log("File Written...")
       });
   })
}

module.exports = {
    update : update,
    forBox : forBox,
    addSubject : addNewSubject,
    initialize : getAllSubjects,
    removeSubject : removeSubject,
    getSnC :getSubjectsnColors ,
    NewUser : createNewCollection,
    connectDb : connectDB,
    findUserName : findUserName,
    checkPassword : checkPassword,
    write : writeFile,
    read : readFile,
    rS : removeSubjects
};