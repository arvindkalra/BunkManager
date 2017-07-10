/**
 * Created by arvind on 10/7/17.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('./files.js');

app.use('/', express.static('Front'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(4000 || process.env.port, function (err) {
    if(err){
        throw err;
    }
    console.log("Server is Running on Port Number : 4000");
});

app.post('/init', function (req,res) {
    fs.init();
    res.send("");
});

app.post('/read',function (req,res) {
    fs.read(function (obj) {
        res.send(obj);
    })
});

app.post('/write', function (req, res) {
    var day = req.body.day;
    var subject = req.body.subj;
    var to = req.body.t;
    var from = req.body.f;
    var color = req.body.col;

    fs.read(function (obj) {
        fs.write(day,subject,from,to,color,obj);
    })

    res.send("");
});

