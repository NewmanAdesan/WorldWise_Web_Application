

/**
 * 
 * STEP 1: Implement Page Navigation in the Home, Product, Pricing & Login Pages
 * 
 * 1) add the "start tracking now" link to the homepage
 * 1a) using react router, it links to the applayout page
 * 1b) add the class "cta" to the Link element
 * 2) add the page navigation to the homepage via the PageNav component
 * 2a) create the component PageNav
 * 2b) it returns a nav element which encapsulate and Logo Component & ul element
 * 2c) the ul element encapulaste 3 li element "pricing", product", "login"
 * 2d) the li element encapsulate a NavLink element which redirect TO a specific page.
 * 2e) the nav element has the css modules className "styles.nav"
 * 2f) the login NavLink has a className "ctaLink"
 * 2g) add the PageNav component to the HomePage component
 * 2h) encapsulate the PageNav logo in a Link compoment so it redirects to the homepage
 * 3) add the page navigation component to the Pricing, Product & Login page
 */


 Step 2: BareBone Structure of the Application Page
    1) the AppLayout page component encapsulate 2 component, the SideBar Component & the Map Component
    2) Create a SideBar component & add to the AppLayout page component
    2a) it renders a div element with className 'styles.sidebar'
    2b) the div element encapsulate the Logo Component, a AppNav Component, a p tag & a footer element
    2c) add the Logo Component
    2c) Create the AppNav Component which render a nav element which renders a ul element with renders 2 li-NavLink element 'Cities & Countries'
    2d) add the p element whose text content states "List of Cities"
    2e) add the footer element which has a className "styles.footer" and it encapsulate the p element "&copy; Copyright 2023 by WorldWise Inc." with className "styles.copyright"
    3) Create the Map component
    3a) it renders a div element with className 'styles.mapContainer' with a textContent saying 'Map'


 Step 3: Implementing App Navigation in the App Layout page
    Concept
        - the AppLayout page component (.../app) encapsulate 2 component, the SideBar & Map Component
        - the SideBar encapsulate a AppNav Component which renders two NavLinks 'Cities' & 'Countries'
        - this NavLinks should link to the routes '.../app/cities' & '.../app/countries' which would in effect render the `CityList Component` & `CountryList Component` immediately after the AppNav Component.
        - when at route '.../app/cities'; the CityList Component will be rendered immediately after the AppNav Component (default route)
        - conceptually, the two NavLinks are Nested Route Links therefore we have three task
            - Create the Nested Routes
            - Create the Nested Routes Links
            - Specify the position of the Nested Routes UI

    Implementation
        - in the App Component where the Routes are defined; Nest three Routes in the `/app` Route 
        - the first route path is 'cities' and its element is the 'CityList Component'
        - create the CityList Component which will for now render the text 'List of Cities'
        - the second route path is 'countries' and its element is the 'CountryList Component'
        - create the CountryList Component which will for now render the text 'List of Counties'
        - the third route is a default route with utilize the index attribute & element attribute set to 'CityList Component' 
        - in the AppNav Component, specify the `to attribute` of the two NavLinks set to 'cities' & 'countries' 
        - in the `AppLayout Component`, in the SideBar Component, just below the `AppNav Component` place the `Outlet Component`
        - specify the 'cities' route as the default route for the '/app' route using the index attribute


 Step 4: Implementing the CityList Component
    Concept
        - the AppLayout page Component (/app) has 2 navigation links 'Cities' & 'Countries'
        - the Cities Navigation link renders a 'CityList Component' below the navigation links.
        - this CityList Component is associated with the route '/app/cities/
        - the CityList Component shows a list of 'CityItem Component'.
        - the CityList Component render a CityItem Component for each city info in the database.
        - the CityItem Component show 4 things about a city
            - the flag emoji of the city, 
            - name of the city, 
            - the data the city info was added into the database 
            - a delete button to delete the city from the database

    Implementation
        - the App Component will fetch all the cities from the database as object in an array and store them in a 'cities state'.
        - the App Component will also have a 'isLoading state' to keep track of the fetching process.
        - the App Component passes the 'cities state' & 'isLoading state' as props to the 'CityList Component'
        - the CityList Component renders a Spinner Icon if isLoading is true
        - the CityList Component renders a Message Component to alert the user when no city is in the database
        - the CityList Component renders a ul element & renders a CityItem Component for each city.
        - the CityItem Component renders a li element which encapsulate 4 items
            - a span element for the flag emoji
            - a h3 element for the city name
            - a time element for the city entry date
            - a button eleemnt to delete city
        - the 'formatDate Function' is defined & utilize to change the format of the date from '2027-10-31T15:59:59.138Z' to 'October 15 2023'



 


 
