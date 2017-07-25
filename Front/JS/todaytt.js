/**
 * Created by arvind on 25/7/17.
 */

function getToday() {
    var dt = new Date();
    var today = dt.getDay();
    return today-1;
}

function callforValues(callback){
    $.post('/read', {}, function (result) {
        callback(result);
    })
}

callforValues(function (response) {
    var tba = $('.subjects');
    var i = getToday();
    var currarr = response[i];
    for(var j = 0; j < currarr.length; j++){
        var lsub = currarr[j];
        var nameasli = lsub.subject;
        var from = lsub.from;
        var to = lsub.to;
        var color = lsub.color;
        tba.append("<div class='subjectT'>" +
            "<div class = 'classcolorT " + nameasli + "color'></div>" +
            "<div class='classT' id='" + nameasli + "'>" + nameasli + "</div>" +
            "<div id='" + nameasli + "time' class='timeT'><span class='from'>" + from + "</span>&nbsp;to&nbsp;<span class='to'>" + to + "</span></div>" +
            "</div>")
        var classname = "." + nameasli + "color";
        $(classname).css({"background-color": "" + color + ""});

    }
});
