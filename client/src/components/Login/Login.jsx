import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { loginThunk } from '../../reducers/authReducer'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const Login = ({loginThunk, isAuth, initializated, ...props}) => {

    if (isAuth) {
      return <Navigate to='/' />
    }

  if (!initializated) {
    return <div>Loading...</div>
  }

  return <div>
    <LoginForm loginThunk={loginThunk}/>
  </div>
}

const mstp = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(mstp, {loginThunk})(Login)