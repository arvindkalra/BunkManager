/**
 * Created by arvind on 30/7/17.
 */

$('#logoutbtn').click(function () {
    $.get('/logout', function (result) {
        window.location.replace('index.html');
    });
});