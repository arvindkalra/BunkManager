/**
 * Created by arvind on 13/8/17.
 */

var is = true;

$('#mobbtn').click(function () {
    if(is) {
        $(".box").css("display", "none");
        is = false;
    }else{
        setTimeout(function () {
            $(".box").css("display", "block");
            is = true;
        }, 250);
    }
});