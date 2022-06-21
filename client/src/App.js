import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Main from './components/Main/Main'
import { meThunk } from './reducers/authReducer'
import Register from './components/Register/Register'
import Navbar from './components/Navbar/Navbar'
import Posts from './components/Posts/Posts';

function App({meThunk, initializated, isAuth}) {


  useEffect(() => {
    meThunk()
  }, [meThunk])

  if (!initializated) {
    return <span>Loading...</span>
  }

  return (
    <div className="App">
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login initializated={initializated}/>} />
        <Route path="/registration" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
}

const mstp = (state) => {
  return {
    isAuth: state.auth.isAuth,
    initializated: state.auth.initializated,
  }
}

export default connect(mstp, { meThunk })(App);
