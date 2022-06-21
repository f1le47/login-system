import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
})

const auth = {
  async login(email, password) {
    const data = await instance.post('/login', {
      email,
      password
    })
    return data.data
  },
  async me() {
    try {
      const data = await instance.get('/refresh')
      console.log(data)
      return data
    } catch(e) {
      return {
        status: e.request.status
      }
    }
  },
  async logout() {
    const data = await instance.post('/logout')
    return data
  },
  async registration(email, password) {
    const data = await instance.post('/registration', {
      email,
      password
    })
    return data
  }
}

export default auth