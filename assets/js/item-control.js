// My Supplies Modal Control 

// defining all global variables 
const regex = new RegExp(/^[a-zA-Z ]+$/);
let zeroWasteIngredientsArray = [];
let dietArray = [];
let intolerancesArray = [];
let searchResults = [];
let mySuppliesArray;

$(window).ready(function () {
    // open array saved in local storage and display messages on console
    mySuppliesArray = JSON.parse(localStorage.getItem("mySuppliesSavedList"));
    console.log(mySuppliesArray == undefined || null ? "No instance of My Supplies Array Exists" : "My Supplies Array Exists");
    console.log("My Supplies Array opened from Local Storage : " + (mySuppliesArray == "" ? "No items to load!" : mySuppliesArray));
    // avoid error with null value
    mySuppliesArray = (mySuppliesArray == null) ? [] : mySuppliesArray;
    //developer feedback
    console.log("My Supplies : " + mySuppliesArray);

    // turn item in the array into html elements
    for (let item of mySuppliesArray) {
        let screenName = removeHyphens(item);
        createIngredientObject(screenName, item, $("#my-supplies-display"), "mySuppliesArray");
        removeObjectMethod(item, $("#my-supplies-display"), mySuppliesArray, "My Supplies", "mySuppliesArray");
    }

    // ADD BUTTON AND ENTER KEY EVENTS
    // my supplies input add button 
    $("#supplies-add-button").click(function () {
        addItemToDisplay($("#ingredient-name").val().toLowerCase(), "#my-supplies-display", "#ingredient-name", mySuppliesArray, "My Supplies", "mySuppliesArray");
    });

    // my supplies input enter key event 
    $("#ingredient-name").keypress(function (event) {
        let key = event.keyCode;
        if (key == "13") {
            addItemToDisplay($("#ingredient-name").val().toLowerCase(), "#my-supplies-display", "#ingredient-name", mySuppliesArray, "My Supplies", "mySuppliesArray");
        }
    });

    // clear My Supplies click event
    $("#clear-my-supplies-button").click(function () {
        clearLocalStorge();
    });
});

//   ------------------------ CLICK EVENTS ------------------------
// zero-waste input add button 
$("#zero-waste-add-button").click(function () {
    addItemToDisplay($("#zero-waste-ingredient-name").val().toLowerCase(), "#zero-waste-ingredients-display", "#zero-waste-ingredient-name", zeroWasteIngredientsArray, "Zero-Waste Ingredients", "zeroWasteIngredientsArray");
});

// zero-waste input enter key event 
$("#zero-waste-ingredient-name").keypress(function (event) {
    let key = event.keyCode;
    if (key == "13") {
        addItemToDisplay($("#zero-waste-ingredient-name").val().toLowerCase(), "#zero-waste-ingredients-display", "#zero-waste-ingredient-name", zeroWasteIngredientsArray, "Zero-Waste Ingredients", "zeroWasteIngredientsArray");
    }
});

// diet add button 
$("#diet-add-button").click(function () {
    addSelectItemToDisplay($("#diet-requirements-select").val(), $("#diet-requirements-select option:selected").text(), "#specific-needs-items-display", "#diet-requirements-select", dietArray, "Diet Array", "dietArray");
});

// intolerances add button 
$("#intolerances-add-button").click(function () {
    addSelectItemToDisplay($("#intolerances-select").val(), $("#intolerances-select option:selected").text(), "#specific-needs-items-display", "#intolerances-select", intolerancesArray, "intolerances Array", "intolerancesArray");
});

$(".back-to-results-button").click(function () {
    if (loadFromLocalStorage("backToResultsPageToLoad") == "zero-waste") {
        window.location.href = "../../zero-waste.html";
    } else if (loadFromLocalStorage("backToResultsPageToLoad") == "specific-needs") {
        window.location.href = "../../specific-needs.html";
    }
});

// ------------ LARGE FUNCTIONS ------------
//Check date entered from a SELECT menu before processing
function addSelectItemToDisplay(itemCompName, itemScreenName, targetArea, inputArea, arrayToAction, arrayName, compArrayName) {
    if (arrayToAction.includes(itemCompName)) {
        // duplicate value user feedback 
        alert(capitalizeFirstLetter(itemScreenName) + " has already been added to " + arrayName);
    } else if (itemCompName == null) {
        // conditional for no selection made - original values given item value of null
        alert("Please select an option from the dropdown menus");
    } else {
        // create Ingredient Object
        createIngredientObject(itemScreenName, itemCompName, targetArea, compArrayName);
        // remove item functionality 
        removeObjectMethod(itemCompName, targetArea, arrayToAction, arrayName, compArrayName);
        // add user input to supplies array 
        arrayToAction.push(itemCompName);
        $(inputArea).val($(inputArea + " option:first").val());
        // show completion of task on log
        console.log(itemCompName + ' added to ' + arrayName);
        console.log(arrayName + " : " + arrayToAction);
    }
}
//Check date entered from a INPUT box before processing
function addItemToDisplay(ingredient, targetArea, inputArea, arrayToAction, arrayName, compArrayName) {
    // clear input value for next ingredient and keep focus on input box 
    focusAndClear(inputArea);
    // control conditional to avoid adding a empty value 
    if (ingredient.length == 0) {
        // empty value user feedback 
        alert("Please enter an ingredient name");
        // control conditional to make sure input doesn't contain forbidden characters
    } else if (!regex.test(ingredient)) {
        // clear input box and focus on it
        focusAndClear(inputArea);
        //error user feedback
        alert("Please only use letters in the ingredient name");
        // control conditional to avoid duplicate values entered
    } else if (arrayToAction.includes(ingredient)) {
        // clear input box and focus on it
        focusAndClear(inputArea);
        // duplicate value user feedback 
        alert(capitalizeFirstLetter(ingredient) + " has already been added to " + arrayName);
    } else {
        //replaces spaces with hypens so name can be used by js
        let ingredientCompName = addHyphens(ingredient);
        // create Ingredient Object
        createIngredientObject(ingredient, ingredientCompName, targetArea, compArrayName);
        // remove item functionality 
        removeObjectMethod(ingredientCompName, targetArea, arrayToAction, arrayName, compArrayName);
        // add user input to supplies array 
        arrayToAction.push(ingredientCompName);
        // save mySupplies to local storage for access later
        if (arrayToAction == mySuppliesArray) {
            saveToLocalStorage(mySuppliesArray, "mySuppliesSavedList");
        }
        // show completion of task on log
        console.log(ingredient + ' added to ' + arrayName);
        console.log(arrayName + " : " + arrayToAction);
    }
}
//Create ingredient element in the selected display area
function createIngredientObject(ingredient, ingredientCompName, targetArea, compArrayName) {
    // add new element to designated display area 
    $(targetArea).append(
        `<div class="ingredient-added" id="${ingredientCompName}-in-${compArrayName}" value="${ingredientCompName}"> 
            <p> ${capitalizeFirstLetter(ingredient)} </p>
            <button type="button" id="${ingredientCompName}-in-${compArrayName}-remove-button" class="btn-close" aria-label="Remove Item"></button>
        </div>`
    );
    //color change intolerance element backgrounds depending on what array they are in
    if (compArrayName == "intolerancesArray") {
        $(`#${ingredientCompName}-in-${compArrayName}`).css("background-color", "rgba(3, 144, 252, 0.4)");
    } else if (compArrayName == "dietArray") {
        $(`#${ingredientCompName}-in-${compArrayName}`).css("background-color", "rgba(252, 227, 3, 0.5)");
    }
    // object animations when created
    $(`#${ingredientCompName}-in-${compArrayName}`).hide();
    $(`#${ingredientCompName}-in-${compArrayName}`).slideDown();
}
//create click event listener for the remove button
function removeObjectMethod(ingredientCompName, targetArea, arrayToAction, arrayName, compArrayName) {
    $(`#${ingredientCompName}-in-${compArrayName}-remove-button`).click(function () {
        //store parent of clicked element as variable
        let item = $(this).parent();
        // call function to remove the item from the array it is in
        removeItemFromArray(arrayToAction, item.attr("value"));
        //developer feedback
        console.log(item.attr("value") + ' removed from ' + arrayName);
        console.log(arrayName + " : " + arrayToAction);
        //save mySupplies array to local storage if changed
        if (arrayToAction == mySuppliesArray) {
            saveToLocalStorage(mySuppliesArray, "mySuppliesSavedList");
        }
        //remove element from html with animation
        item.fadeOut(function () {
            item.remove();
        });
    });
}

// ------------ SMALL FUNCTIONS ------------
// Replace spaces in a string with hyphens
function addHyphens(ingredient) {
    if (ingredient.includes(" ")) {
        ingredient = ingredient.replace(" ", "-");
    }
    return ingredient;
}
// Replace hyphens in a string with spaces
function removeHyphens(ingredient) {
    if (ingredient.includes("-")) {
        ingredient = ingredient.replace("-", " ");
    }
    return ingredient;
}
//focus on selected area and clear the input box
function focusAndClear(targetInput) {
    $(targetInput).val("");
    $(targetInput).focus();
}
//remove all items created from local storage  
function clearLocalStorge() {
    //contron conditional to check if list is empty
    if (mySuppliesArray.length == 0) {
        //user feedback
        alert("My Supplies List is already empty");
    } else {
        //for loop to cycle through all the names in the array
        for (let name of mySuppliesArray) {
            // initializing item variable to be the elements id
            let item = $(`#${name}-in-mySuppliesArray`);
            //fading the element
            item.fadeOut(function () {
                //removing the element after the fade has completed
                item.remove();
            });
        }
        //access local storage and set saved array to an empty array
        localStorage.setItem("mySuppliesSavedList", JSON.stringify([]));
        //set the current array to an empty array
        mySuppliesArray = [];
        //developer feedback
        console.log("Local Storage array cleared", "My Supplies : " + mySuppliesArray);
    }
}
//capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    try {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        return string;
    }
}
//remove a specific string from an array
function removeItemFromArray(array, item) {
    //for loop to cycle through selected array
    for (let i = 0; i < array.length; i++) {
        //conditional to check array item value
        if (array[i] == item) {
            //remove the item
            array.splice(i, 1);
        }
    }
}

// ------------ API CALLS ------------
// Zero-Waste recipe search call
$("#zero-waste-find-my-meal-button").click(function () {
    // check if user wants to use My Supplies list
    if ($('input[type=checkbox]').prop('checked')) {
        // try block to remove chance of error if no instance of mySuppliesArray exists in local storage
        try {
            // inline conditional to check if list exists but is empty. If not API is called using list
            if (mySuppliesArray == "") {
                alert("My Supplies list is empty. Please add some ingredients and try again");
            } else {
                makeApiCall(compileApiRequirements(mySuppliesArray, "zero-waste"), "zero-waste");
            }
        } catch (err) {
            // User error feedback with instructions on how to fix 
            alert('You need to add some ingredients to "My Supplies"');
            // developer feedback
            console.log(err.message);
        }
    } else {
        // conditional to check if zeroWasteIngredientsArrayis empty and if not run API Requirements compiler and make API call
        if (zeroWasteIngredientsArray == "") {
            alert("Zero Waste Ingredients List is empty. Please add some ingredients and try again");
        } else {
            makeApiCall(compileApiRequirements(zeroWasteIngredientsArray, "zero-waste"), "zero-waste");
        }
    }
});
// Specific Needs recipe search call
$("#specific-needs-find-my-meal-button").click(function () {
    // check if user wants to use My Supplies list else make API call
    if (intolerancesArray == "" && dietArray == "") {
        alert("Please choose come Dietary Requirements or Intolerances from the drop down menus to search for recipes!");
    } else {
        makeApiCall(compileApiRequirements(dietArray, "specific-needs", intolerancesArray), "specific-needs");
    }
});
//Prepare the requirements for the different API calls
function compileApiRequirements(firstList, searchType, secondList) {
    //conditional to determine what API search type is going to happen
    if (searchType === "zero-waste") {
        //initialize the base url
        let baseUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17&ingredients=";
        //developer feedback
        console.log("baseURL : " + baseUrl);
        // add first item in array to new variable
        let compiledList = `${firstList[0]}`;
        //loop to add the rest of the list seperated by a comma
        for (let i = 1; i < firstList.length; i++) {
            compiledList = `${compiledList},${firstList[i]}`;
        }
        //combine the previously created elements to produce the url needed
        let url = `${baseUrl}${compiledList}&number=4&limitLicense=true&ranking=1&ignorePantry=true`;
        //developer feedback
        console.log(url);
        return (url);
    //conditional to determine what API search type is going to happen
    } else if (searchType === "specific-needs") {
        //initialize the base url
        let baseUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17&addRecipeInformation=true";
        //developer feedback
        console.log("baseURL : " + baseUrl);
        // add first item in array to new variable
        let compiledDietList = `${firstList[0]}`;
        //loop to add the rest of the list seperated by a comma
        for (let i = 1; i < firstList.length; i++) {
            compiledDietList = `${compiledDietList},${firstList[i]}`;
        }
        // add first item in array to new variable
        let compiledIntoleranceList = `${secondList[0]}`;
        //loop to add the rest of the list seperated by a comma
        for (let i = 1; i < secondList.length; i++) {
            compiledIntoleranceList = `${compiledIntoleranceList},${secondList[i]}`;
        }
        //combine the previously created elements to produce the url needed
        let url = `${baseUrl}&diet=${compiledDietList}&intolerances=${compiledIntoleranceList}&number=4&limitLicense=true&ranking=1&ignorePantry=true`;
        return (url);
    }
}
//Perform the API call
function makeApiCall(searchUrl, searchType) {
    // change the label on the find-my-meal-button as user feedback
    $("#find-my-meal-button").val("Searching For Recipes ...");
    // add loader gif as user feedback
    $("#loading").html('<img class="loading-gif" src="assets/images/loading.gif">');
    // initialize setting variable containing all required settings for API call
    let settings = {
        "url": searchUrl,
        "method": "GET",
        "timeout": 0,
    };
    //request data using ajax
    $.ajax(settings).done(function (response) {
        //developer feedback
        console.log(response);
        //search type conditional to see if the search is for a multi result display
        if (searchType !== "single-recipe-to-display") {
            //store the respose in local storage in case of needing to reload it for "Back to results" button
            saveToLocalStorage(response, "latestSearchResults");
            //developer feedback
            console.log("Response saved to local storage under tag latestSearchResults");
        }
        //store response in a variable
        searchResults = response;
        //display search results        
        displaySearchResults(searchResults, searchType);
        // reset user feedback values
        $("#loading").html('');
        $("#find-my-meal-button").val("Find My Meal");
    });
}
//function to determine what data is being passed as an arguement and how to display it
function displaySearchResults(searchResults, searchType) {
    //conditional to determine the search type and to check for a null value response from API call
    if (searchType === "zero-waste" && searchResults[0].title !== "") {
        //user feedback - display title for results
        $("#result-cards-header").html("Recipies Found:");
        //empty search results display area on zero-waste.html
        $("#zero-waste-results-cards-display").html("");
        //for loop to perform tasks on all results in response data
        for (let i = 0; i < searchResults.length; i++) {
            //initialize missedIngredientsList and usedIngredientsList ofter converting response array into a string
            let missedIngredientsList = convertResponseArrayItemNamesToList(searchResults[i].missedIngredients);
            let usedIngredientsList = convertResponseArrayItemNamesToList(searchResults[i].usedIngredients);
            //add this html to the zero-waste-results-cards-display section of the page
            $("#zero-waste-results-cards-display").append(
                //template literal of new element to be created and added to display section
                //template literal used to make code easier to read and understand
                //checkIfHasValue used for every value to avoid empty values being displayed or causing errors - the recipe image is the only exception to this as it have the alt value to fall back on
                //the recipe id number is stored in the .view-recipe-button id value to be used when the view-recipe-button is clicked 
                `<div class="recipe-card">
                    <!--Recipe Title-->
                    <h3 class="text-center">${checkIfHasValue(searchResults[i].title)}</h3>
                    <div class="row g-0">
                        <div class="col-12 col-lg-5">
                            <!--Recipe Image-->
                            <img class="recipe-image" src=${searchResults[i].image} alt="Image of ${checkIfHasValue(searchResults[i].title)}">
                        </div>
                        <div class="col-12 col-lg-7">
                            <p class="ingredients-used">Ingredients Used : ${checkIfHasValue(searchResults[i].usedIngredientCount)}</p>
                            <p>${checkIfHasValue(usedIngredientsList)}</p>
                            <p class="ingredients-needed">Ingredients Needed : ${checkIfHasValue(searchResults[i].missedIngredientCount)}</p>
                            <p>${checkIfHasValue(missedIngredientsList)}</p>
                            <p class="likes">Likes : ${checkIfHasValue(searchResults[i].likes)}</p>
                        </div>
                    </div>
                    <div class="button-container text-center">
                        <button class="view-recipe-button zero-waste-display-recipe-button" id=${searchResults[i].id}>View Recipe</button>
                    </div>
                </div>`
            );
        }
        //scroll to the top of the results
        window.scrollTo(0, 680);
        //initialize click event listeners for all .view-recipe-button elements
        createViewRecipeButtons(searchType);
    //conditional to determine the search type and to check for a null value response from API call
    } else if (searchType === "specific-needs" && searchResults.results[0].title !== "") {
        //user feedback - display title for results
        $("#result-cards-header").html("Recipies Found:");
        //empty search results display area on specific-needs.html
        $("#specific-needs-results-cards-display").html("");
        //reassign search results to access the correct data sets in API response
        searchResults = searchResults.results;
        //for loop to perform tasks on all results in response data
        for (let i = 0; i < searchResults.length; i++) {
            //initialize dishTypes and diets variables - to simplify the code and make it easier to read/manipulate I defined the variables before they are needed but I could have passed this code where the variable names are in the template literal
            let dishTypes = convertResponseArrayToList(searchResults[i].dishTypes);
            let diets = convertResponseArrayToList(searchResults[i].diets);
            //template literal of new element to be created and added to display section
            //template literal used to make code easier to read and understand
            //checkIfHasValue used for every value to avoid empty values being displayed or causing errors - the recipe image is the only exception to this as it have the alt value to fall back on
            //the recipe id number is stored in the .view-recipe-button id value to be used when the view-recipe-button is clicked 
            $("#specific-needs-results-cards-display").append(
                `<div class="recipe-card">
                    <h3 class="text-center">${checkIfHasValue(searchResults[i].title)}</h3>
                    <div class="row g-0">
                        <div class="col-12 col-lg-5">
                            <img class="recipe-image" src=${searchResults[i].image} alt="Image of ${checkIfHasValue(searchResults[i].title)}">
                        </div>
                        <div class="col-12 col-lg-7">
                            <p>Type of Dish: ${checkIfHasValue(dishTypes)}</p>
                            <p>Ready in: ${checkIfHasValue(searchResults[i].readyInMinutes)} mins</p>
                            <p>Servings: ${checkIfHasValue(searchResults[i].servings)}</p>
                            <p>Health Score: ${checkIfHasValue(searchResults[i].healthScore)}</p>
                            <p>Diets: ${checkIfHasValue(diets)}</p>
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
        let searchResult;
        try {
            searchResult = searchResults.recipes[0];
        } catch (err) {
            console.log("This is only 1 recipe being loaded");
            searchResult = searchResults;
        }
        console.log(searchResult);
        $(".recipe-display h1").html(
            `${searchResult.title}`
        );
        $(".recipe-display-image-summary-container").html(
            `<div class="row g-0">
                <div class="col-12 col-md-4">
                    <img class="recipe-display-image" src=${searchResult.image} alt="Image of ${searchResult.title}">
                </div>
                <div class="d-none d-sm-block col-sm-12 col-md-8">
                    <p>${searchResult.summary}</p>
                </div>
            </div>`
        );
        $(".recipe-display-ingredients").html(
            `<h3 class="text-center">Ingredients</h3>
            <p>${convertExtendedIngredientsToOrderedList(searchResult.extendedIngredients)}</p>`
        );
        $(".recipe-general-info").html(
            `<h3 class="text-center">General Information</h3>
            <ul>
                <li>Servings: ${checkIfHasValue(searchResult.servings)}</li>
                <li>Ready in: ${checkIfHasValue(searchResult.readyInMinutes)} mins</li>
                <li>Dish type: ${checkIfHasValue(convertResponseArrayToList(searchResult.dishTypes))}</li>
                <li>Suitable for: ${checkIfHasValue(convertResponseArrayToList(searchResult.diets))}</li>
                <li>Cuisines: ${checkIfHasValue(convertResponseArrayToList(searchResult.cuisines))}</li>
                <li>Health Score: ${checkIfHasValue(searchResult.healthScore)}</li>
                <li>Price Per Serving: £${checkIfHasValue(searchResult.pricePerServing)}</li>
                <li>Spoonacular Score: ${checkIfHasValue(searchResult.spoonacularScore)}</li>
            </ul>`
        );
        let recipeInstructionsForDisplay;
        if (searchResult.analyzedInstructions == "" && searchResult.analyzedInstructions == "") {
            recipeInstructionsForDisplay = "There are no instructions provided";
        } else if (searchResult.analyzedInstructions == "") {
            recipeInstructionsForDisplay = `<p>${searchResult.instructions}</p>`;
        } else {
            recipeInstructionsForDisplay = convertAnalyzedInstructionsToOrderedList(searchResult.analyzedInstructions[0].steps);
        }
        $(".recipe-display-instructions").html(
            `<h3 class="text-center">Instructions</h3>
            ${recipeInstructionsForDisplay}`
        );
        $(".credits").html(
            `<p>Recipe credit: ${checkIfHasValue(searchResult.sourceName)}</p>
            <a href="${checkIfHasValue(searchResult.sourceUrl)}" target="_blank" rel="noopener">Link to Original Recipe</a>`
        );
        createBackToResultsButton();
    } else {
        $("#result-cards-header").html('<i class="fas fa-exclamation-circle"></i> Unfortunatly Something Went Wrong and No Recipies Were Found! <i class="fas fa-exclamation-circle"></i>');
    }
}

function convertResponseArrayToList(resultArray) {
    let newString = "";
    try {
        newString = capitalizeFirstLetter(resultArray[0]);
    } catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        newString = "&nbsp;";
    }
    for (let j = 1; j < resultArray.length; j++) {
        if (!newString.includes(capitalizeFirstLetter(resultArray[j]))) {
            newString = newString + ", " + capitalizeFirstLetter(resultArray[j]);
        }
    }
    return newString;
}

function convertResponseArrayItemNamesToList(resultArray) {
    let newString = "";
    try {
        newString = capitalizeFirstLetter(resultArray[0].name);
    } catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        newString = "&nbsp;";
    }
    for (let j = 1; j < resultArray.length; j++) {
        if (!newString.includes(capitalizeFirstLetter(resultArray[j].name))) {
            newString = newString + ", " + capitalizeFirstLetter(resultArray[j].name);
        }
    }
    return newString;
}

function convertExtendedIngredientsToOrderedList(resultArray) {
    let newString = "";
    try {
        newString = `<ol> 
                        <li>${capitalizeFirstLetter(resultArray[0].originalString)}</li>`;
    } catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        newString = "&nbsp;";
    }
    for (let j = 1; j < resultArray.length; j++) {
        newString = `${newString}<li>${capitalizeFirstLetter(resultArray[j].originalString)}</li>`;
    }
    newString = `${newString}</ol>`;
    return newString;
}

function convertAnalyzedInstructionsToOrderedList(resultArray) {
    let newString = "";
    try {
        newString = `<ol> 
                        <li>${resultArray[0].step}</li>`;
    } catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        newString = "&nbsp;";
    }
    for (let j = 1; j < resultArray.length; j++) {
        newString = `${newString}<li>${resultArray[j].step}</li>`;
    }
    newString = `${newString}</ol>`;
    return newString;
}


function createViewRecipeButtons(searchType) {
    $(".view-recipe-button").click(function () {
        console.log("button clicked");
        console.log(this.id);
        saveToLocalStorage(this.id, "idToLoad");
        if (searchType == "zero-waste") {
            saveToLocalStorage("zero-waste", "backToResultsPageToLoad");
        } else if (searchType == "specific-needs") {
            saveToLocalStorage("specific-needs", "backToResultsPageToLoad");
        }
        window.location.href = "recipe-display.html";
    });
}

function createBackToResultsButton() {
    $("#back-to-results-button").click(function () {
        if (loadFromLocalStorage("backToResultsPageToLoad") == "zero-waste") {
            window.location.href = "zero-waste.html";
        } else if (loadFromLocalStorage("backToResultsPageToLoad") == "specific-needs") {
            window.location.href = "specific-needs.html";
        }
        saveToLocalStorage(true, "reloadResults");
    });
}

function disableLoadStoredResults() {
    saveToLocalStorage(false, "reloadResults");
    console.log("loadStoredResults() disabled");
}


function saveToLocalStorage(itemToSave, tagName) {
    localStorage.setItem(tagName, JSON.stringify(itemToSave));
}

function loadFromLocalStorage(tagName) {
    let loadedItem = JSON.parse(localStorage.getItem(tagName));
    return loadedItem;
}

function checkIfHasValue(value) {
    if (value == "" || value == undefined || value == null) {
        value = "Unknown";
    }
    return value;
}