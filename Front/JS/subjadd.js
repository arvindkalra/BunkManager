/**
 * Created by arvind on 22/7/17.
 */

$('#addbtn').click(function () {
    var subjname = $('#subjectname').val();
    subjname = subjname.toUpperCase();
    var total = parseInt($('#total').val());
    var bunk = parseInt($('#bunk').val());
    var color = $('#colorinput').val();
    var attended = total - bunk;
    var passobj = {
        subj : subjname,
        atten : attended,
        bunk : bunk,
        color : color
    };
    $.post('/subject/new', passobj, function (res) {
        var safeavail = res.safe;
        var percent = res.percentage;
        $('#oper').text(res.tpercent+"%");
        if(res.tpercent < 75){
            $('#oper').css({"color" : "#f44336"});
        }else{
            $('#oper').css({"color" : "#00c853"});
        }
        $('#subjsbox').append("<div class='subject hover-card'>" +
                              "<div class = 'classcolor' style='background-color: "+color+"'></div>"+
                              "<div class='lines'>" +
                              "<div class='firstline' id='x"+subjname+"' onclick='makeBox(this)' data-toggle='modal' data-target='.adsub'>"+
                              "<div class='subjname' id='"+subjname+"'>"+subjname+"</div>" +
                              "<div id='"+subjname+"age' class='age-'>"+percent+"%</div>"+
                              "</div>"+
                              "<div class='second'>"+
                              "<div class='safeclss'> Safe Bunks Available :&nbsp;&nbsp;<span id = '" + subjname + "safebunks'>" + safeavail + "</span></div>" +
                              "<a id='a"+subjname+"' class='trash' onclick='leave(this)'><span class='glyphicon glyphicon-trash'></span>"+
                              "</a>"+
                              "</div>"+
                              "</div>"+
                              "</div>");
        var percele = '#'+subjname+"age";
        if(percent < 75){
            $(percele).css({"color":"#f44336"})
        }
    });
    });

