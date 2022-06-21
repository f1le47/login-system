import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import s from './PostInput.module.scss'

const PostInput = ({makePostThunk, isAdmin}) => {
  const {values, handleSubmit, handleChange, errors} = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    validationSchema: yup.object().shape({
      title: yup.string().max(32, 'Максимальное количество символов в заголовке - 32').required('Поле обязательно'),
      content: yup.string().max(128, 'Максимальное количество символов - 128').required('Поле обязательно')
    }),
    onSubmit: () => {
      makePostThunk(values.title, values.content)
    }
  })

  if (!isAdmin) {
    return <div></div>
  }

  return <div className={s.postInput}>
    <form className={s.form} onSubmit={handleSubmit}>
      <h1 className={s.form__title}>Напишите что-нибудь</h1>
      {errors && <span className={s.form__errors}>{errors.title}</span>}
      <input type="text"
             value={values.title}
             name='title'
             placeholder='Введите заголовок'
             className={errors.title ? `${s.form__input} ${s.form__input_error}` : `${s.form__input}`}
             onChange={handleChange} />
      {errors && <span className={s.form__errors}>{errors.content}</span>}
      <input type="text"
             value={values.content}
             name='content'
             placeholder='Введите текст поста'
             id={s.content}
             className={errors.content ? `${s.form__input} ${s.form__input_error}` : `${s.form__input}`}
             onChange={handleChange} />
      <button type='submit' className={s.form__btn}>Отправить</button>
    </form>
  </div>
}

export default PostInput