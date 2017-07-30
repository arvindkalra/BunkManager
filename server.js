/**
 * Created by arvind on 10/7/17.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const fs = require('./files.js');
// const sql = require('./sql');
const sql = require('./mongoConnections');
const passport = require('passport');
const passportLocal = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = passportLocal.Strategy;

sql.connectDb(function () {
    app.listen(4000 || process.env.port, function (err) {
        if(err){
            throw err;
        }
        console.log("Server is Running on Port Number : 4000");
    });

});

app.use(session({secret : "keyboard cat"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/', express.static('Front'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passport.use(new LocalStrategy(function (username, password, done) {
    sql.findUserName(username, function (res) {
        // console.log(res);
        if (res === null) {
            return done(null, false);
        }
        sql.checkPassword(username, password, function (bool, id) {
            if (!bool) {
                return done(null, false);
            } else {
                return done(null, id);
            }
        })
    });
}));

app.post('/login', passport.authenticate('local', { successRedirect: '/done',
        failureRedirect: '/notdone'})
);

passport.serializeUser(function(id, done) {
    console.log(id);
    done(null, id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

app.get('/notdone', function (req, res) {
   console.log("Username Password is wrong");
   res.send(false);
});

app.get('/done', function (req, res) {
    console.log("Logged In... with " + req.user);
    res.send(true);
});

app.get('/logout', function(req, res){
    console.log("Do Logout");
    req.logout();
    res.send(true);
});

app.post('/signup', function (req, res) {
    sql.NewUser(req.body, function (bool) {
        res.send(bool);
    })
});

function checkUser(req, res, next) {
    console.log("Check"+ req.user);
    if(req.user){
        console.log("Allowed");
        next();
    }else{
        console.log("Not Allowed");
        res.send(false);
    }
}

app.use(checkUser);

app.post('/init', function (req,res) {
    fs.init();
    res.send("");
});

app.post('/read',function (req,res) {
    console.log(req.user);
    sql.read(req.user, function (obj) {
        res.send(obj);
    });
});

app.post('/write', function (req, res) {
    var day = req.body.day;
    var subject = req.body.subj;
    var to = req.body.t;
    var from = req.body.f;
    var color = req.body.col;

    sql.read(req.user, function (obj) {
        sql.write(req.user, day,subject,from,to,color,obj);
    });

    res.send("");
});

app.get('/subject/start',  function (req, res) {
    console.log(req.user);
    sql.initialize(req.user, function (result) {
       res.send(result);
    });
});

app.post('/subject/remove', function (req, res) {
    var obj = req.body;
    sql.removeSubject(req.user, obj, function (result) {
        res.send(result);
    });
    sql.rS(req.user, req.body.subject);
});

app.get("/subject/getSNC", function (req, res) {
    sql.getSnC(req.user, function (result) {
        res.send(result);
    })
});

app.post('/subject/forbox', function (req, res) {
    var obj = req.body;
    sql.forBox(req.user, obj, function (response) {
        res.send(response);
    });
});

app.post('/subject/update', function (req, res) {
    var obj = req.body;
    sql.update(req.user, obj, function (result) {
        res.send(result);
    });
});

app.post('/subject/new', function (req, res) {
    var obj = req.body;
    console.log("Striked");
    sql.addSubject(req.user, obj, function (result) {
       res.send(result);
    });
});

