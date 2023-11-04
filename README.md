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



Nested Route & Index Route




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


