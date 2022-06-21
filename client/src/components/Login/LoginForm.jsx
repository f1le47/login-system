import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import s from './LoginForm.module.scss'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({loginThunk, ...props}) => {

  const navigate = useNavigate()

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
      loginThunk(values.email, values.password).then(() => {
        navigate('/', { replace: true })
      })
    }
  })

  return <div className={s.full}>
    <form onSubmit={handleSubmit} className={s.form}>
    <h1 className={s.title}>Авторизируйтесь</h1>
    <input
      className={s.formInput}
      placeholder='Введите e-mail'
      name='email'
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
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
    <button type='submit' disabled={!!isValidatting} className={s.formBtn}>Войти</button>
    <span className={s.regBtn}>Ещё нет аккаунта? <a href="/registration" className={s.regBtnLink}>Зарегистрируйтесь!</a></span>  
  </form>
  </div>
}

export default LoginForm