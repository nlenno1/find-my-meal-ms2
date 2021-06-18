// Window ready function to disble the loading process for the "Back to results" button.
$(window).ready (function() {
    loadStoredResults();
});

function loadStoredResults() {
    if (loadFromLocalStorage("reloadResults") == true) {
        console.log("Reloading results");
        searchResults = loadFromLocalStorage("latestSearchResults");
        console.log(searchResults);
        displaySearchResults(searchResults, loadFromLocalStorage("backToResultsPageToLoad"));
        saveToLocalStorage("", "backToResultsPageToLoad");
        disableLoadStoredResults();
    } else {
        console.log("No previous results to load");
    }
}