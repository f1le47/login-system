import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
})

instance.interceptors.request.use( (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

const postsAPI = {
  async getPosts() {
    const postsData = await instance.get('/posts')
    return postsData
  },
  async makePost(title, content) {
    const posts = await instance.post('/post', {
      title,
      content
    })
    return posts
  },
  async deletePost(postId) {
    const posts = await instance.delete(`/post/${postId}`)
    return posts
  },
  async editPost(postId, title, content) {
    const posts = await instance.put(`/post`, {
      postId,
      title,
      content
    })
    return posts
  }
}

export default postsAPI