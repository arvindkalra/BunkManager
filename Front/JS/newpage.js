/**
 * Created by arvind on 23/7/17.
 */

beforeLoad();

function beforeLoad() {
    $.get('/subject/start', function (res) {
        for(var i = 0; i < res.length; i++) {
            var subname = res[i].subjname;
            if(subname === "TOTAL"){
                $('#oper').text(res[i].percent + "%");
                if(res[i].percent < 75){
                    $('#oper').css({"color" : "#f44336"})
                }else{
                    $('#oper').css({"color" : "#00c853"})
                }
                continue;
            }
            var safeavail = res[i].safe;
            var percent = res[i].percent;
            var color = res[i].color;
            $('#subjsbox').append("<div class='subject hover-card' id='"+subname+"card'>" +
                "<div class = 'classcolor' style='background-color: " + color + "'></div>" +
                "<div class='lines'>" +
                "<div class='firstline' id='x"+subname+"' onclick='makeBox(this)' data-toggle='modal' data-target='.adsub'>" +
                "<div class='subjname' id='" + subname + "'>" + subname + "</div>" +
                "<div id='" + subname + "age' class='age-'>" + percent + "%</div>" +
                "</div>" +
                "<div class='second'>" +
                "<div class='safeclss'> Safe Bunks Available :&nbsp;&nbsp;<span id = '" + subname + "safebunks'>" + safeavail + "</span></div>" +
                "<a id='a"+subname+"' class='trash' onclick='leave(this)'><span class='glyphicon glyphicon-trash'></span>"+
                "</a>"+
                "</div>" +
                "</div>" +
                "</div>");
            var percele = '#'+subname+"age";
            if(percent < 75){
                $(percele).css({"color":"#f44336"})
            }
        }
    });

}

function makeBox(val) {
    var element = $(val);
    var name = element.attr('id').substr(1);
    var saveele = "#"+name+"safebunks";
    var perele = "#"+name+"age";
    $('#quantityta').val("Hold...");
    $('#quantitytb').val("Hold...");
    var x = true;
    $.post('/subject/forbox', {subject : name}, function (res) {
        var oattended = res.attend;
        var obunked = res.bunk;
        $('#quantityta').val(oattended);
        $('#quantitytb').val(obunked);
        $('#save').click(function () {
            var attended = $('#quantityta').val();
            var bunked = $('#quantitytb').val();
            if(x) {
                $.post('/subject/update', {subject: name, attended: attended, bunked: bunked}, function (res) {
                    var saves = res.safe;
                    var percent = res.percentage;
                    var tpercent = res.tpercent;
                    if(tpercent === null){
                        tpercent = 0;
                    }
                    $('#oper').text(tpercent + "%");
                    if (tpercent < 75) {
                        $('#oper').css({"color": "#f44336"})
                    } else {
                        $('#oper').css({"color": "#00c853"})
                    }
                    $(saveele).text(saves);
                    $(perele).text(percent + "%");
                    if (percent < 75) {
                        $(perele).css({"color": "#f44336"})
                    } else {
                        $(perele).css({"color": "#00c853"})
                    }
                    x = false;
                });
            }
        });
    });
}

function leave(name) {
    var sbjnm = $(name).attr('id').substr(1);
    $(name).parent().parent().parent().toggleClass("remove");
    setTimeout(function () {
        $(name).parent().parent().parent().remove();
    }, 998);
    $.post('/subject/remove', {subject : sbjnm}, function (res) {
        var newtpercent = res.tpercent;
        console.log(newtpercent);
        $('#oper').text(newtpercent + "%");
        if(newtpercent < 75){
            $('#oper').css({"color" : "#f44336"})
        }else{
            $('#oper').css({"color" : "#00c853"})
        }
    })
}
