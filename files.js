/**
 * Created by arvind on 10/7/17.
 */

var fs = require('fs');

function writeFile(day,subj,from,to,col,obj) {
        var otba = {
            "subject" : subj,
            "from" : from,
            "to" : to,
            "color":col
        }

        console.log(otba);

        obj[day].push(otba);

        console.log(obj);
    fs.writeFile('tt.json',JSON.stringify(obj),function(req,res) {
        console.log("File is written");
    });

}

function init() {
    var obj = [[],[],[],[],[]];
    fs.writeFile('tt.json',JSON.stringify(obj),function(req,res) {
        console.log("File initialised");
    });
}

function readFile(callBack) {

    fs.readFile('tt.json',function (err, data) {
        if(err){
            throw err;
        }
        if(data != undefined){
            callBack(JSON.parse(data));
        }

    })

}

function removeSubjects(name) {
    fs.readFile('tt.json', function (err, data) {
        if(err){throw err}
        if(data != undefined){
            var obj = JSON.parse(data);
            for(var i = 0; i < obj.length; i++){
                for(var j = 0; j < obj[i].length; j++){
                    if(obj[i][j].subject === name){
                        obj[i].splice(j,1);
                    }
                }
            }
            fs.writeFile('tt.json',JSON.stringify(obj),function(req,res) {
                console.log("File is written");
            });
        }
    });
}

module.exports = {
    removeSubject : removeSubjects,
    read : readFile,
    write: writeFile,
    init : init
}