// My Supplies Modal Control 

// defining all global variables 
const regex = new RegExp(/^[a-zA-Z]+$/);
let zeroWasteIngredientsArray = []

// open array saved in local storage and display on console
let mySuppliesArray = JSON.parse(localStorage.getItem("mySuppliesSavedList"));
console.log((mySuppliesArray == undefined || null ? "No instance of My Supplies Array Exists" : "My Supplies Array Exists"))
console.log("My Supplies Array opened from Local Storage : " + (mySuppliesArray == "" ? "No items to load!" : mySuppliesArray));
// avoid error with null value
mySuppliesArray = (mySuppliesArray == null)? []: mySuppliesArray;

// turn item in the array into objects
for (item of mySuppliesArray) {
    createIngredientObject (item, $("#my-supplies-display"));
};


// ADD BUTTON AND ENTER KEY EVENTS
// my supplies input add button 
$("#supplies-add-button").click(function() {
    addItemToDisplay($("#ingredient-name").val().toLowerCase(), "#my-supplies-display", "#ingredient-name", mySuppliesArray, "My Supplies", "mySuppliesArray");
});

// my supplies input enter key event 
$("#ingredient-name").keypress(function(event) {
    let key = event.keyCode;
    if (key == "13") {
        addItemToDisplay ($("#ingredient-name").val().toLowerCase(), "#my-supplies-display", "#ingredient-name", mySuppliesArray, "My Supplies", "mySuppliesArray");
    }
});

// zero-waste input add button 
$("#zero-waste-add-button").click(function() {
    addItemToDisplay($("#zero-waste-ingredient-name").val().toLowerCase(), "#zero-waste-ingredients-display", "#zero-waste-ingredient-name", zeroWasteIngredientsArray, "Zero-Waste Ingredients", "zeroWasteIngredientsArray");
});

// zero-waste input enter key event 
$("#zero-waste-ingredient-name").keypress(function(event) {
    let key = event.keyCode;
    if (key == "13") {
        addItemToDisplay ($("#zero-waste-ingredient-name").val().toLowerCase(), "#zero-waste-ingredients-display", "#zero-waste-ingredient-name", zeroWasteIngredientsArray, "Zero-Waste Ingredients", "zeroWasteIngredientsArray");
    }
});

// clear My Supplies click event
$("#clear-my-supplies-button").click(function() {
    clearLocalStorge();
});

// Add item functionality 
function addItemToDisplay (ingredient, targetArea, inputArea, arrayToAction, arrayName, compArrayName) {
    // clear input value for next ingredient and keep focus on input box 
    focusAndClear(inputArea);
    
    // control conditional to avoid adding a empty value 
    if (ingredient.length == 0) {
        // empty value user feedback 
        alert("Please enter an ingredient name");
    } else if (!regex.test(ingredient)) {
        focusAndClear(inputArea);
        alert("Please only use letters in the ingredient name");
    } else if (arrayToAction.includes(ingredient)) {
        // duplicate value user feedback 
        focusAndClear(inputArea);
        alert(capitalizeFirstLetter(ingredient) + " has already been added to " + arrayName);
    } else {
        // add user input to supplies array 
        arrayToAction.push(ingredient);
        if (arrayToAction == mySuppliesArray) {
            saveSuppliesToLocalDrive();
        } 
        // create Ingredient Object
        createIngredientObject (ingredient, targetArea, arrayName, compArrayName)
        // remove item functionality 
        removeObjectMethod(ingredient, targetArea, inputArea, arrayToAction, arrayName, compArrayName)
        // show completion of task on log
        console.log(ingredient + ' added to ' + arrayName)
        console.log(arrayName + " : " + arrayToAction);
    }
};

function createIngredientObject (ingredient, targetArea, arrayName, compArrayName) {
    // add new element to designated display area 
    $(targetArea).append(
        `<div class="ingredient-added" id="${ingredient}-in-${compArrayName}" value="${ingredient}"> 
            <p> ${capitalizeFirstLetter(ingredient)} </p>
            <button type="button" id="${ingredient}-in-${compArrayName}-remove-button" class="btn-close" aria-label="Remove Item"></button>
        </div>`
    );
    // object animations
    $("#" + ingredient + "-supplies-item").hide();
    $("#" + ingredient + "-supplies-item").slideDown();

    
};

function removeObjectMethod(ingredient, targetArea, inputArea, arrayToAction, arrayName, compArrayName) {
    $(`#${ingredient}-in-${compArrayName}-remove-button`).click(function () {
        item = $(this).parent();
        removeItemFromArray(arrayToAction, item.attr("value"));
        console.log(item.attr("value") + ' removed from ' + arrayName);
        console.log(arrayToAction);
        if (arrayToAction == mySuppliesArray) {
            saveSuppliesToLocalDrive();
        } 
        item.fadeOut(function () {
            item.remove();
        });
    });
}

function focusAndClear(targetInput) {
    $(targetInput).val("");
    $(targetInput).focus();
};

function clearLocalStorge() {
    for (name of mySuppliesArray) {
        item = $(`#${name}-in-mySuppliesArray`)
        console.log(name + " removed from mySuppliesArray")
        item.fadeOut(function () {
            item.remove();
        });
    }
    localStorage.setItem("mySuppliesSavedList", JSON.stringify([]));
    console.log("Local Storage array cleared")
}

function saveSuppliesToLocalDrive() {
    localStorage.setItem("mySuppliesSavedList", JSON.stringify(mySuppliesArray));
    console.log("Saved to Local Storage")
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