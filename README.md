# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Project Lessons
Routing (basics)
    - [IDEA] with routing, we match different URL with different UI VIEWS. this matching is called "ROUTES"
    - [FUNCTIONALITY] routing enables users to navigate different application screens using the browser
    - [USECASE] routing is used for building SPA's (single page application)
        - single page application are applications that are executed entirely on the browser
        - single page application depend heavily on the routing concept; using javascript to change the browser URL & then the browser DOM therefore no reload occurs. 
        - single page application makes a web app feel like a native desktop app or mobile app.






Routing with react router
    [STEP1 - CREATING ROUTES] 
        - in the root of our application we specify the matching btw URL & UI VIEWS(component)
        - therefore when users change the browser URL, the corresponding component displays.
            ```jsx
            function app(){
                ...
                return (
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element='<HomePage>' />
                            <Route path='/product' element='<Product>' />
                        </Routes>
                    </BrowserRouter>
                )
            }
            ```

    [STEP2 - CREATING ROUTE LINKS] 
        - create links in UI VIEWS to direct user to another UI VIEW/URL
        - similar to the way anchor tags work, we utilize the LINK OR NAVLINK COMPONENT
        - you can either use a set of LINK COMPONENTS or a set of NAVLINK COMPONENT
                ```jsx

                ...
                return (
                    <nav>
                        <ul>
                            <li><Link to='/product'>Product</Link></li>
                            <li><Link to='/home'>Home</Link></li>
                        </ul>
                    </nav>
                )

                ```
        - the advantage of using the NAVLINK COMPONENT is that react-router adds the 'active class' to the link element that correspondes to the active UI VIEW.
        - this is useful when you want to attach a special styling to the class that is active.






Nested Route 
    - we need nested route when a part of the user interface of our page component (UI VIEW) is to be controlled by a part of the URL
    - think of this matching; "./app" --> <HomePage />
    - then in our HomePage Component, we would render other componenets but two will be mutually exclusive. the Cities & Country component
    - we want the Cities component to display when the URL is "./app/cities"
    - we want the Countries coomponent to display when the URL is "./app/countries"

    [STEP1 - CREATING THE NESTED ROUTE]
        @App.jsx
            ...
            <Route path='/' element={<HomePage />}>
                <Route path='cities' element={<Cities />} />
                <Route path='countries' element={<Countries>}>
            </Route>


    [STEP2 - CREATING THE NESTED ROUTE LINKS]
        @HomePage.jsx
            ...
            <nav>
                <ul>
                    <li><NavLink to='cities'>Cities</NavLink></li>
                    <li><NavLink to='countries'>Countries</NavLink></li>
                </ul>
            </nav>
            ...


    [STEP3 - SPECIFY THE POSITION OF THE NESTED ROUTE UI]
        @HomePage.jsx
            ...
            <nav>...</nav>
            <Outlet />
            ...

    - intrisically the `Cities & Countries Component` was passed to the `HomePage Component`
    - then the HomePage Component was told when to display which based on the browser URL






Index Route 
    - think of a route (`.../app` --> `<HomePage />`)
    - think of this route having 2 nested routes 
    - (`.../app/cities` --> `<Cities />`) 
    - (`.../app/countries` --> `<Countries />`)

    - now if the browser URL is set at `.../app`, which of the two components will be displayed?
    - we may need a way to set it so that one of the components will be displayed by default.
    - this is where `INDEX ROUTE` comes in by using the `INDEX PROPERTY` which will replace the `PATH PROPERTY`
        @App.jsx
            ...
            <Route path='/' element={<HomePage />}>
                <Route index element={<Cities />} />
                <Route path='cities' element={<Cities />} />
                <Route path='countries' element={<Countries>}>
            </Route>

    - we can even specify a default route for our application
        @App.jsx
            ...
            <Routes>
                <Route index element='<HomePage>' />
                <Route path='/' element='<HomePage>' />
                <Route path='/product' element='<Product>' />
            </Routes>






URL STATE
    - we can store data in the URL such that the corresponding component will render based on the value in the URL
    - we can do this in two ways by 'URL PARAMETERS' & 'URL SEARCH QUERRIES'

    - URL PARAMETERS 
        - think of a Route whose url is '.../app/cities/:city' which renders the 'City Component'
        - the keyword 'city' in the url is a parameter that can be anything '.../app/cities/Lisbon', '.../app/cities/London'
        - the concept of url parameters leads to dynamic routing
        - the 'City Component' can then obtain the value that corresponds to the city parameter & render based on that value

        [STEP1 - CREATE THE ROUTE ]
            <Route path='cities/:id' element={<City>}>

        [STEP2 - CREATE THE ROUTE LINK]
            // this component must already be located in the cities route
            <NavLink to='54456'>...</NavLink>

        [STEP3 - USE THE URL PARAMETER]
            import {useParams} from 'react-router-dom'
            
            function City() {
                const {id} = useParams();
                return <>{id}</>
            }



    - URL SEARCH QUERRIES
        - think of a Route that needs an object of information i.e keys & values i.e {data1=value1, data2=value2}
        - whats more interesting is that we can read and write this object of information from/into a route URL
        - '.../app/product?data1=value1&data2=value2'

            [STEP1 - CREATE THE ROUTE ]
                <Route path='cities/:id' element={<City>}>

            [STEP2 - CREATE THE ROUTE LINK ADDING A QUERY]
                <NavLink to='54456?lat=43.5&lng=34.56'>...</NavLink>

            [STEP3 - USE AND PROCESS THE QUERY IN ANY COMPONENT (YOU CAN CHANGE THE QUERY PROGRAMMATICALLY)]
                import {useSearchParams} from 'react-router-dom'
                
                function City() {
                    const [searchParams, setSearchParams] = useSearchParams();
                    const lat = searchParams.get("lat");
                    const lng = searchParams.get("lng");
                    return <button onClick={()=>{setSearchParams({lat: 34.5, lng: 23.4})}}>{lat}</button>
                }

    - WHY URL STATE
        - Global State: easily store state in a global place that is accessible to all components in the App, unlike the PROP DRILLING TECHNIQUE
        - Page Communication: a good way to pass data from one page into the next page
        - Page Bookmark: makes it possible to bookmark & share the page with the exact UI state it had at the time.






Programmatic Navigation

    THE IDEA
        - with the advent of Route, when the browser url is changed by the user, another page displays, a new UI VIEW
        - with the advent of Route, when a link is clicked, another page displays, a new UI VIEW
        - so far routing is based on user interaction. 
        - routing without user interaction is called PROGRAMMATIC NAVIGATION

        - with react router dom, 2 way to achieve programmatic navgation
        - programmatic navigation with the "useNavigate hook"
        - programmatic navigation with the "Navigate Component"


    THE USECASE
        - to navigate to a specific url (url navigation)
        - to navigate back & forth in the url visitation history like the browser "->" & "<-" buttons (url visitation history navigation)


    PROGRAMMATIC NAVIGATION WITH useNavigate HOOK

        URL Navigation
            [Step1 - Create the Route]
                <Route path="form" element={<Form />} />

            [Step2 - Obtain the Navigating Function from the useNavigate Hook]
                const navigate = useNavigate();

            [Step3 - Navigate to the Route]
                <div onClick={()=>navigate("form")}></div>

        URL Visitation History Navigation

            [Step3 - Navigate Back]
                



    PROGRAMMATIC NAVIGATION WITH Navigate Component
        - this is basically the functionality of the useNavigate hook encapsulated in a component.
        - it is useful in situations where you can't use the navigating function coming from the useNavigate hook
        - although it is not in so much use anymore, one usecase is in the concept of Nested Route, it is used to specify the default route

        function App(){
            ...
            return (
                ...
                <Route path="app" element={<AppLayout>}>
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route path="cities" element={<CityList />} />
                    <Route path="countries" element={<CountryList />} />

                    // old version -- <Route index element={<CityList />} />
                    // new version -- <Route index element={<Navigate replace to="cities" />} />
                </Route>
            )
        }

        - do you notice the subtle Optimization btw the old & new version? the App Component does not create the CityList component twice.






STYLING OPTIONS IN REACT APPLICATIONS

|Styling Options | Where? | How? |  Scope | Based On
| inline CSS | JSX element | style prop | Jsx element | CSS
| CSS or Sass file | Extenal file | className prop | Component | CSS
| CSS Modules | One Extenal file per component | className prop | Component | CSS
| CSS-in-JS| External file or Component file | Creates new Component | Component | Javascript
| Utility first CSS (tailwind) | JSX element | className prop | JSX element | CSS
| UI Component (materialUI) | Component File | Imported Component | Component | JSX






USING CSS MODULES
    BASICS
        - styles rules for classes are written in an external file which are only applied to a component
        - such that the styles rules for a class is contextual
            @PageNav.module.css
                ...
                .p{
                    color: white;
                }

            @PageNav.jsx
                import styles from "./PageNav.module.css"
                ...
                <p className={styles.p}>...</p>
                ...

        - using css modules, when components are rendered, the classes on the html element are suffixed with an ID defining its context.
        - you can prevent the ID attachment functionality by using the 'global pseudo-selector'. this means the class would in effect be global

            @PageNav.module.css
                ...
                :global(.test) {
                    ...
                }

            @PageNav.jsx
                ...
                <p className={styles.test}>...</
                ...
        - this global pseudo-selector is useful when you need to style a class that is provided by external sources
          like the 'active' class that react-router attaches to the link element corresponding to the UI view that is currently displayed

            @PageNav.module.css
                .nav :global(.active) {
                    ...
                }





THE CONTEXT API SYSTEM

    IDEA
        - the context api is a system to pass data through the app WITHOUT MANUALLY PASSING PROPS DOWN THE TREE
        - a system that allows us BROADCAST STATE to the decendants of a component

        - Three Major Factors of Context API
            - The Value: data that we want available usually a state & state update function 
            - The Provider: a react component that gives its children component & their descendant access to a value
            - The Consumer: all component that reade the provided context value
        
        - when the value in the Provider get updated/changed; only the consumers of that value gets re-rendered


    BASIC IMPLEMENTATION
        [Step1 - Create the Context]
            const valueContext = createContext();

        [Step2 - Create the Value]
            function Parent(){
                const [value, setValue] = useState(5);
            }

        [Step3 - Create the Provider]
            function Parent(){
                ...
                return (
                    <valueContext.Provider value={{value, setValue}}>            
                    </valueContext.Provider>
                )
            }

        [Step4 - Specify the Consumers]
            <valueContext.Provider>
                <Child1 />
                <Child2 />
            </valueContext.Provider>

        [Step5 - Consume the Context Value]
            function Child1() {
                const {value, setValue} = useContext(valueContext);
                return <button onClick={()=>setValue(2)}>{value}</button>
            }


    PRACTICAL IMPLEMENTATION
        - in practice, 
        - we encapsulate the context provision in a CUSTOM COMPONENT
        - we wncapsulate the context consumption in a CUSTOM HOOK

        [Step1 - Encapsulate Context Provision and Consumption]
            @valueContextProvider.jsx
                const valueContext = createContext();

                function valueContextProvider({children}){
                    const [value, setValue] = useState(5);
                    return (
                        <valueContext.Provider value={{value, setValue}}>  
                            {children}
                        </valueContext.Provider>
                    )
                }

                function useValueContext() {
                    const contextData = useContext(valueContext);
                    if (contextData === undefined) Throw Error("The Component Trying to consume the 'valueContext' is not a descendant of the 'valueContextProvider Component'");
                    return contextData;
                }

                export {valueContextProvider, useValueContext}

        [Step2 - Specify the Consumers]
            @Parent.jsx
                function Parent(){
                    return(
                        <valueContextProvider>
                            <Child1 />
                            <Child2 />
                        </valueContextProvider>
                    )
                }

        [Step3 - Consume the Context Value]
            @Child1.jsx
                function Child(){
                    const {value, setValue} = useContext(valueContext);
                    return <button onClick={()=>setValue(2)}>{value}</button>
                }


    CONTEXT-VALUES & USE-EFFECT
        - When working with React and managing state across components, 
          it's important to understand the intricacies of using context values 
          and their impact on useEffect dependencies.

        - Have a look at this example
            ...
            const {valueA, valueB} = useCitiesContext();

            useEffect(()=>{
                if (valueA===5) console.log("five");
                else console.log("not five");
            }, [valueA])
        
          in the case valueB changes, the useEffect should not run but it will
          this is because the function useCitiesContext returns a new object & actually valueA & valueB changes.



    END-NOTE
        - we can create as many context as we want in our application 
          and place them wherever we want in the component tree.
          this allows for new and interesting ways of managing state.

        - the big advantage of using Context API apart from having clean code is having INDEPENDENT COMPONENT, MORE REUSABLE COMPONENT.
          were our components do not need props to be passed to them anymore.





THINKING IN REACT: ADVANCED STATE MANAGEMENT

    INTRO
        - state management is about giving each piece of state the right home

    TYPES OF STATE
        BY ACCESSIBILITY (LOCAL & GLOBAL STATE)
            - LOCAL STATE
            - needed by one or few components.
            - only accessible in component and child component.

            - GLOBAL STATE
            - might be needed by many components.
            - accessibie to every component in the application.

        BY DOMAIN (REMOTE & UI STATE)
            - REMOTE STATE
            - state whose information is loaded from a remote server.
            - works asynchronously.
            - may need re-fetching plus updating 
              therefore in a large scale application, remote state should be cached, revalidated & so on

            - UI STATE
            - state whose information IS NOT loaded from a remote server. but stored in the application files
            - works synchronously

    STATE PLACEMENT OPTIONS
        Where|Tools|When to use
        Local Component | useState, useReducer, useRef | Local State
        Parent Component | useState, useReducer, useRef | Lifting State Up
        Context | context api + useState, useReducer | Global State (preferable ui state), excessive prop drilling
        3rd-Party Library | redux, react querry, swr, zustand | Global State (remote OR ui state)
        Url | react router | Global State (passing data between pages)
        Browser Storage | Local Storage, Session Storage | Storing Data in User's Browser

    STATE MANAGEMENT TOOLS
                 | LOCAL STATE | GLOBAL STATE
        UI STATE | useState, useReducer, useRef | context api + useState/useReducer, redux/zustand/recoil, react router
        REMOTE STATE| fetch + useEffect + useState/useReducer | context api + useState/useReducer, redux/zustand/recoil, react querry/swr/rtk query

