import React from 'react'
import { connect } from 'react-redux'
import RegisterForm from './RegisterForm'
import { Navigate } from 'react-router-dom'
import { registrationThunk } from '../../reducers/authReducer'


const Register = ({isAuth, registrationThunk}) => {

    if (isAuth) {
      return <Navigate to='/' />
    }
  return <div>
    <RegisterForm registrationThunk={registrationThunk} />
  </div>
}

const mstp = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(mstp, {registrationThunk})(Register)