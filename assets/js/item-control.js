// My Supplies Modal Control //

const mySupplesArray = [];
const regex = new RegExp(/^[a-zA-Z]+$/);

// Add item button functionality //
$("#supplies-add-button").click(function() {
    //store input value as variable in the correct format //
    let ingredient = ($("#ingredient-name").val().toLowerCase())
    // clear input value for next ingredient and keep focus on input box //
    $("#ingredient-name").val("");
    $("#ingredient-name").focus();
    
    // control conditional to avoid adding a empty value //
    if (ingredient.length == 0) {
        // empty value user feedback //
        alert("Please enter an ingredient name");
    } else if (!regex.test(ingredient)) {
        alert("Please only use letters in the ingredient name");
    } else if (mySupplesArray.includes(ingredient)) {
        // duplicate value user feedback //
        alert(capitalizeFirstLetter(ingredient) + " has already been added");
    } else {
        // add user input to supplies array //
        mySupplesArray.push(ingredient);
        
        // add new element to designated display area //
        $(".my-supplies-display").append(
            `<div class="ingredient-added" id="${ingredient}-supplies-item" value="${ingredient}"> 
                <p> ${capitalizeFirstLetter(ingredient)} </p>
                <button type="button" id="${ingredient}-remove-button" class="btn-close" aria-label="Remove Item"></button>
            </div>`
        );

        // console display to show completion //
        console.log (ingredient + " added")
        console.log(mySupplesArray);

        // remove item functionality //
        $("#" + ingredient + "-remove-button").click(function() {
            item = $(this).parent();
            removeItemFromArray(mySupplesArray, item.attr("value"))
            console.log(item.attr("value") + ' removed from "My Supplies"')
            console.log(mySupplesArray)
            item.remove();
        });
    }
});


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeItemFromArray(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == item) {
            array.splice(item, 1)
        }
    }
}