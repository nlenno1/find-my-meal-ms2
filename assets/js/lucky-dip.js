$(window).ready (function() {
    luckyDipApiCall();
});

$("#lucky-dip-button").click(function() {
    luckyDipApiCall()
});

function luckyDipApiCall() {
    url = "https://api.spoonacular.com/recipes/random?apiKey=c4a7c11521de4bae8f06ba9fd8e9ac17&limitLicense=true&number=1";
    console.log("Making API call to: ", url);
    makeApiCall(url, "single-recipe-to-display");
}
