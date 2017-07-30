/**
 * Created by arvind on 30/7/17.
 */

$('#submitup').click(function () {
    var obj = {
        fn : $('#firstname').val(),
        sn : $('#lastname').val(),
        email : $('#exampleInputEmail2').val(),
        password : $('#exampleInputPassword2').val()
    };
    $.post('/signup', obj, function () {
        //nothing todo
    });
    $('#firstname').val("");
    $('#lastname').val("");
    $('#exampleInputEmail2').val("");
    $('#exampleInputPassword2').val("");
});

$('#submitin').click(function () {
   var obj = {
       username : $('#exampleInputEmail1').val(),
       password : $('#exampleInputPassword1').val()
   } ;
   console.log("hii");
   $.post('/login', obj, function (result) {
        // console.log(result);
   })
});