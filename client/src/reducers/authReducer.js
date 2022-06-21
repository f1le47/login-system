import auth from "../API/auth"

const LOGIN = 'LOGIN'
const ME = 'ME'
const INITIALIZATED = 'INITIALIZATED'
const LOGOUT = 'LOGOUT'
const REGISTRATION = 'REGISTRATION'
 
const initialState = {
  isAuth: false,
  user: {
    email: '',
    id: '',
    isActivated: false,
    role: ''
  },
  initializated: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      localStorage.setItem('accessToken', action.accessToken)
      return {
        ...state,
        isAuth: true,
        initializated: true,
        user: {
          ...state.user,
          email: action.user.email,
          id: action.user.id,
          isActivated: action.user.isActivated,
          role: action.user.role
        }
    }
  }
    case ME: {
      localStorage.setItem('accessToken', action.data.accessToken)
      return {
        ...state,
        isAuth: true,
        initializated: true,
        user: {
          ...state.user,
          email: action.data.user.email,
          id: action.data.user.id,
          isActivated: action.data.user.isActivated,
          role: action.data.user.role
        }
      }
    }
    case INITIALIZATED: {
      return {
        ...state,
        initializated: true
      }
    }
    case LOGOUT: {
      localStorage.removeItem('accessToken', action.accessToken)
      return {
        ...state,
        initializated: true,
        isAuth: false,
        user: {
          ...state.user,
          email: '',
          password: '',
          isActivated: false,
          role: ''
        }
      }
    }
    case REGISTRATION: {
      localStorage.setItem('accessToken', action.data.accessToken)
      return {
        ...state,
        initializated: true,
        isAuth: true,
        user: {
          ...state.user,
          email: action.data.user.email,
          password: action.data.user.password,
          isActivated: action.data.user.isActivated,
          role: action.data.user.role
        }
      }
    }
    default: {
      return state
    }
  }
}

// ACTIONS
export const loginAction = (data) => ({
    type: LOGIN,
    accessToken: data.accessToken,
    user: data.user
  })
const meAction = (data) => {
  return {
    type: ME,
    data
  }
}
const initializatedAction = () => {
  return {
    type: INITIALIZATED
  }
}
const logoutAction = () => {
  return {
    type: LOGOUT
  }
}
const registrationAction = (data) => {
  return {
    type: REGISTRATION,
    data
  }
}

// THUNKS
export const loginThunk = (email, password) => {
  return async (dispatch) => {
    const promise = await auth.login(email, password)
    dispatch(loginAction(promise))
    return promise
  }
}


export const meThunk = () => {
  return async (dispatch) => {
    const data = await auth.me()
    if (data.status === 200) {
      dispatch(meAction(data.data))
    } else {
      dispatch(initializatedAction())
    }
    
  }
}

export const logoutThunk = () => {
  return async (dispatch) => {
    const data = await auth.logout()
    if (data.status === 200) {
      dispatch(logoutAction())
    }
  }
}

export const registrationThunk = (email, password) => {
  return async (dispatch) => {
    const data = await auth.registration(email, password)
    if (data.status === 201) {
      dispatch(registrationAction(data.data))
    }
  }
} 

export default authReducer