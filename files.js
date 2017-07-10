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

module.exports = {
    read : readFile,
    write: writeFile,
    init : init
}