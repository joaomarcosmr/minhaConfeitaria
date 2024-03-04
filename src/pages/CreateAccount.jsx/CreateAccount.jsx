import React, { useState } from 'react'
import style from './CreateAccount.module.css'
import { useAuthentication } from '../../hooks/useAuthentication'

const CreateAccount = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [confirmaEmail, setConfirmaEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const { createUser, loading, error: userError } = useAuthentication()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')

    if(error !== ''){
      return
    }

    if(email === confirmaEmail && senha === confirmaSenha){
      const data = {
        nome: nome,
        email: email,
        senha: senha
      }
        
      const { user } = await createUser(data)

      if(user){
        setMessage('Sua conta foi criada com sucesso!')
        return user
      }

    } else {
      setError('Usuário ou senha não coincidem')
    }
  }

  return (
    <div className={style.registrar}>
      <div className={style.title}>
        <h1>Crie uma conta nova</h1>
        <p>Preencha seus dados</p>
      </div>
      <div className={style.registrar_container}>
        <form className={style.form_registrar} onSubmit={handleSubmit}>
        <label>
            <span>Seu nome completo: </span>
            <input
              type="text"
              name="nome"
              placeholder='Seu nome completo'
              required
              value={nome} onChange={(e) => setNome(e.target.value)}
              />
          </label>
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
            <span>Confirme seu e-mail: </span>
            <input
              type="email"
              name="email"
              placeholder='E-mail do Usuário'
              required
              value={confirmaEmail} onChange={(e) => setConfirmaEmail(e.target.value)}
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
          <label>
            <span>Repita sua senha: </span>
            <input
              type="password"
              name="password"
              placeholder='Repita a senha'
              required
              value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)}
              />
          </label>
          <button className={style.btn_registrar}>Registrar sua conta</button>
          {/* {loading && <button className='btn' disabled>Aguarde...</button>} */}
          {error && <p className='error'>{error}</p>}
          {message && <p className='success'>{message}</p>}
        </form>
      </div>
    </div>
  )
}

export default CreateAccount