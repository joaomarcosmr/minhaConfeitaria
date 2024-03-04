import React from 'react'
import styles from './Nav.module.css'
import { useAuthValue } from '../context/authContext'
import { Link } from 'react-router-dom'


const Nav = () => {

  const { user } = useAuthValue()

  return (
    <div className={styles.navbar}>
        <div>
            <Link to='/dashboard'><img src="../src/assets/logo.png" alt="" /></Link>
        </div>
        <div className={styles.navuser}>
            {user && 
            <>
              <svg xmlns="http://www.w3.org/2000/svg" height="18" width="16" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg> <a href="#">{user.displayName}</a>
            </>}
        </div>
    </div>
  )
}

export default Nav