// Window ready function to diable the loading process for the "Back to results" button and to make the API call
$(window).ready (function() {
    luckyDipApiCall();
    disableLoadStoredResults();
});
// Click event to make the api call from the "Show me another" button
$("#lucky-dip-button").click(function() {
    luckyDipApiCall();
});
//API call function
function luckyDipApiCall() {
    //storing the required url as a variable
    let url = "https://api.spoonacular.com/recipes/random?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17&limitLicense=true&number=1";
    //calling the makeApiCall function and passing in the URL and searchType
    makeApiCall(url, "single-recipe-to-display");
    // delay to allow the results to load into the page before scrolling back to the top if needed for UX
    $("html, body").delay(600).animate({scrollTop:0});
}
