function addHyphens(ingredient) {
    if (ingredient.includes(" ")) {
        ingredient = ingredient.replace(" ", "-");
    };
    return ingredient;
}

function removeHyphens(ingredient) {
    if (ingredient.includes("-")) {
        ingredient = ingredient.replace("-", " ");
    };
    return ingredient;
}

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
        mySuppliesArray = []
        console.log("Local Storage array cleared", "My Supplies : " + mySuppliesArray) 
    }
}

function saveSuppliesToLocalStorage() {
    localStorage.setItem("mySuppliesSavedList", JSON.stringify(mySuppliesArray));
    console.log("Saved to Local Storage")
}

function capitalizeFirstLetter(string) {
    try {
       return string.charAt(0).toUpperCase() + string.slice(1); 
    } catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        return string
    }

}

function removeItemFromArray(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == item) {
            array.splice(i, 1);
        };
    };
};

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
                        <li>${capitalizeFirstLetter(resultArray[0].originalString)}</li>` 
    }
    catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        newString = "&nbsp;";
    }
    for (let j = 1; j < resultArray.length; j++) {
        newString = `${newString}<li>${capitalizeFirstLetter(resultArray[j].originalString)}</li>`
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

function convertAnalyzedInstructionsToOrderedList(resultArray) {
    let newString = "";
    try {
        newString =`<ol> 
                        <li>${resultArray[0].step}</li>` 
    }
    catch (err) {
        console.log("ERROR CAUGHT! ERROR MESSAGE: " + err.message);
        newString = "&nbsp;";
    }
    for (let j = 1; j < resultArray.length; j++) {
        newString = `${newString}<li>${resultArray[j].step}</li>`
    }
    newString = `${newString}</ol>`
    return newString
}


function createViewRecipeButtons(searchType) {
    $(".view-recipe-button").click(function (event) {
        console.log("button clicked");
        console.log(this.id);
        saveToLocalStorage(this.id, "idToLoad");
        if (searchType == "zero-waste") {
            saveToLocalStorage("zero-waste", "backToResultsPageToLoad")
        } else if (searchType == "specific-needs") {
            saveToLocalStorage("specific-needs", "backToResultsPageToLoad")
        }
        window.location.href = "../../recipe-display.html"
    });
}

function createBackToResultsButton () {
    $("#back-to-results-button").click(function () {
        if (loadFromLocalStorage ("backToResultsPageToLoad") == "zero-waste") {
            window.location.href = "../../zero-waste.html"
        } else if (loadFromLocalStorage ("backToResultsPageToLoad") == "specific-needs") {
            window.location.href = "specific-needs.html"
        }
        saveToLocalStorage (true, "reloadResults")
    });
}
    
function loadStoredResults() {
    if (loadFromLocalStorage("reloadResults") == true) {
        console.log("Reloading results");
        searchResults = loadFromLocalStorage("latestSearchResults");
        console.log(searchResults);
        displaySearchResults(searchResults, loadFromLocalStorage("backToResultsPageToLoad"));
        saveToLocalStorage("", "backToResultsPageToLoad");
        disableLoadStoredResults();
    } else {
        console.log("No previous results to load")
    }
}

function disableLoadStoredResults () {
    saveToLocalStorage(false, "reloadResults");
    console.log("loadStoredResults() disabled")
}

function saveToLocalStorage (itemToSave, tagName) {
    localStorage.setItem(tagName, JSON.stringify(itemToSave));
}

function loadFromLocalStorage (tagName) {
    loadedItem = JSON.parse(localStorage.getItem(tagName));
    return loadedItem
}