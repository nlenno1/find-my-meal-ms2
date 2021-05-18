$(window).ready (function() {
    console.log("Id Number : " + getIdfromLocalStorage() + " loaded from Local Storage")
    id = getIdfromLocalStorage()
    url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17`
    console.log(url)
    makeApiCall(url, "single-recipe-to-display");
});