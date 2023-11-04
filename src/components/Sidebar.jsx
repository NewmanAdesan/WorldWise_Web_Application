import React from 'react'
import styles from './Sidebar.module.css'
import Logo from './Logo.jsx'
import AppNav from './AppNav.jsx'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <Logo />
        <AppNav />
        <p>List of Cities</p>
        <footer className={styles.footer}>
            <p className={styles.copyright}>&copy; Copyright 2023 by WorldWise Inc.</p>
        </footer>
    </div>
  )
}

export default Sidebar