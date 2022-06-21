import postsAPI from "../API/posts"

const GET_POSTS = 'GET_POSTS'
const SET_POSTS = 'SET_POSTS'

const initialState = {
  posts: []
}

const postsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_POSTS: {
      return {
        ...state,
        posts: [
          ...action.posts.reverse()
        ]
      }
    }
    case SET_POSTS: {
      return {
        ...state,
        posts: [
          ...action.posts.reverse()
        ]
      }
    }

    default: {
      return state
    }
  }
}

const getPostsAction = (posts) => ({
  type: GET_POSTS,
  posts
})
const setPostsAction = (posts) => {
  debugger
  return {
    type: SET_POSTS,
    posts
  }
}

export const makePostThunk = (title, content) => {
  return async (dispatch) => {
    const posts = await postsAPI.makePost(title, content)
    if (posts.status === 200) {
      dispatch(setPostsAction(posts.data))
    }
  }
}
export const getPostsThunk = () => {
  return async (dispatch) => {
    const postsData = await postsAPI.getPosts()
    if (postsData.status === 200) {
      dispatch(getPostsAction(postsData.data))
    }
    return postsData
  }
}
export const deletePostThunk = (postId) => {
  return async (dispatch) => {
    const posts = await postsAPI.deletePost(postId)
    if (posts.status === 200) {
      dispatch(setPostsAction(posts.data))
    }
  }
}
export const editPostThunk = (postId, title, content) => {
  return async (dispatch) => {
    const posts = await postsAPI.editPost(postId, title, content)
    if (posts.status === 200) {
      dispatch(setPostsAction(posts.data))
    }
    return posts
  }
}

export default postsReducer