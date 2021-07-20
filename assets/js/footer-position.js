// Window ready function to call function when window is loaded
$(window).ready (function() {
    footerPosition();
})
// Window resize listener to call function when the window is resized
$(window).resize (function() {
    footerPosition();
})
// Window scroll event listener to call function when window is scrolled
$(window).scroll (function() {
    footerPosition();
})
// defining footerPosition function to change the footer position depending on screen height
function footerPosition() {
    // conditional statement to check height of background image and footer against the window height
    if ($(".background-image-container").outerHeight() + $("footer").outerHeight() < $( window ).height()) {
        // change footer css to fix the footer to the bottom of the window
        $("footer").css("position", "fixed")
    } else if  ($(".background-image-container").outerHeight() + $("footer").outerHeight() > $( window ).height()) {
        //change footer css to have it after all the other page elements
        $("footer").css("position", "relative")
    }
};