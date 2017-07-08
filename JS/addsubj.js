/**
 * Created by arvind on 8/7/17.
 */
$(function () {
    var currday = 1;

    $('#monbtn').click(function () {
        currday = 1;
        addsubj();
    });

    $('#tuebtn').click(function () {
        currday = 2;
        addsubj();
    });

    $('#wedbtn').click(function () {
        currday = 3;
        addsubj();
    });

    $('#thubtn').click(function () {
        currday = 4;
        addsubj();
    });

    $('#fribtn').click(function () {
        currday = 5;
        addsubj();
    });

    function addsubj() {
        $('#addbtn').click(function () {
            var name = $('#subjectname').val();
            $('#subjectname').val("");
            if (name.length == 0) {
                return;
            }
            var nameasli = name.toUpperCase();
            var from = $('#from').val();
            $('#from').val("");
            var to = $('#to').val();
            $('#to').val("");
            var color = $('#colorinput').val();
            var now = getTodayVals();
            now.divt.append("<div class='subject'>" +
                "<div class = 'classcolor " + nameasli + "color'></div>" +
                "<div class='class' id='" + now.toda + nameasli + "'>" + nameasli + "</div>" +
                "<div id='"+ now.toda + nameasli + "time' class='time'><span class='from'>" + from + "</span>&nbsp;to&nbsp;<span class='to'>" + to + "</span></div>" +
                "</div>")
            var classname = "." + nameasli + "color";
            $(classname).css({"background-color": "" + color + ""});
        })

    }

    function getTodayVals(){
        var rv = {};

        switch (currday){
            case 1:
                rv.toda = "mon";
                rv.divt = $('#mondiv');
                return rv;
            case 2:
                rv.toda = "tue";
                rv.divt = $('#tuediv');
                return rv;
            case 3:
                rv.toda = "wed";
                rv.divt = $('#weddiv');
                return rv;
            case 4:
                rv.toda = "thu";
                rv.divt = $('#thudiv');
                return rv;
            case 5:
                rv.toda = "fri";
                rv.divt = $('#fridiv');
                return rv;
        }
    }
})

