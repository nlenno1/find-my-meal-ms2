// My Supplies Modal Control //

const mySupplesArray = [];

// Add item button functionality //
$(".add-button").click(function() {
        //store input value as variable //
        let ingredient = ($("#ingredient-name").val())
        console.log (ingredient)
        
        // control conditional to avoid adding a empty value //
        if (ingredient.length == 0) {
            // empty value user feedback //
            alert("Please enter an ingredient name");
        } else {
            // user feedback //
            alert(ingredient + " added to Your Supplies");
            // add user input to supplies array //
            mySupplesArray.push(ingredient);
            // display full array on console //
            console.log(mySupplesArray);
            
            // add new element to designated display area //
            $(".my-supplies-display").append(
                `<div class="ingredient-added"> 
                    <p> ${ingredient} </p>
                    <button type="button" class="btn-close" aria-label="Remove Item"></button>
                </div>`
            );

            // clear input value for next ingredient //
            $("#ingredient-name").val() = "";
        }
   });
