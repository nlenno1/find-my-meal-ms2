// My Supplies Modal Control //

const mySupplesArray = [];

// Add item button functionality //
$(".add-button").click(function() {
    //store input value as variable in the correct format //
    let ingredient = ($("#ingredient-name").val().toLowerCase())
    console.log (ingredient)
    
    // control conditional to avoid adding a empty value //
    if (ingredient.length == 0) {
        // empty value user feedback //
        alert("Please enter an ingredient name");
    } else if (mySupplesArray.includes(ingredient)) {
        // duplicate value user feedback //
        alert(capitalizeFirstLetter(ingredient) + " has already been added");
    } else {
        // user feedback //
        alert(capitalizeFirstLetter(ingredient) + " added to Your Supplies");
        // add user input to supplies array //
        mySupplesArray.push(ingredient);
        // display full array on console //
        console.log(mySupplesArray);
        
        // add new element to designated display area //
        $(".my-supplies-display").append(
            `<div class="ingredient-added" id="${ingredient}-supplies-item"> 
                <p> ${capitalizeFirstLetter(ingredient)} </p>
                <button type="button" class="btn-close item-remove" aria-label="Remove Item"></button>
            </div>`
        );

        // clear input value for next ingredient //
        $("#ingredient-name").val("");
    }
});

// remove item functionality //
$(".item-remove").click(function() {
    item = $(this).parent();
    console.log(item)
    item.remove();
    console.log(mySupplesArray)
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}