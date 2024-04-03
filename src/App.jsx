import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthentication } from './hooks/useAuthentication'
import { AuthProvider } from './context/authContext'

// Components
import Nav from './components/Nav'
import SideBar from './components/SideBar'

// Pages
import Dashboard from './pages/Dashboard/Dashboard'
import Insumos from './pages/Insumos/Insumos'
import Pedidos from './pages/Pedidos/Pedidos'
import PedidosCreate from './pages/PedidosCreate/PedidosCreate'
import InsumosDetails from './pages/InsumosDetails/InsumosDetails'
import PedidosDetails from './pages/PedidosDetails/PedidosDetails'
import CreateAccount from './pages/CreateAccount.jsx/CreateAccount'
import Login from './pages/Login/Login'



function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()
  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <>
    <AuthProvider value={{user}}>
      <BrowserRouter>
        <Nav />
          <div className="app">
            <SideBar />
            <Routes>
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login'/>}/>
              <Route path='/criar' element={!user ? <CreateAccount/> : <Navigate to='/'/>} />
              <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>} />
              <Route path='/insumos' element={user ? <Insumos/> : <Navigate to='/login'/>}/>
              <Route path='/insumos/detalhes/:id' element={user ? <InsumosDetails/> : <Navigate to='/login'/>}/>
              <Route path='/pedidos' element={user ? <Pedidos/> : <Navigate to='/login'/>}/>
              <Route path='/pedidos/criar' element={user ? <PedidosCreate/> : <Navigate to='/login'/>}/>
              <Route path='/pedidos/detalhes/:id' element={user ? <PedidosDetails/> : <Navigate to='/login'/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
