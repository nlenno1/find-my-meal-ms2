$(window).ready (function() {
    loadStoredResults();
});

// diet add button 
$("#diet-add-button").click(function() {
    addSelectItemToDisplay($("#diet-requirements-select").val(), $("#diet-requirements-select option:selected").text(), "#specific-needs-items-display", "#diet-requirements-select", dietArray, "Diet Array", "dietArray");
});

// intolerances add button 
$("#intolerances-add-button").click(function() {
    addSelectItemToDisplay($("#intolerances-select").val(), $("#intolerances-select option:selected").text(), "#specific-needs-items-display", "#intolerances-select", intolerancesArray, "intolerances Array", "intolerancesArray");
});