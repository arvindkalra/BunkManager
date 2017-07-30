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
    $.post('/signup', obj, function (result) {
        if(result){
            $(".upformo").html('<div class="upform">'+
                '<input type="text" class="form-control" id="firstname" placeholder="First Name" name="fn">'+
                '<input type="text" class="form-control" id="lastname" placeholder="Last Name" name="sn">'+
                '<input type="email" class="form-control" id="exampleInputEmail2" name="email" aria-describedby="emailHelp" placeholder="Enter email">'+
                '<input type="password" class="form-control" id="exampleInputPassword2" name="password" placeholder="Password">'+
                '<button type="submit" class="btn btn-success" id="submitup">Sign Up </button>'+
            '</div>' +
                '<div class="alert alert-success">'+
                '<strong>Please Log In to START!!</strong>'+
                '</div>');
        }else{
            $(".upformo").append('<div class="alert alert-danger">'+
                '<strong>E-Mail Already in Use!! <br>Try With a new E-Mail...</strong>'+
                '</div>');
        }
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
   $.post('/login', obj, function (result) {
        if(result){
            window.location.replace('mainpage.html');
        }else{
        $(".informo").append('<div class="alert alert-danger">'+
                '<strong>Username Or Password is WRONG!!</strong>'+
                '</div>');
        }
       $('#exampleInputEmail1').val("");
       $('#exampleInputPassword1').val("");
   })
});