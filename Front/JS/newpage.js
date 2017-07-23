/**
 * Created by arvind on 23/7/17.
 */

beforeLoad();

function beforeLoad() {
    $.get('/subject/start', function (res) {
        for(var i = 0; i < res.length; i++) {
            var subname = res[i].subjname;
            var safeavail = res[i].safe;
            var percent = res[i].percent;
            var color = res[i].color;
            $('#subjsbox').append("<div class='subject hover-card' id='"+subname+"card'>" +
                "<div class = 'classcolor' style='background-color: " + color + "'></div>" +
                "<div class='lines'>" +
                "<div class='firstline' data-toggle='modal' data-target='.adsub'>" +
                "<div class='subjname' id='" + subname + "'>" + subname + "</div>" +
                "<div id='" + subname + "%age' class='age-'>" + percent + "%</div>" +
                "</div>" +
                "<div class='second'>" +
                "<div class='safeclss'> Safe Bunks Available :&nbsp;&nbsp;<span id = '" + subname + "safebunks'>" + safeavail + "</span></div>" +
                "<a id='a"+subname+"' class='trash' onclick='leave(this)'><span class='glyphicon glyphicon-trash'></span>"+
                "</a>"+
                "</div>" +
                "</div>" +
                "</div>");
        }
    });

}

function leave(name) {
    var sbjnm = $(name).attr('id').substr(1);
    $(name).parent().parent().parent().toggleClass("remove");
    setTimeout(function () {
        $(name).parent().parent().parent().remove();
    }, 998);
    $.post('/subject/remove', {subject : sbjnm})
}
