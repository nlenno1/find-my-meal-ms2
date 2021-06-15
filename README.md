# Find My Meal
![Live Project](URL)

[Link to Live Project](https://nlenno1.github.io/find-my-meal-ms2/)
#
## Contents
1. [Introduction](#introduction)
3. [Development Planes](#development-planes)
    - [Strategy](#strategy)
    - [Scope](#scope)
    - [Structure](#structure)
    - [Skeleton](#skeleton)
4. [Design](#design)
5. [Features](#features)
6. [Technologies Used](#technologies-used)
7. [Search Engine Optimization (SEO)](#search-engine-optimization)
8. [Bugs and Issues](#bugs-and-issues)
9. [Testing](#testing)
    - [Device Testing](#device-testing)
    - [Peer Review Testing](#peer-review-testing)
    - [Browser Testing](#browser-testing)
    - [User Stories Testing](#user-stories-testing)
10. [Validation](#validation)
11. [Deployment](#deployment)
12. [Credits](#credits)
    - [Content](#content)
    - [Acknowledgments](#acknowledgments)

***
## Introduction
This website  is designed using APIs to enable users to find new recipes depending on their circumstances. These can either be for diet, health or enviromental reasons.

To be able to provide this I will use Spoonacular's API.

I decided to build this project as I have an interest in helping others be more enviromentally aware and helping the planet by reducing the amount of food waste that we create and cutting down on meat consumption by trying Vegan alternatives.
I also have friends and family members who either have changed their diet or have allegies/intolerances and this tool would help me cook for them.

This is the second of four Milestone Projects that make up the Full Stack Web Development Program at The Code Institute. The main requirements of this project are to create a responsive website using primarily **HTML5**, **CSS3** and **JavaScript**.

[Back to Contents](#contents)
#

## Development Planes
### Strategy

#### Project Goals
- To help **USERS** find inspiration for new recipes no matter what their preferences or allergies,
- To make it easy for **USERS** to understand, navigate and access all the information they want,
- To present the required data in an easy to read and use format,

#### User Demographic
The target demographics for this website are:
- Ages 16 - 50 years old
- All Genders and Ethnicities
- Both genders
- May have specific dietary or allergy requirements
- Interested in cooking
- Wanting to trying new things
- Open to being more enviromental

#### User Stories
Example User 1 - I am an **enthusiastic cook** looking for new recipe ideas
Example User 2 - I a newly diagnosed as **gluten intolerent** and I need to find some new recipes
Example User 3 - I am cooking for a friend who has **specific dietary needs** and I need to find a recipe
Example User 4 - I am worried about the amount of **food waste produced** and want use up my leftovers in a Meal
Example User 5 - I want to reduce my **enviromental impact** by changing my diet and adding some vegan meals to my diet  

The website needs to enable the **USER** to:
 
- Search for recipes based on:
    - Allergies/Intolerances (nut, gluten intolerances etc)
    - Diet (Vegan, Vegitarian etc)
    - What items they have to reduce their waste
- Search for random recipes to help them get inspiration for new recipes
- Discover the companies social media accounts to recieve notifications about updates, new features and deals.

The website needs to enable the **BUSNINESS** to:

- Develop a fully interactive and engaging platform that users enjoy
- Accredit use of the recipies and APIs as directed in the API documentation
- Create revenue from:
    - Selling access to premium features on the app/website,
    - Linking with supermarkets and stores to help users find the products they need to buy
- Attract new users by making the UI easy to understand and use

#### Strategy Table
I performed an Importance Viability analysis on the **USER** goals and these were the results.
| ID      | Opportunity / Problem / Feature | Importance |	Viability |
| ----------- | ----------- | ----------- | ----------- |
| A      | Allergy/Intolerances Search       | 5       | 5       |
| B   | Diet Search        | 5       | 5       |
| C    | Random Search        | 4       | 5       |
| D    | Encourage social media engagement        | 4       | 5       |


![Importance Viability Graph](assets/readme-assets/importance-viability-graph.png)

[Back to Contents](#contents)
#
### Scope 
In line with the results from the Importance Viability analysis, these are the feature that will be implimented on the first production release.
#### Features
navbar
- About - Link to a modal with instructions on how to use the service and background information
- Recipe finder - A drop down menu to the 3 recipe finders,
- My Supplies - Link to a modal containing a list of the supplies the user has,
    - In this modal the user will be able to add and remove items to use later on,

footer
- Accreditation to Spoonacular API,
- Links to social media accounts,
- Copyright information

index.html
- Logo - to give clear business identity
- Introduction - A breif description on the form of questions of the service provided and how to get started
- Recipe Finder Buttons - 3 buttons to the different recipe finders

lucky-dip.html
- Page title to confirm which service the user has selected
- Random Recipe selected displayed as in recipe.html

zero-waste.html
- Page title to confirm which service the user has selected
- Indredient selector to allow users to add ingredients that they want to search with
- "Use ingredients in My Supplies" check box option for ingredient selector
- Results cards displayed after searching containing Recipe title, the amount of likes the recipe has, the ingreients used from the ingredient selector and the ingredients that are needed to make the recipe

specific-needs.html
- Page title to confirm which service the user has selected
- Dietary Requirements, Intolerances and Allergies drop down menu selectors to allow users to select multiple items
- Results cards displayed after searching containing recipe title and nutritional information

recipe.html
- Displays recipe with:
    - Image 
    - Ingredients list
    - General information:
        - Servings
        - Preparation time
        - Dish type
        - Allergies & Intolerances suitable for
        - Cuisine
        - Health Score
        - Price Per Serving
        - Spoonacular Score
    - Instructions 
    - Credits  
        - Original recipe author
        - Link to the original recipe

My Supplies modal
- Indredient selector to allow users to add ingredients to their supplies
- Display ingredients added to view or allow user to remove

About Modal
- Instructions on how to use the service
- Background information

#### Features for future releases

- Email recipe link to yourself usign EmailJS API
- Add calender event using Google Calender API with a link to the recipe
- Links to supermarkets to display and compare live item prices 
- Automatically generated shopping lists made up of the items you are missing from "My Supplies" 

#### Functionality Requirements

- Easy navigation to the required information
- Quick loading of the website
- Quick response times from the API
- Pagenation when appropriate


[Back to Contents](#contents)
#


### Structure

The website has been designed around a **Tree** structure hierarchy. This reduces the overall complexity of the site which allows users to navigate it easier.

Below is a diagram to better illustrate this structure.

![Website Structure Flow Diagram](assets/readme-assets/findmymeal-website-structure-diagram.png)

- From index.html you can select which recipe finder service you want and you can transition from one service to another.
- Once you make a search using a service the "Search Results" will display on the page that is currently viewed. If you perform another search then these results will be replaces by the new ones.
- When a Search result is selected, recipe-display.html will be called and loaded with the requested information.
- If the user tries to move horizontally on the graph after displaying "Search Results" or loading recipe-display.html then they will lose all retrieved data from the API.

[Back to Contents](#contents)

### Skeleton

Wireframes were created using Figma to aid in the design process. Some design elements have changed during the building process to improve the user experience and functionality of the site

index.html:
![index.html wireframes](assets/readme-assets/index-wireframes-min.png)

lucky-dip.html:
![lucky-dip.html wireframes](assets/readme-assets/lucky-dip-wireframes-min.png)

zero-waste.html:
![zero-waste.html wireframes](assets/readme-assets/zero-waste-wireframes-min.png)

specific-needs.html:
![specific-needs.html wireframes](assets/readme-assets/specific-needs-wireframes-min.png)

recipe-display.html:
![recipe-display wireframes](assets/readme-assets/recipe-display-wireframes-min.png)

Modal Design:
![modal design wireframes](assets/readme-assets/modal-wireframes-min.png)

#### Design

**Colour Scheme**

The main colours used throughout the website _____________________.
I used the original colour of Blue Green (#5C93AE) with the [Color Scheme Designer](http://colorschemedesigner.com/csd-3.5/) to select complimentary colours for this project.

The chosen colour scheme is to give the website a modern, clean and sleek feel that will appeal to the demographic.

**Typography**

This project uses the font Special Elite for headings and _______ for body text.

**Imagery**

The images used are all appropriate to the style of the website and are vibrant and engaging. 
