import React from 'react'
import styles from './SideBar.module.css'

// Hooks
import { Link } from 'react-router-dom'
import { useAuthValue } from '../context/authContext'

const SideBar = () => {

    const { user } = useAuthValue()

  return (
    <div className={styles.sidebar}>
        <ul>
            <Link to='/dashboard'>
                <li>
                    <span>Dashboard</span>
                </li>
            </Link>
            <Link to='/insumos'>
                <li>
                    <span>Produtos</span>
                </li>
            </Link>
            <Link to='/pedidos'>
                <li>
                    <span>Pedidos</span>
                </li>
            </Link>
            {!user && <Link to='/login'>
                <li>
                    <span>Login</span>
                </li>
            </Link>}
            {!user && <Link to='/criar'>
                <li>
                    <span>Criar Conta</span>
                </li>
            </Link>}
        </ul>
    </div>
  )
}

export default SideBar