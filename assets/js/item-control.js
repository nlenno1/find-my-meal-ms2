// My Supplies Modal Control 

// defining all global variables 
const regex = new RegExp(/^[a-zA-Z ]+$/);
let zeroWasteIngredientsArray = []
let dietArray = []
let intolerancesArray = []
let searchResults = []

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

// diet add button 
$("#diet-add-button").click(function() {
    addSelectItemToDisplay($("#diet-requirements-select").val(), $("#diet-requirements-select option:selected").text(), "#specific-needs-items-display", "#diet-requirements-select", dietArray, "Diet Array", "dietArray");
});

// intolerances add button 
$("#intolerances-add-button").click(function() {
    addSelectItemToDisplay($("#intolerances-select").val(), $("#intolerances-select option:selected").text(), "#specific-needs-items-display", "#intolerances-select", intolerancesArray, "intolerances Array", "intolerancesArray");
});

// clear My Supplies click event
$("#clear-my-supplies-button").click(function() {
    clearLocalStorge();
});

// BIG CUSTOM FUNCTIONS
function addSelectItemToDisplay(itemCompName, itemScreenName, targetArea, inputArea, arrayToAction, arrayName, compArrayName) {
    if (arrayToAction.includes(itemCompName)) {
        // duplicate value user feedback 
        alert(capitalizeFirstLetter(itemScreenName) + " has already been added to " + arrayName);
    } else if (itemCompName == null) {
        alert("Please select an option from the dropdown menus")
    } else {
        // create Ingredient Object
        createIngredientObject (itemScreenName, itemCompName, targetArea, compArrayName);
        // remove item functionality 
        removeObjectMethod(itemCompName, targetArea, arrayToAction, arrayName, compArrayName);
        // add user input to supplies array 
        arrayToAction.push(itemCompName);
        $(inputArea).val($(inputArea + " option:first").val());
        // show completion of task on log
        console.log(itemCompName + ' added to ' + arrayName)
        console.log(arrayName + " : " + arrayToAction); 
    }
    
}
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
        ingredientCompName = addHyphens(ingredient);
        // create Ingredient Object
        createIngredientObject (ingredient, ingredientCompName, targetArea, compArrayName);
        // remove item functionality 
        removeObjectMethod(ingredientCompName, targetArea, arrayToAction, arrayName, compArrayName);
        // add user input to supplies array 
        arrayToAction.push(ingredientCompName);
        // save mySupplies to local storage for access later
        if (arrayToAction == mySuppliesArray) {
            saveSuppliesToLocalStorage();
        } 
        // show completion of task on log
        console.log(ingredient + ' added to ' + arrayName)
        console.log(arrayName + " : " + arrayToAction);
    }
};

function addHyphens(ingredient) {
    if (ingredient.includes(" ")) {
        ingredient = ingredient.replace(" ", "-");
    };
    return ingredient;
}

function createIngredientObject (ingredient, ingredientCompName, targetArea, compArrayName) {
    // add new element to designated display area 
    $(targetArea).append(
        `<div class="ingredient-added" id="${ingredientCompName}-in-${compArrayName}" value="${ingredientCompName}"> 
            <p> ${capitalizeFirstLetter(ingredient)} </p>
            <button type="button" id="${ingredientCompName}-in-${compArrayName}-remove-button" class="btn-close" aria-label="Remove Item"></button>
        </div>`
    );
    if (compArrayName == "intolerancesArray") {
        $(`#${ingredientCompName}-in-${compArrayName}`).css("background-color", "rgba(3, 144, 252, 0.4)");
    } else if (compArrayName == "dietArray") {
        $(`#${ingredientCompName}-in-${compArrayName}`).css("background-color", "rgba(252, 227, 3, 0.5)");
    }
    // object animations
    $(`#${ingredientCompName}-in-${compArrayName}`).hide();
    $(`#${ingredientCompName}-in-${compArrayName}`).slideDown();
};

function removeObjectMethod(ingredientCompName, targetArea, arrayToAction, arrayName, compArrayName) {
    $(`#${ingredientCompName}-in-${compArrayName}-remove-button`).click(function () {
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
            mySuppliesArray == "" ? alert("My Supplies list is empty. Please add some ingredients and try again") : makeApiCall (compileApiRequirements (mySuppliesArray, "zero-waste"), "zero-waste"); 
        } catch (err) {
            // User error feedback with instructions on how to fix 
            alert('You need to add some ingredients to "My Supplies"')
            // developer feedback
            console.log(err.message)
        }
    } else {
        // check if zeroWasteIngredientsArrayis empty and if not run compiler and make API call
        zeroWasteIngredientsArray == "" ? alert("Zero Waste Ingredients List is empty. Please add some ingredients and try again") : makeApiCall (compileApiRequirements (zeroWasteIngredientsArray, "zero-waste"), "zero-waste");
    }
});

// Specific Needs recipe search call
$("#specific-needs-find-my-meal-button").click(function() {
     // developer feedback
    alert("requested api call");
    // check if user wants to use My Supplies list
    if (intolerancesArray == "" && dietArray == "") {
        alert("Please choose come Dietary Requirements or Intolerances from the drop down menus to search for recipes!")
    } else {
        makeApiCall (compileApiRequirements (dietArray, "specific-needs", intolerancesArray), "specific-needs")
    }
    
});

function compileApiRequirements (firstList, searchType, secondList) {
    if (searchType === "zero-waste") {
        let baseUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17&ingredients="
        console.log ("baseURL : " + baseUrl);
        let compiledList = `${firstList[0]}`
        for (i = 1; i<firstList.length; i++) {
            compiledList = `${compiledList},${firstList[i]}`
        }
        url = `${baseUrl}${compiledList}&number=4&limitLicense=true&ranking=1&ignorePantry=true`
        console.log (url)
        return(url)
    } else if (searchType === "specific-needs") {
        let baseUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17&addRecipeInformation=true"
        console.log ("baseURL : " + baseUrl);
        let compiledDietList = `${firstList[0]}`
        for (i = 1; i<firstList.length; i++) {
            compiledDietList = `${compiledDietList},${firstList[i]}`
        }
        let compiledIntoleranceList = `${secondList[0]}`
        for (i = 1; i<secondList.length; i++) {
            compiledIntoleranceList = `${compiledIntoleranceList},${secondList[i]}`
        }
        url = `${baseUrl}&diet=${compiledDietList}&intolerances=${compiledIntoleranceList}&number=4&limitLicense=true&ranking=1&ignorePantry=true`
        return (url)
    }
}

function makeApiCall (searchUrl, searchType) {
    let settings = {
        "url": searchUrl,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        let searchResults = response
        displaySearchResults(searchResults, searchType);
    });
}

function displaySearchResults(searchResults, searchType) {
    if (searchType === "zero-waste") {
        $("#result-cards-header").html("Recipies Found:");
        $("#zero-waste-results-cards-display").html("");
        for (i = 0; i < searchResults.length; i++) {
            let missedIngredientsList = convertResponseArrayItemNamesToList(searchResults[i].missedIngredients);
            let usedIngredientsList = convertResponseArrayItemNamesToList(searchResults[i].usedIngredients);
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
            );
        }  
    } else if (searchType === "specific-needs") {
        $("#result-cards-header").html("Recipies Found:");
        $("#specific-needs-results-cards-display").html("");
        searchResults = searchResults.results;
        for (let i = 0; i < searchResults.length; i++) {
            let dishTypes = convertResponseArrayToList(searchResults[i].dishTypes);
            let diets = convertResponseArrayToList(searchResults[i].diets);
            $("#specific-needs-results-cards-display").append(
                `<div class="recipe-card">
                    <h3 class="text-center">${searchResults[i].title}</h3>
                    <div class="row g-0">
                        <div class="col-12 col-lg-5">
                            <img class="recipe-image" src=${searchResults[i].image} alt="Image of ${searchResults[i].title}">
                        </div>
                        <div class="col-12 col-lg-7">
                            <p>Type of Dish: ${dishTypes}</p>
                            <p>Ready in: ${searchResults[i].readyInMinutes} mins</p>
                            <p>Servings: ${searchResults[i].servings}</p>
                            <p>Health Score: ${searchResults[i].healthScore}</p>
                            <p>Diets: ${diets}</p>d
                        </div>
                    </div>
                    <div class="button-container text-center">
                        <button class="view-recipe-button" id=${searchResults[i].id}">View Recipe</button>
                    </div>d
                </div>`
            );d
        }  
    } else if (searchType === "single-recipe-to-display") {
        searchResult = searchResults.recipes[0]
        console.log(searchResult)
        $(".recipe-display>h1").html(
            `${searchResult.title}`
        )
        $(".recipe-display-image-summary-container").html(
            `<div class="row g-0">
                <div class="col-12 col-md-4">
                    <img class="recipe-display-image" src=${searchResult.image} alt="Image of ${searchResult.title}">
                </div>
                <div class="d-none d-sm-block col-sm-12 col-md-8">
                    <p>${searchResult.summary}</p>
                </div>
            </div>`
        )
        $(".recipe-display-ingredients").html(
            `<h3 class="text-center">Ingredients</h3>
            <p>${convertExtendedIngredientsToOrderedList(searchResult.extendedIngredients)}</p>`
        )
        $(".recipe-general-info").html(
            `<h3 class="text-center">General Information</h3>
            <ul>
                <li>Servings: ${searchResult.servings}</li>
                <li>Ready in: ${searchResult.readyInMinutes} mins</li>
                <li>Dish type: ${convertResponseArrayToList(searchResult.dishTypes)}</li>
                <li>Suitable for: ${convertResponseArrayToList(searchResult.diets)}</li>
                <li>Cuisines: ${convertResponseArrayToList(searchResult.cuisines)}</li>
                <li>Health Score: ${searchResult.healthScore}</li>
                <li>Price Per Serving: ${searchResult.pricePerServing}</li>
                <li>Spoonacular Score: ${searchResult.spoonacularScore}</li>
            </ul>`
        )
        $(".recipe-display-instructions").html(
            `<h3 class="text-center">Instructions</h3>
            <p>${searchResult.instructions}</p>`
        )
        $(".credits").html(
            `<p>Recipe credit: ${searchResult.sourceName}</p>
            <a href="${searchResult.sourceUrl}" target="_blank">Link to Original Recipe</a>`
        )
    }
}
function convertResponseArrayToList(resultArray) {
    let newString = "";
    try {
        newString = capitalizeFirstLetter(resultArray[0]);
    }
    catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        newString = "&nbsp;";
    }
    for (let j = 1; j < resultArray.length; j++) {
        if (!newString.includes(capitalizeFirstLetter(resultArray[j]))) {
            newString = newString + ", " + capitalizeFirstLetter(resultArray[j]);
        }
    }
    return newString
}

function convertResponseArrayItemNamesToList(resultArray) {
    let newString = "";
    try {
        newString = capitalizeFirstLetter(resultArray[0].name);
    }
    catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        newString = "&nbsp;";
    }
    for (let j = 1; j < resultArray.length; j++) {
        if (!newString.includes(capitalizeFirstLetter(resultArray[j].name))) {
            newString = newString + ", " + capitalizeFirstLetter(resultArray[j].name);
        }
    }
    return newString
}

function convertExtendedIngredientsToOrderedList(resultArray) {
    let newString = "";
    try {
        newString =`<ol> 
                        <li>${resultArray[0].amount} ${resultArray[0].unit} of ${capitalizeFirstLetter(resultArray[0].name)}</li>` 
    }
    catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        newString = "&nbsp;";
    }
    for (let j = 1; j < resultArray.length; j++) {
        if (!newString.includes(capitalizeFirstLetter(resultArray[j].name))) {
            newString = `${newString}<li>${resultArray[j].amount} ${resultArray[j].unit} of ${capitalizeFirstLetter(resultArray[j].name)}</li>`
        }
    }
    newString = `${newString}</ol>`
    return newString
}

function titleToCompName (title) {
    let newString = ""
    for (item of title) {
        if (item == " ") {
            newString = newString + "-"
        } else {
            newString = newString + item.toLowerCase()
        }
    }
    return newString
}


