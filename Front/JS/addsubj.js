/**
 * Created by arvind on 8/7/17.
 */

function start(callback) {
    $.post('/read',{},function (result) {
        if(result === false){
            window.location.replace('index.html');
        }else{
        callback(result);
        }
    })
}

start(function (obj) {
    for(var i = 0; i < obj.length; i++){
        var now = getTodayVals(i);
        for(var j = 0; j < obj[i].length; j++){
            var currobj = obj[i][j];
            var nameasli = currobj.subject;
            var from = currobj.from;
            var to = currobj.to;
            var color = currobj.color;

            now.divt.append("<div class='subject'>" +
                "<div class = 'classcolor " + nameasli + "color'></div>" +
                "<div class='class' id='" + now.toda + nameasli + "'>" + nameasli + "</div>" +
                "<div id='"+ now.toda + nameasli + "time' class='time'><span class='from'>" + from + "</span>&nbsp;to&nbsp;<span class='to'>" + to + "</span></div>" +
                "</div>");
            var classname = "." + nameasli + "color";
            $(classname).css({"background-color": "" + color + ""});
        }
    }
});

$(function () {
    var currday = 0;

    $('#monbtn').click(function () {
        currday = 0;
        callForList()
    });

    $('#tuebtn').click(function () {
        currday = 1;
        callForList()
    });

    $('#wedbtn').click(function () {
        currday = 2;
        callForList()
    });

    $('#thubtn').click(function () {
        currday = 3;
        callForList()
    });

    $('#fribtn').click(function () {
        currday = 4;
        callForList()
    });

    function callForList() {
        $.get('/subject/getSNC', function (response) {
            for(var i = 0; i < response.length; i++){
                var name = response[i].subname;
                if(name === "TOTAL"){
                    continue;
                }
                $('#subjectname').append("<option>"+name+"</option>");
            }
            addsubj(response);
        });
    }

    function addsubj(response) {
        var objtbu = {};
        $('#addbtn').click(function () {
            var name = $('#subjectname').val();
            $('#subjectname').text("");
            var nameasli = name.toUpperCase();
            objtbu.subj = nameasli;
            var from = $('#from').val();
            objtbu.f = from;
            $('#from').val("");
            var to = $('#to').val();
            $('#to').val("");
            objtbu.t = to;
            getColor(name, response, function (color) {
                objtbu.col = color;
                var now = getTodayVals(currday);
                objtbu.day = currday;
                now.divt.append("<div class='subject'>" +
                    "<div class = 'classcolor " + nameasli + "color'></div>" +
                    "<div class='class' id='" + now.toda + nameasli + "'>" + nameasli + "</div>" +
                    "<div id='"+ now.toda + nameasli + "time' class='time'><span class='from'>" + from + "</span>&nbsp;to&nbsp;<span class='to'>" + to + "</span></div>" +
                    "</div>");
                var classname = "." + nameasli + "color";
                $(classname).css({"background-color": "" + color + ""});
                $.post('/write', objtbu, function (result) {
                    console.log("written from client");
                })
            })

        });
    }
});

function getColor(name, res, callback) {
    var rv = "";
    for(var i = 0; i < res.length; i++){
        var cnm = res[i].subname;
        if(cnm === name){
            rv = res[i].color;
            break;
        }
    }
    callback(rv);
}

function getTodayVals(today){
    var rv = {};

    switch (today){
        case 0:
            rv.toda = "mon";
            rv.divt = $('#mondiv');
            return rv;
        case 1:
            rv.toda = "tue";
            rv.divt = $('#tuediv');
            return rv;
        case 2:
            rv.toda = "wed";
            rv.divt = $('#weddiv');
            return rv;
        case 3:
            rv.toda = "thu";
            rv.divt = $('#thudiv');
            return rv;
        case 4:
            rv.toda = "fri";
            rv.divt = $('#fridiv');
            return rv;
    }
};

