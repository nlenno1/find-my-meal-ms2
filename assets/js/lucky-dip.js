$(window).ready (function() {
    url = "https://api.spoonacular.com/recipes/random?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17&limitLicense=true&number=1"
    console.log(url)
    makeApiCall (url, "single-recipe-to-display")
});