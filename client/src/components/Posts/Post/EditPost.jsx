import { useFormik } from 'formik'
import s from './EditPost.module.scss'

export default function EditPost({title, content, editPostThunk, postId, setEditMode}) {

  const {values, handleSubmit, handleChange} = useFormik({
    initialValues: {
      title: title,
      content: content
    },
    onSubmit: () => {
      editPostThunk(postId, values.title, values.content).then(() => {
        setEditMode(false)
      })
    }
  })

  return <form className={s.form} onSubmit={handleSubmit}>
    <input 
      name="title"
      value={values.title}
      onChange={handleChange}
      className={`${s.form__input} ${s.form__input_title}`}
      type="text" />
    <input 
      name="content"
      value={values.content}
      onChange={handleChange}
      className={`${s.form__input} ${s.form__input_content}`}
      type="text" />
    <div className={s.formBtns}>
      <button type='submit' className={`${s.formBtns__btn} ${s.formBtns__btn_save}`}>Сохранить</button>
      <button onClick={() => setEditMode(prev => !prev)} className={`${s.formBtns__btn} ${s.formBtns__btn_cancel}`}>Отменить</button>
    </div>
  </form>
}