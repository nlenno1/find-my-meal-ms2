// My Supplies Modal Control 

let mySupplesArray = JSON.parse(localStorage.getItem("mySuppliesIngredientList"));

for (item of mySupplesArray) {
    createIngredientObject (item)
} 


const regex = new RegExp(/^[a-zA-Z]+$/);

// initial modal open focus event 
$("#my-supplies-modal").on('shown', function() {
    alert("modal open")
    $("#ingredient-name").focus();
});

// add button click event 
$("#supplies-add-button").click(function() {
    addItemToDisplay();
});

// enter key event 
$("#ingredient-name").keypress(function(event) {
    let key = event.keyCode;
    if (key == "13") {
        addItemToDisplay ();
    }
});

function createIngredientObject (ingredient) {
    // add new element to designated display area 
    $(".my-supplies-display").append(
        `<div class="ingredient-added" id="${ingredient}-supplies-item" value="${ingredient}"> 
            <p> ${capitalizeFirstLetter(ingredient)} </p>
            <button type="button" id="${ingredient}-remove-button" class="btn-close" aria-label="Remove Item"></button>
        </div>`
    );
    // object animations
    $("#" + ingredient + "-supplies-item").hide();
    $("#" + ingredient + "-supplies-item").slideDown();

    // remove item functionality 
    $("#" + ingredient + "-remove-button").click(function() {
        item = $(this).parent();
        removeItemFromArray(mySupplesArray, item.attr("value"))
        console.log(item.attr("value") + ' removed from "My Supplies"')
        console.log(mySupplesArray)
        saveSuppliesToLocalDrive()
        $("#ingredient-name").focus();
        item.fadeOut(function() {
            item.remove();
        });
    });
};

// Add item button functionality 
function addItemToDisplay () {
    //store input value as variable in the correct format 
    let ingredient = $("#ingredient-name").val().toLowerCase()
    // clear input value for next ingredient and keep focus on input box 
    $("#ingredient-name").val("");
    $("#ingredient-name").focus();
    
    // control conditional to avoid adding a empty value 
    if (ingredient.length == 0) {
        // empty value user feedback 
        alert("Please enter an ingredient name");
    } else if (!regex.test(ingredient)) {
        alert("Please only use letters in the ingredient name");
    } else if (mySupplesArray.includes(ingredient)) {
        // duplicate value user feedback 
        alert(capitalizeFirstLetter(ingredient) + " has already been added");
    } else {
        // add user input to supplies array 
        mySupplesArray.push(ingredient);
        saveSuppliesToLocalDrive();
        // create Ingredient Object
        createIngredientObject (ingredient)
        // show completion of task on log
        console.log(ingredient + ' added to "My Supplies"')
        console.log("My Supplies Array : " + mySupplesArray);
    }
};


function saveSuppliesToLocalDrive() {
    localStorage.setItem("mySuppliesIngredientList", JSON.stringify(mySupplesArray));
}

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