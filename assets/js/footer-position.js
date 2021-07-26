// Window ready function to call function when window is loaded
$(window).ready(function() {
    footerPosition();
});
// Window resize listener to call function when the window is resized
$(window).resize(function() {
    footerPosition();
});
// Window scroll event listener to call function when window is scrolled
$(window).scroll(function() {
    footerPosition();
});

// defining footerPosition function to determine what extra page elements there are
function footerPosition() {
    // conditional statements to verify what elements exist on the page
    if ($("nav").outerHeight() > 0 && $(".recipe-search-results").outerHeight() > 0) {
        // setFooterAttributes function call passing extra page elements as arguments
        setFooterAttributes ($("nav").outerHeight() + $(".recipe-search-results").outerHeight());
    } else if ($("nav").outerHeight() > 0) {
        // setFooterAttributes function call passing extra page element as argument
        setFooterAttributes ($("nav").outerHeight());
    } else {
        // setFooterAttributes function call passing null as argument as there are no extra page elements
        setFooterAttributes (null);
    }
    // defining function to change the footer attributes
    function setFooterAttributes (extraElements) {
        //initialize compulsaryPageComponents with elements expected on all pages
        let compulsaryPageComponents = $(".main-body").outerHeight() + $("footer").outerHeight();
        // conditional statement to check height of page elements against the window height
        if (compulsaryPageComponents + extraElements < $( window ).height()) {
            // change footer css to fix the footer to the bottom of the window
            $("footer").css("position", "fixed");
        } else if  (compulsaryPageComponents + extraElements > $( window ).height()) {
            //change footer css to have it after all the other page elements
            $("footer").css("position", "relative");
        }
    }
}