// My Supplies Modal Control 

// defining all global variables 
const regex = new RegExp(/^[a-zA-Z ]+$/);
let zeroWasteIngredientsArray = []

// open array saved in local storage and display on console
let mySuppliesArray = JSON.parse(localStorage.getItem("mySuppliesSavedList"));
console.log((mySuppliesArray == undefined || null ? "No instance of My Supplies Array Exists" : "My Supplies Array Exists"))
console.log("My Supplies Array opened from Local Storage : " + (mySuppliesArray == "" ? "No items to load!" : mySuppliesArray));
// avoid error with null value
mySuppliesArray = (mySuppliesArray == null)? []: mySuppliesArray;

// turn item in the array into objects
for (item of mySuppliesArray) {
    console.log(item)
    createIngredientObject (item, $("#my-supplies-display"), "My Supplies", "mySuppliesArray");
    removeObjectMethod(item, $("#my-supplies-display"), mySuppliesArray, "My Supplies", "mySuppliesArray");
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

// BIG CUSTOM FUNCTIONS
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
        if (ingredient.includes(" ")) {
        ingredient = ingredient.replace(" ", "-");
        };
         // create Ingredient Object
        createIngredientObject (ingredient, targetArea, arrayName, compArrayName);
        // remove item functionality 
        removeObjectMethod(ingredient, targetArea, arrayToAction, arrayName, compArrayName);
        ingredient = ingredient.replace(" ","-");
        // add user input to supplies array 
        arrayToAction.push(ingredient);
        // save mySupplies to local storage for access later
        if (arrayToAction == mySuppliesArray) {
            saveSuppliesToLocalStorage();
        } 
        // show completion of task on log
        console.log(ingredient + ' added to ' + arrayName)
        console.log(arrayName + " : " + arrayToAction);
    }
};

function createIngredientObject (ingredient, targetArea, arrayName, compArrayName) {
    ingredientScreenName = ingredient.replace("-", " ")
    // add new element to designated display area 
    $(targetArea).append(
        `<div class="ingredient-added" id="${ingredient}-in-${compArrayName}" value="${ingredient}"> 
            <p> ${capitalizeFirstLetter(ingredientScreenName)} </p>
            <button type="button" id="${ingredient}-in-${compArrayName}-remove-button" class="btn-close" aria-label="Remove Item"></button>
        </div>`
    );
    // object animations
    $(`#${ingredient}-in-${compArrayName}`).hide();
    $(`#${ingredient}-in-${compArrayName}`).slideDown();
};

function removeObjectMethod(ingredient, targetArea, arrayToAction, arrayName, compArrayName) {
    $(`#${ingredient}-in-${compArrayName}-remove-button`).click(function () {
        item = $(this).parent();
        removeItemFromArray(arrayToAction, item.attr("value"));
        console.log(item.attr("value") + ' removed from ' + arrayName);
        console.log(arrayName + " : " + arrayToAction);
        if (arrayToAction == mySuppliesArray) {
            saveSuppliesToLocalStorage();
        } 
        item.fadeOut(function () {
            item.remove();
        });
    });
}

// SMALL CUSTOM FUNCTIONS
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

function saveSuppliesToLocalStorage() {
    localStorage.setItem("mySuppliesSavedList", JSON.stringify(mySuppliesArray));
    console.log("Saved to Local Storage")
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeItemFromArray(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == item) {
            array.splice(i, 1);
        };
    };
};