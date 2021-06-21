$(window).ready (function() {
    //developer feedback
    console.log("Id Number : " + loadFromLocalStorage("idToLoad") + " loaded from Local Storage");
    //storing the id saved to local storage from the "view-results" button click event as a variable
    let id = loadFromLocalStorage("idToLoad");
    //storing url as viriable with id variable included
    let url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17`;
    //developer feedback
    console.log(url);
    //calling the makeApiCall function and passing in the URL and searchType
    makeApiCall(url, "single-recipe-to-display");
});