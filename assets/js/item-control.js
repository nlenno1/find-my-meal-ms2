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
console.log("My Supplies : " + mySuppliesArray)

// turn item in the array into html elements
for (item of mySuppliesArray) {
    console.log(item)
    let screenName = removeHyphens(item)
    createIngredientObject (screenName, item, $("#my-supplies-display"), "mySuppliesArray");
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
    $("#find-my-meal-button").val("Searching For Recipes ...");
    $("#loading").html('<img class="loading-gif" src="assets/images/loading.gif">')
    let settings = {
        "url": searchUrl,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        if (searchType !== "single-recipe-to-display") {
            saveToLocalStorage(response, "latestSearchResults")
            console.log("Response saved to local storage under tag latestSearchResults")
        }
        let searchResults = response
        displaySearchResults(searchResults, searchType);
        $("#loading").html('')
        $("#find-my-meal-button").val("Find My Meal");
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
                        <button class="view-recipe-button zero-waste-display-recipe-button" id=${searchResults[i].id}>View Recipe</button>
                    </div>
                </div>`
            );
        } 
        window.scrollTo(0, 680);
        // VIEW RECIPE BUTTON
        createViewRecipeButtons(searchType);
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
                            <p>Diets: ${diets}</p>
                        </div>
                    </div>
                    <div class="button-container text-center">
                        <button class="view-recipe-button" id=${searchResults[i].id}>View Recipe</button>
                    </div>
                </div>`
            );
        } 
        window.scrollTo(0, 680);
        // VIEW RECIPE BUTTON
        createViewRecipeButtons(searchType);
    } else if (searchType === "single-recipe-to-display") {
        try {
            searchResult = searchResults.recipes[0]
        } catch (err) {
            console.log("This is only 1 recipe being loaded")
            searchResult = searchResults
        }
        
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
        if (searchResult.analyzedInstructions == "" && searchResult.analyzedInstructions == "") {
            recipeInstructionsForDisplay = "There are no instructions provided"
        } else if (searchResult.analyzedInstructions == "") {
            recipeInstructionsForDisplay = `<p>${searchResult.instructions}</p>`
        } else {
            recipeInstructionsForDisplay = convertAnalyzedInstructionsToOrderedList(searchResult.analyzedInstructions[0].steps)
        }
        $(".recipe-display-instructions").html(
            `<h3 class="text-center">Instructions</h3>
            ${recipeInstructionsForDisplay}`
        )
        $(".credits").html(
            `<p>Recipe credit: ${searchResult.sourceName}</p>
            <a href="${searchResult.sourceUrl}" target="_blank">Link to Original Recipe</a>`
        )
        createBackToResultsButton ()
    }
}