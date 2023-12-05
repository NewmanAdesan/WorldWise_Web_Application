

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

    Summary
        - Remember the '/app' route corresponds to the AppLayout page component, rendering AppNav and SideBar components
        - Create CityList and CountryList Components
        - Set up nested routes in the '/app' route for CityList and CountryList
        - Create a default route in the '/app' route for CityList
        - Configure NavLinks for CityList and CountryList in the AppNav Component
        - Place Outlet for nested routes in the SideBar Component"






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

    Summary
        - Fetch and Display cities from the database into the CityList Component
        - Display Loading Icon to Give Feedback of Fetching Process
        - Display Message to Give Feedback of No City in the database"






 Step 5: Implementing the CountryList Component
    Concept
        - the CountryList Component shows a list of 'CountryItem Component'.
        - the CountryList Component render a CountryItem Component for each country in the database.
        - the CountryItem Component show 2 things about a country
            - the flag emoji of the country, 
            - name of the country,

    Implementation
        - the App Component passes the 'cities state' & 'isLoading state' as props to the 'CountryList Component'
        - the CountryList Component renders a Spinner Icon if isLoading is true
        - the CountryList Component renders a Message Component to alert the user when no city is in the database
        - we wll obtain all the countries from the cities state using the reduce function
        - the CountryList Component renders a ul element & renders a CountryItem Component for each country.
        - the CountryItem Component renders a li element which encapsulate 2 items
            - a span element for the flag emoji
            - a h3 element for the country name

    Summary
        - Fetch & Process cities data to obtain all distinct countries.
        - Display each Country in the CountryList Component
        - Display Loading Icon to Give Feedback of Fetching Process
        - Display Message to Give Feedback of No City in the database"






 Step 5: Refactoring the state placement of cities-related-state: Utilizing the Context Api
    Concept
        - all state related to the cities remote state will be removed from the app component and placed in a context called CitiesContext.
        - the App Component children will be set as consumers of this context. 
        - with this in place, descendants of the App Component can use state related to the cities state without prop-drilling.

    Implementation
        - create the 'context folder' in 'src folder'
        - create the 'CitiesContext jsx file' in the 'context folder'.
        - utilizing the context api concept setup a 'CitiesContext component' for context provision, providing the cities & isLoading state.
        - utilizing the context api concept setup a 'useCitiesContext hook' for context consumption.
        - the 'CitiesContext jsx file' exports the 'CitiesContext component' & 'useCitiesContext hook'
        - the App Component imports the 'CitiesContext component', making it encapsulate the BrowserRouter component
        - the 'CityList component' & 'CountryList component' no longer needs prop drilling
        - the 'CityList component' & 'CountryList component' will consume the city context using the 'useCitiesContext hook'







 Step 6: The City information component

     Feature StoryLine
        - we have the 'cities route' (/app/cities) which corresponds to the 'CityList component'
        - we have the 'countries route' (/app/countries) which corresponds to the 'CountryList componenet'
        - we have the dynamic 'city route' (/app/cities/id) which corresponds to the 'City componenet'. it has a dynamic parameter called 'id'
        - in the CityList component we have 'CityItem component' for each city.
        - clicking on the CityItem component navigates to the city route, passing the id of the city that was clicked to the 'id parameter' of the city route
        - in the City component, the value of the id parameter is obtained then via an http request, the city information corresponding to that id is fetched.
        - the city information fetched is used to render the city component.
        - navigating back to the cities route, the CityItem component corresponding to the last view city information will be highlighted

    Concept
        - basically our implementation will be in 4 steps
            - Dynamic Navigation: the CityItem navigates to the dynamic city route passing the city id.
            - Data Fetching: the City component fetches the city information.
            - Back Navigation: the City Compoent render a back button that goes back to the previous route.
            - City Hightlight: the CityList Component has to have access to the last viewed city so that the city item that corresponds to this city becomes highlighted.

        - Dynamic Navigation:
            - the CityItem component is a react router Link
            - the to property specify the id of the city in the route
        - Data Fetching:
            - the functionality to fetch city data is specified by the 'getCity function'
            - the 'getCity function' will be placed in the CitiesContext
            - the city information gotten will be placed in a new state the 'currentCity state'
            - the 'currentCity state' will also be placed in the
        - Back Navigation
            - the city component has a button with an onclick functionality that navigates back to the route that led to it.
        - City Hightlighting
            - the CityItem component has a class to highlight it that conditionally displays
            - the highlight class displays when the city id of the CityItem component equals the city id of the currentCity state.

    Implementation
        - THE CITIESCONTEXT COMPONENT
        - in the CitiesContext component, create the getCity function. it has an'id paramter'
        - the getCity function is an asynchronous function and is encapsulate in a try/catch block
        - in the try block
            - set the isLoading state to true.
            - fetch the city information based on the id using the API url
            - place the city information in the currentCity state
            - edge case: no such city in the database, create an error state & set the state to the string "City Does not Exist in the database"
        - in the catch block, set the error state to the string "Error Occurred Whilst Fetcing City Data"
        - in the finally block, set the isLoading state to false
        - in the CitiesContext, add 'the getCity function', 'the currentCity state' & 'the error state' to the context value object.

        - THE CITY COMPONENT
        - in the City Component use the useParams hook to get the value of the id url parameter.
        - in the City component, consume the citiesContext to get 4 items 'currentCity state', 'isLoading state', 'error state' & 'getCity function'
        - in the City Component, via the useEffect hook, call the getCity function with the value of the id.
        - in the City component, if isLoading state is true, render the Spinner component.
        - in the City component, if currentCity state is empty and error state not empty, render the Message component whose message prop references the error string.
        - create a Button Component. it has 2 custom props 'type' & 'handleClick'. it renders a button element. button element has 2 classNames; 'btn' and the value of the type props. the button onClick attribute is the value of handleClick prop.
        - in the City Component, render the back button using Button Component. the text is 'Back'. the type prop is 'back'. the handleClick prop needs the functionality of programmatic navigation
        - in the City component, use the useNavigate hook to get the navigate function.
        - in the City component, in the Back Button Component, in the handleClick, utilise the navigation function to navigate to the url before the current url.

        - THE CITYITEM COMPONENT
        - in the CityItem Component, consume the citiesContext to get the 'currentCity state'
        - in the CityItem Component conditionally display the 'cityItem-active class' in the NavLink on the condition that the 'id property of the city prop' of the CityItem Component equals to the id key of the currentCity state.







 Step 7: Setting up the Map UI using the Leaflet & React-Leaflet Library

 CONCEPT
    - leaflet is an open-source JavaScript library for mobile-friendly interactive maps
    - react-leaflet is an open-source react library that binds leaflet functionalities into a react component
 
 IMPLEMENTATION
    - first include leaflet custom css with the @import directive
    - next as per the react-leaflet documentation, use the components Mapcontainer, TileLayer, Marker, PopUp to set up the interactive map in your map component
    - create a state 'mapPosition' which is initiall [40, 0]
    - set the center of the map to the 'mapPosition state' value
    - place a marker at the mapPosition state
    - instead of using the default openstreetmap by the url 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' & attribution '', we will use openstreetmap with Tiles courtesy of Humanitarian OpenStreetMap Team (HOT) just because hot version uses a color code with is similar to the color code of our application. hot url is 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png' and the attribution is '&copy; OpenStreetMap contributors | Tiles courtesy of Humanitarian OpenStreetMap Team'
    -  change the zoom level to 9







 Step 8: Display Location Marker for Each City on the Map
    Concept
        - using the Marker component provided by react-leaflet, 
        - we can place a mark on a specific location & specify a pop-up when the mark is hovered/click
        - all we need is the Marker component, PopUp component, the latitude & longitude of the city

    Implementation
        - in Map.jsx
        - obtain the cities data from the CitiesContext via the useCitiesContext hook
        - for each city render a Marker in the Map Container. 
        - in the Marker Component is the PopUp Component which rendereds 2 span element the city emoji & the city name




 Step 9: Interacting with the Map UI
    Concept
        - for now, there would be 2 main interactions with Map.
        - Map_Fly_To interaction
        - Map_Click interaction
        
        - Map_Fly_To interaction 
            - when a cityItem in the cityList is clicked to view the City Information of that city, 
            - the Map UI centers at that city's location.
            - thus we need information to pass between the cityItem UI & the Map UI
            - the Map UI is a sibling to the ancestor of the cityItem UI
            thus in terms of state management we have two options 'context-state' or 'url-state'
            - we will use url-state such that when the cityItem is clicked, it places the lat & lng of the city in the URL.
            - this way the Map Component can obtain the value of the lat & lng from the url & synchronise it with its mapPosition state which then instruct the Map Container to be centered at that location
            - as per the react-leaflet & leaflet documentation to change the center we have to encapsulate this functionality in a Component then add this component as a child of the MapContainer component.

        - Map_Click interaction
            - when any part of the Map is clicked,
            - on the sidebar UI, a form appears in the place of the CityList/CountryList UI. 
            - this means we have an additional nested route in the app route which is the 'Form Route' (/app/form)
            - we would querry the map for the lat & lng of the location that was just clicked
            - then we would route the application to the 'Form Route' adding the data of the lat & lng to the url so that the form component can process it.
            - we cannot use the native click event handler because we need the map to tell us where exactly was clicked (lat/lng) thus we fall back to the documentation.


    Implementation
        - The Map_Fly_To Interation
        - the cityItem Component is a navlink which intitially refers to '/app/cities/{id}'. change this to '/app/cities/{id}?lat={lat}&lng={lng}'
        - where id, lat & lng corresponds to the city detail of the cityItem
        - in the Map Component obtain the lat & lng data from the URL into the variables 'mapLat' & 'mapLng'
        - setup a useEffect hook dependent on mapLat & mapLng. in the hook, if mapLat & mapLng have values that is a number, set the mapPosition state to their values (Numeric)
        - create a functional component called ChangeCenter 
        - in ChangeCenter we have just a 'position paremeter' which signifies [lat, lng].
        - in ChangeCenter we use 'useMap hook' by react-leaflet to obtain an object that signifies the map container 
        - in ChangeCenter we call the 'setView method' on that object passing the position to it. 
        - in the ChangeCenter we return null.
        - in the MapContainer Component, under the Marker Component we place the ChangeCenter Component so our functionality can run.

        - The Map_Click interaction
        - in the Map Component,
        - create a functional component called DetectClick. this is where how functionality of specifying a click event handler for the map will lie.
        - utilize the useMapEvent hook by react-leaflet to specify a click event handler.
        - an options object is passed to the useMapEvent hook.
        - in the options object is a function called click(e).
        - in the click function we would specify our click event functionality
        - in the click function we obtain the lat & lng of the clicked position & we programmatically navigate to the Form route placing the lat & lng information in the URL
        - in the DetectClick we return null.
        - in the MapContainer Component, under the Marker Component we place the DetectClick Component so our functionality can run.
        











 


 
