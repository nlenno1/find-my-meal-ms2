$(window).ready (function() {
    console.log("Id Number : " + loadFromLocalStorage("idToLoad") + " loaded from Local Storage")
    id = loadFromLocalStorage("idToLoad")
    url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17`
    console.log(url)
    makeApiCall(url, "single-recipe-to-display");
});

$(".back-to-results-button").click(function() {
    if (loadFromLocalStorage ("backToResultsPageToLoad") == "zero-waste") {
        window.location.href = "../../zero-waste.html"
    } else if (loadFromLocalStorage ("backToResultsPageToLoad") == "specific-needs") {
        window.location.href = "../../specific-needs.html"
    }
});