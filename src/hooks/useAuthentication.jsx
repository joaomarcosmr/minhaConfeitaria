import { useEffect, useState } from "react"
import { db } from '../firebase/config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    // registro de conta
    const createUser = async(data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.senha
            )
    
            await updateProfile(
                user,
                { displayName: data.nome }        
            )
    
            setLoading(false)
            return user
        } catch (error) {
            console.log(error.message)
            let systemErrorMessage;

            if (error.message.includes("Password")) {
              systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("email-already")) {
              systemErrorMessage = "E-mail já cadastrado.";
            } else {
              systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }
      
            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    // Login da conta
    const signIn = async(data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {
            const user = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.senha
            )

            setLoading(null)
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("invalid-login-credentials")) {
                systemErrorMessage = "Usuário ou senha incorreto"; 
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
    }
    useEffect(() => {
        return () => setCancelled(true)
      }, [])

      return{
        auth,
        createUser,
        error,
        loading,
        signIn
     }
}