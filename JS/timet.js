/**
 * Created by arvind on 8/7/17.
 */
$('#mon').click(function () {
    $('#mon').toggleClass("active");
    $('#mondiv').css({'display':'block'});

    $('#tue').removeClass("active");
    $('#tuediv').css({'display':'none'});

    $('#wed').removeClass("active");
    $('#weddiv').css({'display':'none'});

    $('#thu').removeClass("active");
    $('#thudiv').css({'display':'none'});

    $('#fri').removeClass("active");
    $('#fridiv').css({'display':'none'});
});

$('#tue').click(function () {
    $('#tue').toggleClass("active");
    $('#tuediv').css({'display':'block'});

    $('#mon').removeClass("active");
    $('#mondiv').css({'display':'none'});

    $('#wed').removeClass("active");
    $('#weddiv').css({'display':'none'});

    $('#thu').removeClass("active");
    $('#thudiv').css({'display':'none'});

    $('#fri').removeClass("active");
    $('#fridiv').css({'display':'none'});
});

$('#wed').click(function () {
    $('#wed').toggleClass("active");
    $('#weddiv').css({'display':'block'});

    $('#mon').removeClass("active");
    $('#mondiv').css({'display':'none'});

    $('#tue').removeClass("active");
    $('#tuediv').css({'display':'none'});

    $('#thu').removeClass("active");
    $('#thudiv').css({'display':'none'});

    $('#fri').removeClass("active");
    $('#fridiv').css({'display':'none'});
});

$('#thu').click(function () {
    $('#thu').toggleClass("active");
    $('#thudiv').css({'display':'block'});

    $('#mon').removeClass("active");
    $('#mondiv').css({'display':'none'});

    $('#wed').removeClass("active");
    $('#weddiv').css({'display':'none'});

    $('#tue').removeClass("active");
    $('#tuediv').css({'display':'none'});

    $('#fri').removeClass("active");
    $('#fridiv').css({'display':'none'});
});

$('#fri').click(function () {
    $('#fri').toggleClass("active");
    $('#fridiv').css({'display':'block'});

    $('#mon').removeClass("active");
    $('#mondiv').css({'display':'none'});

    $('#wed').removeClass("active");
    $('#weddiv').css({'display':'none'});

    $('#thu').removeClass("active");
    $('#thudiv').css({'display':'none'});

    $('#tue').removeClass("active");
    $('#tuediv').css({'display':'none'});
});