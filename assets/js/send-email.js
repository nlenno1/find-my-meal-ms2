$(window).ready (function() {
    //disble the loading process for the "Back to results" button.
    disableLoadStoredResults();
    //deveoper feedback
    console.log("emailJS linked")
});

function sendMail(contactForm) {
    //developer feedback
    console.log("Sending Email")
    //user loading feedback - change text on button
    $("#find-my-meal-button").val("Sending email...");
    //user loading feedback - add loader gif
    $("#loading").html('<img class="loading-gif" src="assets/images/loading.gif">')
    // EmailJS API call using user inputted information
    emailjs.send("nlenno1_email", "fmm_emailjs_template", {
        from_name: contactForm.name.value,
        from_email: contactForm.email.value,
        message: contactForm.message.value
    })
    //wait for response from API
    .then(
        function (response) {
            //developer feedback
            console.log("Email sent!!", response)
            //user loading feedback - alert message
            alert("Your message has been sent")
            //clear all input values and set button text back to original text
            $("input").val("");
            $("textarea").val("");
            $("#loading").html('')
            $("#find-my-meal-button").val("Send Email");
        },
        //error function
        function(err) {
            //developer feedback
            console.log("Sending Failed", err)
            //user feedback - remove loading gif
            $("#loading").html('')
            //user feedback - alert message explaining error
            alert("There was an error sending your message", err.message)
        }
    );
    return false;
}

