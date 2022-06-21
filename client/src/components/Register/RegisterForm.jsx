import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import s from './RegisterForm.module.scss'

const RegisterForm = ({registrationThunk}) => {

  const {values, errors, handleSubmit, handleChange, handleBlur, isSubmitting, isValidatting, touched} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Некорректный e-mail').required('Это поле обязательно'),
      password: yup.string().max(32, 'Максимальное количество символов - 32').min(6, 'Минимальное количество символов - 6').required('Это поле обязательно')
    }),
    onSubmit: () => {
      registrationThunk(values.email, values.password)
    }
  })

  return <div className={s.full}>
    <form onSubmit={handleSubmit} className={s.form}>
    <input
      className={s.formInput}
      placeholder='Введите e-mail'
      name='email'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
      id={s.firstInput}
      type="text" />
    { touched.email && errors.email && <span className={s.textError}>{errors.email}</span> }
    <input
      className={s.formInput}
      placeholder='Введите пароль'
      name='password'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
      type="password" />
    { touched.password && errors.password && <span className={s.textError}>{errors.password}</span> }
    <button type='submit' disabled={!!isValidatting || !!isSubmitting} className={s.formBtn}>Зарегистрироваться</button>
    <span className={s.regBtn}>Уже есть аккаунт? <a href="/login" className={s.regBtnLink}>Войдите</a></span>  
  </form>
  </div>
}

export default RegisterForm