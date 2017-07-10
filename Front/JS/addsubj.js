/**
 * Created by arvind on 8/7/17.
 */

function start(callback) {
    $.post('/read',{},function (result) {
        callback(result);
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
                "</div>")
            var classname = "." + nameasli + "color";
            $(classname).css({"background-color": "" + color + ""});
        }
    }
})

$(function () {
    var currday = 0;

    $('#monbtn').click(function () {
        currday = 0;
        addsubj();
    });

    $('#tuebtn').click(function () {
        currday = 1;
        addsubj();
    });

    $('#wedbtn').click(function () {
        currday = 2;
        addsubj();
    });

    $('#thubtn').click(function () {
        currday = 3;
        addsubj();
    });

    $('#fribtn').click(function () {
        currday = 4;
        addsubj();
    });

    function addsubj() {
        var objtbu = {};
        $('#addbtn').click(function () {
            var name = $('#subjectname').val();
            $('#subjectname').val("");
            if (name.length == 0) {
                return;
            }
            var nameasli = name.toUpperCase();
            objtbu.subj = nameasli;
            var from = $('#from').val();
            objtbu.f = from;
            $('#from').val("");
            var to = $('#to').val();
            $('#to').val("");
            objtbu.t = to;
            var color = $('#colorinput').val();
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

    }

});

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

