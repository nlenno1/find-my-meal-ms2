console.log("emailJS linked")

function sendMail(contactForm) {
    console.log("Sending Email")
    $("#find-my-meal-button").val("Sending email...");
    $("#loading").html('<img class="loading-gif" src="assets/images/loading.gif">')
    emailjs.send("nlenno1_email", "fmm_emailjs_template", {
        from_name: contactForm.name.value,
        from_email: contactForm.email.value,
        message: contactForm.message.value
    })
    .then(
        function (response) {
            console.log("Email sent!!", response)
            alert("Your message has been sent")
            $("input").val("");
            $("textarea").val("");
            $("#loading").html('')
            $("#find-my-meal-button").val("Send Email");
        },
        function(err) {
            console.log("Sending Failed", err)
            $("#loading").html('')
            alert("There was an error sending your message", err.message)
        }
    );
    return false;
}

