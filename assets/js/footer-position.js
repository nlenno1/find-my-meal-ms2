// Window ready function to disble the loading process for the "Back to results" button.
$(window).ready (function() {
    footerPosition();
})

$(window).resize (function() {
    footerPosition();
})

function footerPosition() {
    console.log(($(window).width()));
    console.log($( window ).outerHeight());
    $(".background-image").css("min-height", `calc(${$( window ).outerHeight()} - 184px)`);
};