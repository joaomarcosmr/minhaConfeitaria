import React, { useState } from 'react'
import style from './Login.module.css'
import { useAuthentication } from '../../hooks/useAuthentication'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const { signIn, loading, error } = useAuthentication()

  const handleSubmit = async(e) => {
    e.preventDefault()

    const data = {
      email,
      senha
    }

    const user = await signIn(data)
  }

  return (
    <div className={style.login}>
      <div className={style.title}>
        <h1>Entre na sua conta</h1>
        <p>Preencha seus dados</p>
      </div>
      <div className={style.login_container}>
        <form className={style.form_login} onSubmit={handleSubmit}>
          <label>
            <span>E-mail: </span>
            <input
              type="email"
              name="email"
              placeholder='E-mail do Usuário'
              required
              value={email} onChange={(e) => setEmail(e.target.value)}
              />
          </label>
          <label>
            <span>Senha: </span>
            <input
              type="password"
              name="password"
              placeholder='Sua senha'
              required
              value={senha} onChange={(e) => setSenha(e.target.value)}
              />
          </label>
          <button className={style.btn_login}>Entrar</button>
          {/* {loading && <button className='btn' disabled>Aguarde...</button>}
          {error && <p className='error'>{error}</p>} */}
        </form>
      </div>
  </div>
  )
}

export default Login