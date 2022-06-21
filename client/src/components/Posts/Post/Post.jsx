import React from 'react'
import { useState } from 'react'
import EditPost from './EditPost'
import s from './Post.module.scss'

const Post = ({title, content, postId, deletePostThunk, isAdmin, editPostThunk}) => {

  const [editMode, setEditMode] = useState(false)


  
  return <div>
    {editMode ? <EditPost setEditMode={setEditMode} postId={postId} editPostThunk={editPostThunk} title={title} content={content} /> : (<div className={s.post}>
    <h1 className={s.post__title}>{title}</h1>
    <p className={s.post__content}>{content}</p>
    {isAdmin ? (<button onClick={() => setEditMode(prev => !prev)} className={s.post__editBtn}>Редактировать</button>) : <div></div>}
    {isAdmin ? (<button className={s.post__deleteBtn} onClick={() => {
      deletePostThunk(postId)
    }}>Удалить</button>) : <div></div>}
  </div>)}
  </div>
}

export default Post