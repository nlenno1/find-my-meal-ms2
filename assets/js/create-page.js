$(window).ready (function() {
    makePageNavbar();
    makePageModals();
    makePageFooter();
});

function makePageNavbar() {
    $("nav").html(
        `<a class="navbar-brand d-sm-none" href="index.html"><img class="navbar-logo"
                    src="assets/images/find-my-meal-logo.png" alt="Find My Meal Logo"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav justify-content-center">
                    <li class="nav-item d-sm-none d-lg-block">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link navbar-modal-button" data-bs-toggle="modal"
                            data-bs-target="#about-modal">About</button>
                    </li>
                    <li class="nav-item dropdown">
                        <button type="button" class="nav-link navbar-modal-button dropdown-toggle" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Recipe Finders
                    </button>
                        <div class="nav-item dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="lucky-dip.html">Lucky Dip</a>
                            <a class="dropdown-item" href="zero-waste.html">Zero-Waste</a>
                            <a class="dropdown-item" href="specific-needs.html">Specific Needs</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link navbar-modal-button" data-bs-toggle="modal"
                            data-bs-target="#my-supplies-modal">My Supplies</button>
                    </li>
                    <li class="nav-item d-sm-none d-lg-block">
                        <a class="nav-link" href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>`
    )
    console.log("Navbar created")
}

function makePageModals() {
    $("#modals-container").html(
        `<!-- About Modal -->
        <div class="modal fade" id="about-modal" tabindex="-1" aria-labelledby="about-modal-label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="about-modal-label">About</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <h5>Welcome to find my meal, the perfect place to find your culinary challenge. <br>
                    Here at <strong>Find My Meal</strong> we want to help you reduce your waste, cook for any diets or intolerances and trying something new!</h5>
                    <hr>
                    <p>This website can help you find new and exciting recipes in 3 different ways:</p>
                    <ul class="text-start">
                        <li><strong>Lucky Dip</strong> - Try you luck and let us pick a random recipe for you. You never know what might come up</li>
                        <li><strong>Zero-Waste</strong> - Have some ingredients already. Enter what you have and we will find the perfect recipe to use as many ingredients as possible</li>
                        <li><strong>Specific Needs</strong> - Need your recipies to fit a specific diet or allergy. No problem! Just let us know and we will find something for you!</li>
                    </ul>
                    <p>To learn more about a topic just click on it! </p>
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item text-start">
                        <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <strong>My Supplies</strong>
                        </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">My Supplies is a place where you can add what ingredients you normally have and it will save them for when you come back. You can add to them at any tome by click My Supplies.<br> Just type the ingredient name into the box, click and and it will appear. To remove it just click the x next to the ingredient name.</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            <strong>Diets</strong>
                        </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <p>This is a complete list of the Diets this application supports at the moment. If we have missed any then <a href="contact.html">get in touch</a> and let us know.</p>
                            <p>
                                <strong>Gluten Free</strong> <br>
                                Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).
                                <hr>
                                <strong>Ketogenic</strong> <br>
                                The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not.
                                <hr>
                                <strong>Vegetarian</strong> <br>
                                No ingredients may contain meat or meat by-products, such as bones or gelatin.
                                <hr>
                                <strong>Lacto-Vegetarian</strong> <br>
                                All ingredients must be vegetarian and none of the ingredients can be or contain egg.
                                <hr>
                                <strong>Ovo-Vegetarian</strong> <br>
                                All ingredients must be vegetarian and none of the ingredients can be or contain dairy.
                                <hr>
                                <strong>Vegan</strong> <br>
                                No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.
                                <hr>
                                <strong>Pescetarian</strong> <br>
                                Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.
                                <hr>
                                <strong>Paleo</strong> <br>
                                Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.
                                <hr>
                                <strong>Primal</strong> <br>
                                Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.
                                <hr>
                                <strong>Whole30</strong> <br>
                                Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.
                            </p>
                        </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            <strong>Intolerances</strong>
                        </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <ul class="text-start">
                                <li>Dairy</li>
                                <li>Egg</li>
                                <li>Gluten</li>
                                <li>Grain</li>
                                <li>Peanut</li>
                                <li>Seafood</li>
                                <li>Sesame</li>
                                <li>Shellfish</li>
                                <li>Soy</li>
                                <li>Sulfite</li>
                                <li>Tree Nut</li>
                                <li>Wheat</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <!-- My Supplies Modal -->
        <div class="modal fade" id="my-supplies-modal" tabindex="-1" aria-labelledby="my-supplies-modal-label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="my-supplies-modal-label">My Supplies</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-0">
                        <div class="col text-center">
                            <p>This is where you can add the ingredients you already have to save them for searches later on.<br>To add an ingredient, type the name in the box and click add!<hr></p>
                        </div>
                    </div>
                    <div class="row g-0 enter-ingredients">
                        <div class="col-12 col-sm-8">
                            <input type="text" id="ingredient-name" pattern="[a-zA-Z]+" placeholder="Ingredient" >
                        </div>
                        <div class="col-12 col-sm-4">
                            <button type="submit" class="add-button" id="supplies-add-button">Add</button>
                        </div>
                    </div>
                    <div class="row g-0">
                        <div class="col my-supplies-display-container">
                            <div class="my-supplies-display" id="my-supplies-display">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="clear-my-supplies-button" class="btn btn-danger">Clear My Supplies</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>`
    )
    console.log("Modals created")
}

function makePageFooter () {
    $("footer").html(
        `<div class="footer-mask"></div>
        <div class="footer-mask-2"></div>
        <div class="row g-0 footer-background sticky-bottom">
            <div class="col-3 col-sm-4"></div>
            <div class="col-5 col-sm-4 copyright-info">
                <a href="contact.html">Contact the developer</a>
                <p>© Nicholas Lennon</p>
            </div>
            <div class="col-4 powered-by-info">
                <p class="logo-label">Powered by</p>
                <a href="https://spoonacular.com/food-api" target="_blank"><img class="spoonacular-logo"
                        src="assets/images/spoonacular-logo.svg" alt="Spoonacular's Logo"></a>
            </div>
        </div>`
    )
    console.log("Footer created")
}