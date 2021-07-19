// My Supplies Modal Control 

// defining all global variables 
const regex = new RegExp(/^[a-zA-Z ]+$/);
let zeroWasteIngredientsArray = [];
let dietArray = [];
let intolerancesArray = [];
let searchResults = [];
let mySuppliesArray;

$(window).ready(function () {
    // open array saved in local storage
    mySuppliesArray = JSON.parse(localStorage.getItem("mySuppliesSavedList"));
    // avoid error with null value
    mySuppliesArray = (mySuppliesArray == null) ? [] : mySuppliesArray;

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
    addSelectItemToDisplay($("#diet-requirements-select").val(), $("#diet-requirements-select option:selected").text(), "#specific-needs-items-display", "#diet-requirements-select", dietArray, "Diet List", "dietArray");
});
// intolerances add button 
$("#intolerances-add-button").click(function () {
    addSelectItemToDisplay($("#intolerances-select").val(), $("#intolerances-select option:selected").text(), "#specific-needs-items-display", "#intolerances-select", intolerancesArray, "Intolerances List", "intolerancesArray");
});
// back to results button
$(".back-to-results-button").click(function () {
    //conditional to check the value of the local storage value backToResultsPageToLoad
    if (loadFromLocalStorage("backToResultsPageToLoad") == "zero-waste") {
        //window load instructions to correct href
        window.location.href = "../../zero-waste.html";
    } else if (loadFromLocalStorage("backToResultsPageToLoad") == "specific-needs") {
        //window load instructions to correct href
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
        // call function to remove the item from the session storage array it is in
        removeItemFromArray(arrayToAction, item.attr("value"));
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
    }
}
//capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    try {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } catch (err) {
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
        // add first item in array to new variable
        let compiledList = `${firstList[0]}`;
        //loop to add the rest of the list seperated by a comma
        for (let i = 1; i < firstList.length; i++) {
            compiledList = `${compiledList},${firstList[i]}`;
        }
        //combine the previously created elements to produce the url needed
        let url = `${baseUrl}${compiledList}&number=20&limitLicense=true&ranking=1&ignorePantry=true`;
        return (url);
    //conditional to determine what API search type is going to happen
    } else if (searchType === "specific-needs") {
        //initialize the base url
        let baseUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17&addRecipeInformation=true";
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
        let url = `${baseUrl}&diet=${compiledDietList}&intolerances=${compiledIntoleranceList}&number=20&limitLicense=true&ranking=1&ignorePantry=true`;
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
        //search type conditional to see if the search is for a multi result display
        if (searchType !== "single-recipe-to-display") {
            //store the respose in local storage in case of needing to reload it for "Back to results" button
            saveToLocalStorage(response, "latestSearchResults");
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
    if (searchType === "zero-waste" && searchResults[0] != undefined) {
        //user feedback - display title for results
        $("#result-cards-header").html("Recipies Found:");
        //create additional masks for results to be loaded
        $("#additional-masks").html('<div class="footer-mask"></div><div class="footer-mask-2"></div><div class="footer-mask-3"></div>');
        //empty search results display area on zero-waste.html
        $("#zero-waste-results-cards-display").html("");
        //display and add padding to search results display section
        $(".recipe-search-results").css("display", "block");
        $(".recipe-search-results").css("padding", "30px 15px");
        //set min-height attribute of .main-body to 0 to remove display error
        $(".main-body").css("min-height", "0");
        //for loop to perform tasks on all results in response data
        for (let i = 0; i < searchResults.length; i++) {
            //initialize missedIngredientsList and usedIngredientsList ofter converting response array into a string
            let missedIngredientsList = convertResponseArrayItemNamesToList(searchResults[i].missedIngredients);
            let usedIngredientsList = convertResponseArrayItemNamesToList(searchResults[i].usedIngredients);
            //add this html to the zero-waste-results-cards-display section of the page
            $("#zero-waste-results-cards-display").append(
                /* template literal of new element to be created and added to display section
                template literal used to make code easier to read and understand
                checkIfHasValue used for every value to avoid empty values being displayed or causing errors - the recipe image is the only exception to this as it have the alt value to fall back on
                the recipe id number is stored in the .view-recipe-button id value to be used when the view-recipe-button is clicked */
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
        window.scrollTo(0, 750);
        //initialize click event listeners for all .view-recipe-button elements
        createViewRecipeButtons(searchType);
    //conditional to determine the search type and to check for a null value response from API call
    } else if (searchType === "specific-needs" && searchResults.results[0] != undefined) {
        //user feedback - display title for results
        $("#result-cards-header").html("Recipies Found:");
        //create additional masks for results to be loaded
        $("#additional-masks").html('<div class="footer-mask"></div><div class="footer-mask-2"></div><div class="footer-mask-3"></div>');
        //empty search results display area on specific-needs.html
        $("#specific-needs-results-cards-display").html("");
        //display and add padding to search results display section
        $(".recipe-search-results").css("display", "block");
        $(".recipe-search-results").css("padding", "30px 15px");
        //set min-height attribute of .main-body to 0 to remove display error
        $(".main-body").css("min-height", "0");
        //reassign search results to access the correct data sets in API response
        searchResults = searchResults.results;
        //for loop to perform tasks on all results in response data
        for (let i = 0; i < searchResults.length; i++) {
            //initialize dishTypes and diets variables - to simplify the code and make it easier to read/manipulate I defined the variables before they are needed but I could have passed this code where the variable names are in the template literal
            let dishTypes = convertResponseArrayToList(searchResults[i].dishTypes);
            let diets = convertResponseArrayToList(searchResults[i].diets);
            /* template literal of new element to be created and added to display section
            template literal used to make code easier to read and understand
            checkIfHasValue used for every value to avoid empty values being displayed or causing errors - the recipe image is the only exception to this as it have the alt value to fall back on
            the recipe id number is stored in the .view-recipe-button id value to be used when the view-recipe-button is clicked */
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
                            <p>Health Score: ${checkIfHasValue(searchResults[i].healthScore)}/100</p>
                            <p>Diets: ${checkIfHasValue(diets)}</p>
                        </div>
                    </div>
                    <div class="button-container text-center">
                        <button class="view-recipe-button" id=${searchResults[i].id}>View Recipe</button>
                    </div>
                </div>`
            );
        }
        //scroll to the top of the results
        window.scrollTo(0, 750);
        //initialize click event listeners for all .view-recipe-button elements
        createViewRecipeButtons(searchType);
    //conditional to determine the search type and to check for a null value response from API call
    } else if (searchType === "single-recipe-to-display") {
        // initialize variable searchResult
        let searchResult;
        /* try catch statement to reassign searchResult variable to correct value to allow code to be reused for
        lucky dip and specific-needs/zero-waste displays */
        try {
            //assign variable if the data to be used is in an array to begin with
            searchResult = searchResults.recipes[0];
        } catch (err) {
            //assign variable from single result
            searchResult = searchResults;
        }
        //set recipe title using response title value
        $(".recipe-display h1").html(
            `${searchResult.title}`
        );
        /* Add summary text, image and image alt value to recipe summary section
        Summary text has all HTML removed from the source data using the removeHTMLElements function */
        $(".recipe-display-image-summary-container").html(
            `<div class="row g-0">
                <div class="col-12 col-md-4">
                    <img class="recipe-display-image" src=${searchResult.image} alt="Image of ${searchResult.title}">
                </div>
                <div class="d-none d-sm-block col-sm-12 col-md-8">
                    <p>${removeHTMLElements(searchResult.summary)}</p>
                </div>
            </div>`
        );
        // Add Ingredients list to Ingredients section - Ingredients string converted into an ordered list using convertExtendedIngredientsToOrderedList function
        $(".recipe-display-ingredients").html(
            `<h3 class="text-center">Ingredients</h3>
            <p>${convertExtendedIngredientsToOrderedList(searchResult.extendedIngredients)}</p>`
        );
        // Add general information to general information section. All values are checked to see if they are empty or invalid to avoid incorrect data presented to the user
        $(".recipe-general-info").html(
            `<h3 class="text-center">General Information</h3>
            <ul>
                <li>Servings: ${checkIfHasValue(searchResult.servings)}</li>
                <li>Ready in: ${checkIfHasValue(searchResult.readyInMinutes)} mins</li>
                <li>Dish type: ${checkIfHasValue(convertResponseArrayToList(searchResult.dishTypes))}</li>
                <li>Suitable for: ${checkIfHasValue(convertResponseArrayToList(searchResult.diets))}</li>
                <li>Cuisines: ${checkIfHasValue(convertResponseArrayToList(searchResult.cuisines))}</li>
                <li>Health Score: ${checkIfHasValue(searchResult.healthScore)}</li>
                <li>Price Per Serving: ${checkIfHasValue(searchResult.pricePerServing)}¢</li>
                <li>Spoonacular Score: ${checkIfHasValue(searchResult.spoonacularScore)}/100</li>
            </ul>`
        );
        //Define recipeInstructionsForDisplay variable which will contain the instructions text
        let recipeInstructionsForDisplay;
        // conditional statements to check which instructions have been provided in the API response 
        if (searchResult.analyzedInstructions == "" && searchResult.analyzedInstructions == "") {
            //if no instructions are provided at all, an error message will display
            recipeInstructionsForDisplay = "There are no instructions provided. Try the Original recipe link to find out more";
        } else if (searchResult.analyzedInstructions == "") {
            //if the basic instructions are provided, store them in the variable
            recipeInstructionsForDisplay = `<p>${searchResult.instructions}</p>`;
        } else {
            // if the analyzed instructions are provided then format them into an ordered list and store it in the variable
            recipeInstructionsForDisplay = convertAnalyzedInstructionsToOrderedList(searchResult.analyzedInstructions[0].steps);
        }
        // display the recipe instructions in the instructions element
        $(".recipe-display-instructions").html(
            `<h3 class="text-center">Instructions</h3>
            ${recipeInstructionsForDisplay}`
        );
        // display credits information in credits element
        $(".credits").html(
            `<p>Recipe credit: ${checkIfHasValue(searchResult.sourceName)}</p>
            <a href="${checkIfHasValue(searchResult.sourceUrl)}" target="_blank" rel="noopener">Link to Original Recipe</a>`
        );
        //initialize click event listeners for .find-my-meal button to show the user another result
        createBackToResultsButton();
    } else {
        //create additional masks for results to be loaded
        $("#additional-masks").html('<div class="footer-mask"></div><div class="footer-mask-2"></div><div class="footer-mask-3"></div>');
        //empty search results display area on specific-needs.html
        $("#specific-needs-results-cards-display").html("");
        //display and add padding to search results display section
        $(".recipe-search-results").css("display", "block");
        $(".recipe-search-results").css("padding", "30px 15px");
        //set min-height attribute of .main-body to 0 to remove display error
        $(".main-body").css("min-height", "0");
        if (searchType === "specific-needs") {
            //empty search results display area on specific-needs.html
            $("#specific-needs-results-cards-display").html("");
        } else if (searchType === "zero-waste") {
            //empty search results display area on specific-needs.html
            $("#zero-waste-results-cards-display").html("");
        }
        //error response value if none of the conditional statement conditions are met
        $("#result-cards-header").html('<i class="fas fa-exclamation-circle"></i> Unfortunatly Something Went Wrong and No Recipies Were Found! <i class="fas fa-exclamation-circle"></i> <hr> Please check your input and try again. If this problem persists, please get in touch to report it!');
    }
}
//function to convert an array into a list in string form
function convertResponseArrayToList(resultArray) {
    //initialize newString variable
    let newString = "";
    //try catch block to remove error if value is null or undefined
    try {
        // store the capitalised first instance of the list in the variable newString
        newString = capitalizeFirstLetter(resultArray[0]);
        //loop through the rest of the array 
        for (let j = 1; j < resultArray.length; j++) {
            //conditional statement to avoid any duplicated values in the array entering the new string
            if (!newString.includes(capitalizeFirstLetter(resultArray[j]))) {
                //appending the next array instance to the string variable formatted correctly
                newString = newString + ", " + capitalizeFirstLetter(resultArray[j]);
            }
        }
    } catch (err) {
        //setting newString value to null which will get picked up and formatted by the checkIfHasValue function before display
        newString = "";
    }
    //return the value of newString
    return newString;
}
// function to convert item names in an array to a list in the form of a string
function convertResponseArrayItemNamesToList(resultArray) {
    //initialize newString variable
    let newString = "";
    //try catch block to remove error if value is null or undefined
    try {
        // store the capitalised first instance of the list in the variable newString
        newString = capitalizeFirstLetter(resultArray[0].name);
        //loop through the rest of the array
        for (let j = 1; j < resultArray.length; j++) {
            //conditional statement to avoid any duplicated values in the array entering the new string
            if (!newString.includes(capitalizeFirstLetter(resultArray[j].name))) {
                newString = newString + ", " + capitalizeFirstLetter(resultArray[j].name);
            }
        }
    } catch (err) {
        //setting newString value to null which will get picked up and formatted by the checkIfHasValue function before display
        newString = "";
    }
    //return the value of newString
    return newString;
}
/* function to covert extended ingredients in API response to an ordered list
this functions used the originalString value as it contains the amount and name of the required ingredient */
function convertExtendedIngredientsToOrderedList(resultArray) {
    //initialize newString variable
    let newString = "";
    //try catch block to remove error if value is null or undefined
    try {
        //add initial ordered list element tag 
        newString = `<ol>`;
        //loop through values in array and add to variable with list item tags
        for (let j = 0; j < resultArray.length; j++) {
            newString = `${newString}<li>${capitalizeFirstLetter(resultArray[j].originalString)}</li>`;
        }
        // add the closing tag for the ordered list
        newString = `${newString}</ol>`;
    } catch (err) {
        // error message if there is no ingredient information
        newString = `<p>Ingredients Information Not Avaliable</p>`;
    }
    //return the value of newString
    return newString;
}
// function to convert analyzed instructions in an array to an ordered list
function convertAnalyzedInstructionsToOrderedList(resultArray) {
    //initialize newString variable
    let newString = "";
    //try catch block to remove error if value is null or undefined
    try {
        //add initial ordered list element tag 
        newString = `<ol>`;
        //loop through values in array and add to variable with list item tags
        for (let j = 0; j < resultArray.length; j++) {
            newString = `${newString}<li>${resultArray[j].step}</li>`;
        }
        // add the closing tag for the ordered list
        newString = `${newString}</ol>`;
    } catch (err) {
        // error message if there are no instructions
        newString = "<p>There are no instructions provided. Click the link to the Original Recipe for more information</p>";
    }
    //return the value of newString
    return newString;
}
//function to create .view-recipe-button listeners and functionality
function createViewRecipeButtons(searchType) {
    //initialize click event listener for all .view-recipe-button class buttons
    $(".view-recipe-button").click(function () {
        //store the recipe id number in local storage for use when loading recipe-display.html
        saveToLocalStorage(this.id, "idToLoad");
        //conditional statement to store which page you should navigate back to if the back to results button is clicked on recipe-display.html
        if (searchType == "zero-waste") {
            saveToLocalStorage("zero-waste", "backToResultsPageToLoad");
        } else if (searchType == "specific-needs") {
            saveToLocalStorage("specific-needs", "backToResultsPageToLoad");
        }
        //load recipe-display.html in the window
        window.location.href = "recipe-display.html";
    });
}
//function to create back-to-results-button listeners and functionality
function createBackToResultsButton() {
    //initialize click event listener for back to results button
    $("#back-to-results-button").click(function () {
        //conditional statement to check the local storage value backToResultsPageToLoad
        if (loadFromLocalStorage("backToResultsPageToLoad") == "zero-waste") {
            //if local storage value is zero-waste, load zero-waste.html in the window
            window.location.href = "zero-waste.html";
        } else if (loadFromLocalStorage("backToResultsPageToLoad") == "specific-needs") {
            //if local storage value is specific-needs, load specific-needs.html in the window
            window.location.href = "specific-needs.html";
        }
        //store true value under reloadResults tag in local storage to be used when specific-needs.html or zero-waste.html is loaded
        saveToLocalStorage(true, "reloadResults");
    });
}
//function to stop rsults being reloaded if you navigate away from them
function disableLoadStoredResults() {
    //store false value under reloadResults tag in local storage
    saveToLocalStorage(false, "reloadResults");
}
//function to save an item to local storage under a supplied tag name
function saveToLocalStorage(itemToSave, tagName) {
    //data formatted correctly and set on local storage
    localStorage.setItem(tagName, JSON.stringify(itemToSave));
}
//function to load an item from local storage which is stored under a specific tag name
function loadFromLocalStorage(tagName) {
    //data un-formatted to allow it to be used and stored in a variable
    let loadedItem = JSON.parse(localStorage.getItem(tagName));
    //variable is returned
    return loadedItem;
}
//function to check if a given varible has a value
function checkIfHasValue(value) {
    //conditional statement to change value of variable if current is undesired
    if (value == "" || value == undefined || value == null) {
        //assigning new value to variable
        value = "N/A";
    }
    //variable is returned
    return value;
}
// function to remove all html elements from a string of text
function removeHTMLElements(string) {
    //define variables needed 
    let openingIndexes = [];
    let closingIndexes = [];
    let newString = "";
    //loop through string and store opening and closing indexes to two seperate arrays
    for (let i = 0; i < string.length; i++){
        if (string[i] == "<") {
            openingIndexes.push(i);
        }
        if (string[i] == ">") {
            closingIndexes.push(i+1);
        }
    }
    // conditional to check if indexes list is empty
    if (closingIndexes.length > 0) {
        //define newString with the first section of text 
        newString = string.slice(0, openingIndexes[0]);
        //loop throught remaining indexes values and add those to the newString variable
        for (let i = 0; i < closingIndexes.length; i++) {
        newString += string.slice(closingIndexes[i], openingIndexes[i+1]);
        }
    //if indexes list is empty assign newString as original string value
    } else {
        newString = string;
    }
    //variable is returned
    return newString;
}