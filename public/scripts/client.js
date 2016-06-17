$( document ).ready( function(){
  $( '#submit' ).on( 'click', function(){
      console.log("clicked");
      var animalType = $('#animalIn').val();
      // assemble an oject (always for post call)

  var animal = {
    "type": animalType,
    "qty": ""
  }; //end object being sent
    console.log('animal: '+ animal.type);
    //send object to post route via ajax
  $.ajax({
    type: "POST",
    url:'/createnew',
    data: animal
  }); //end ajax


    $.ajax({
      type: 'GET',
      url: '/getlist',
      success: function( data ){
      showAnimals( data );
      } // end success
    }); //end ajax

  function showAnimals( animal_tab ){
    // console.log(animal_tab.type + animal_tab.qty);
    for (i=0; i< animal_tab.length; i++){
    $('#animalIn').val("");
    $('#animalDisplay').append('<p>Animal: '+ animal_tab[i].type +'</p>');
    $('#animalDisplay').append('<p>Quantity: '+animal_tab[i].qty +'</p>');
        }//end for loop
    }//end show animals
  }); // end submit
});//end document ready
