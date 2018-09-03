$(document).ready(function () {


    window.onload = function() {
        $("#start").on("click", game.start);
        $("#stop").on("click", game.stop);
        $("#reset").on("click", game.reset);
      };

    // This function remove element from an array
    function removeElement(array, element) {
        let index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    
    // -- main program


    let firstNumber = 0;


    $(".number").on("click", function () {
        console.log($(this).val());
        firstNumber += $(this).val();
        $("#first-number").text(firstNumber);
        console.log(firstNumber);
        let result = firstNumber + 2;  // '2 '+ '2' = 22  string addition
        console.log("result=" + result);
    });



});