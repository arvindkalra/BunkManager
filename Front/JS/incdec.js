$(document).ready(function(){

    var quantitiy=0;
    $('.quantity-right-plusta').click(function(e){

        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantityta').val());

        // If is not undefined

        $('#quantityta').val(quantity + 1);


        // Increment

    });

    $('.quantity-left-minusta').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantityta').val());

        // If is not undefined

        // Increment
        if(quantity>0){
            $('#quantityta').val(quantity - 1);
        }
    });

});


$(document).ready(function(){

    var quantitiy=0;
    $('.quantity-right-plustb').click(function(e){

        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantitytb').val());

        // If is not undefined

        $('#quantitytb').val(quantity + 1);


        // Increment

    });

    $('.quantity-left-minustb').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantitytb').val());

        // If is not undefined

        // Increment
        if(quantity>0){
            $('#quantitytb').val(quantity - 1);
        }
    });

});