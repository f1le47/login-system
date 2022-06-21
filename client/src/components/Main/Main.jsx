import React from 'react'
import {connect} from 'react-redux'
import {Navigate} from 'react-router-dom'
import s from './Main.module.scss'
import {logoutThunk} from '../../reducers/authReducer'

const Main = ({isAuth, email, id, isActivated, logoutThunk, role}) => {

  const userName = email.split('@')[0]

  if (!isAuth) {
    return <Navigate to='/login' />
  }

  return <div className={s.main}>
    <h1 className={s.main__title}>Привет, {userName}!</h1>
    <span className={s.main__id}>Вы — {role}</span>
    <span className={s.main__id}>Твой id: {id}</span>
    { isActivated ? (<span className={s.main__confirmed}>E-mail подтвержден</span>)
     : (<span className={s.main__no_confirmed}>Подтвердите e-mail перейдя по ссылке, которую мы отправили Вам на почту</span>) }
    <button onClick={logoutThunk} className={s.main__logout}>Выйти</button>
  </div>
}

const mstp = (state) => {
  return {
    isAuth: state.auth.isAuth,
    email: state.auth.user.email,
    id: state.auth.user.id,
    isActivated: state.auth.user.isActivated,
    role: state.auth.user.role
  }
}

export default connect(mstp, { logoutThunk })(Main)