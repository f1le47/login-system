import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Navbar.module.scss'

const Navbar = ({isAuth}) => {

  if (!isAuth) {
    return <></>
  }

  return (
    <div className={s.navbar}>
      <NavLink to='/' className={s.navbar__logo}>F1le47</NavLink>
      <div className={s.navbarLinks}>
        <NavLink to='/posts' className={({isActive}) => (isActive ? `${s.navbarLinks__link} ${s.navbarLinks__link_active}` : `${s.navbarLinks__link}`) }>Посты</NavLink>
      </div>
    </div>
  )
}

export default Navbar