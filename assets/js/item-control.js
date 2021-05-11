// My Supplies Modal Control 

// defining all global variables 
const regex = new RegExp(/^[a-zA-Z ]+$/);
let zeroWasteIngredientsArray = []

// open array saved in local storage and display on console
let mySuppliesArray = JSON.parse(localStorage.getItem("mySuppliesSavedList"));
console.log(mySuppliesArray == undefined || null ? "No instance of My Supplies Array Exists" : "My Supplies Array Exists")
console.log("My Supplies Array opened from Local Storage : " + (mySuppliesArray == "" ? "No items to load!" : mySuppliesArray));
// avoid error with null value
mySuppliesArray = (mySuppliesArray == null)? []: mySuppliesArray;
console.log(mySuppliesArray)

// turn item in the array into objects
for (item of mySuppliesArray) {
    console.log(item)
    createIngredientObject (item, $("#my-supplies-display"), "mySuppliesArray", "mySuppliesArray");
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
    if (mySuppliesArray.length == 0 ) {
        alert("My Supplies List is already empty")
    } else {
        for (name of mySuppliesArray) {
            item = $(`#${name}-in-mySuppliesArray`)
            item.fadeOut(function () {
                item.remove();
            });
        }
    localStorage.setItem("mySuppliesSavedList", JSON.stringify([]));
    console.log("Local Storage array cleared")
    }
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



// API CALLS
// Zero-Waste recipe search call
$("#zero-waste-find-my-meal-button").click(function() {
     // developer feedback
    alert("requested api call")
    // check if user wants to use My Supplies list
    if ($('input[type=checkbox]'). prop('checked')) {
        // try block to remove chance of error if no instance of mySuppliesArray exists in local storage
        try {
            // inline conditional to check if list exists but is empty. If not API is called using list
            mySuppliesArray == "" ? alert("My Supplies list is empty. Please add some ingredients and try again") : makeApiCall (compileApiRequirements (mySuppliesArray, "zero-waste")); 
        } catch (err) {
            // User error feedback with instructions on how to fix 
            alert('You need to add some ingredients to "My Supplies"')
            // developer feedback
            console.log(err.message)
        }
    } else {
        zeroWasteIngredientsArray == "" ? alert("Zero Waste Ingredients List is empty. Please add some ingredients and try again") : makeApiCall (compileApiRequirements (zeroWasteIngredientsArray, "zero-waste"));
    }
});



function compileApiRequirements (ingredientList, searchType) {
    if (searchType === "zero-waste") {
        let baseUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17&ingredients="
        console.log ("baseURL : " + baseUrl)
        let compiledList = `${ingredientList[0]}`
        for (i = 1; i<ingredientList.length; i++) {
            compiledList = `${compiledList},${ingredientList[i]}`
        }
        url = `${baseUrl}${compiledList}&number=4&limitLicense=true&ranking=1&ignorePantry=true`
        console.log (url)
        return(url)
    }
}

function makeApiCall (searchUrl) {
    let settings = {
        "url": searchUrl,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        let searchResults = response
        // clear display space and display header
        $("#result-cards-header").html("Recipies Found:");
        $("#zero-waste-results-cards-display").html("");

        for (i = 0; i < searchResults.length; i++) {
            let missedIngredientsList = " "
            try {
                missedIngredientsList = capitalizeFirstLetter(searchResults[i].missedIngredients[0].name); 
            } catch (err) {
                console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
                missedIngredientsList = "&nbsp;"
            }

            let usedIngredientsList = " "
            try {
                usedIngredientsList = capitalizeFirstLetter(searchResults[i].usedIngredients[0].name);
            } catch (err) {
                console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
                usedIngredientsList = "&nbsp;"
            }
            
            for (let j = 1; j < searchResults[i].missedIngredients.length; j++){
                missedIngredientsList = missedIngredientsList + ", " + capitalizeFirstLetter(searchResults[i].missedIngredients[j].name);
            };
            console.log("Missing: " + missedIngredientsList)
            
            for (let j = 1; j < searchResults[i].usedIngredients.length; j++){
                console.log(capitalizeFirstLetter(searchResults[i].usedIngredients[j].name))
                usedIngredientsList = usedIngredientsList + ", " + capitalizeFirstLetter(searchResults[i].usedIngredients[j].name);
            };
            console.log("Used: " + usedIngredientsList)

            $("#zero-waste-results-cards-display").append(
                `<div class="recipe-card">
                    <h3 class="text-center">${searchResults[i].title}</h3>
                    <div class="row g-0">
                        <div class="col-12 col-lg-5">
                            <img class="recipe-image" src=${searchResults[i].image} alt="Image of ${searchResults[i].title}">
                        </div>
                        <div class="col-12 col-lg-7">
                            <p class="ingredients-used">Ingredients Used :    ${searchResults[i].usedIngredientCount}</p>
                            <p>${usedIngredientsList}</p>
                            <p class="ingredients-needed">Ingredients Needed :    ${searchResults[i].missedIngredientCount}</p>
                            <p>${missedIngredientsList}</p>
                            <p class="likes">Likes :   ${searchResults[i].likes}</p>
                        </div>
                    </div>
                    <div class="button-container text-center">
                        <button class="view-recipe-button" id=${searchResults[i].id}">View Recipe</button>
                    </div>
                </div>`
            )
        }
    });
}