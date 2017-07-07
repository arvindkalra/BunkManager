/**
 * Created by arvind on 7/7/17.
 */
$('#inbtn').click(function () {
    $('#inbtn').toggleClass("active");
    $('#upbtn').removeClass("active");
    $('.informo').css({'display':'block'});
    $('.upformo').css({'display':'none'});
});

$('#upbtn').click(function () {
    $('#upbtn').toggleClass("active");
    $('#inbtn').removeClass("active");
    $('.upformo').css({'display':'block'});
    $('.informo').css({'display':'none'});
});
