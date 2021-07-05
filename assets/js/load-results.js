// Window ready function to disble the loading process for the "Back to results" button.
$(window).ready (function() {
    loadStoredResults();
});
//function to load results stored in local storage
function loadStoredResults() {
    //conditional statement to check if load is needed
    if (loadFromLocalStorage("reloadResults") == true) {
        //initialize variable and store loaded results in it
        let searchResults = loadFromLocalStorage("latestSearchResults");
        //display the results that have been loaded
        displaySearchResults(searchResults, loadFromLocalStorage("backToResultsPageToLoad"));
        //clear data under backToResultsPageToLoad tag in local storage
        saveToLocalStorage("", "backToResultsPageToLoad");
        //disable load results instruction to stop the results being loaded again if user navigates away and back to page
        disableLoadStoredResults();
    }
}