import React, { useState } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getPostsThunk, makePostThunk, deletePostThunk, editPostThunk } from '../../reducers/postReducer'
import Post from './Post/Post'
import PostInput from './PostInput/PostInput'
import s from './Posts.module.scss'

const Posts = ({posts, getPostsThunk, makePostThunk, deletePostThunk, editPostThunk, role}) => {

  const [loading, setLoading] = useState(true)



  useEffect(() => {
    async function getPosts() {
      await getPostsThunk()
      setLoading(false)
    }
    getPosts()
  }, [getPostsThunk])

  if (loading) {
    return <div>Loading...</div>
  }

  const isAdmin = (role === 'Admin' ? true : false)

  return <div className={s.posts} style={isAdmin ? {marginBottom: '318px'} : {marginBottom: '0px'}}>
    {posts.map(post => {
      return <Post editPostThunk={editPostThunk} deletePostThunk={deletePostThunk} 
        key={post._id} 
        title={post.title} 
        content={post.content} 
        postId={post._id}
        isAdmin={isAdmin} />
    })}
    <PostInput isAdmin={isAdmin} makePostThunk={makePostThunk} />  
  </div>
}

const mstp = (state) => ({
  posts: state.post.posts,
  role: state.auth.user.role
})

export default connect(mstp, { getPostsThunk, makePostThunk, deletePostThunk, editPostThunk })(Posts)