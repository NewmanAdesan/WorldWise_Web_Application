import styles from "./Homepage.module.css";


export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
      </section>
    </main>
  );
}

/**
 * 1) add the "start tracking now" link to the homepage
 * 1a) using react router, it links to the applayout page
 * 1b) add the class "cta" to the Link element
 * 2) add the page navigation to the homepage via the PageNav component
 * 2a) 
 * 
 */

/*
 * we have a nav element which encapsulate and image element & ul element
 * the ul element encapulast 3 li element "pricing", product", "login"
 * the li element encapsulate a NavLink element which redirect TO a specific page.
 * the nav element has the css modules className "styles.nav"
 * the login NavLink has a className "ctaLink"
*/
