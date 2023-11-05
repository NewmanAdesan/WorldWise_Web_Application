

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

 
