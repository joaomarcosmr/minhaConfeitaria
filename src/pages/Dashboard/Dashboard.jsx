import React from 'react'
import style from './Dashboard.module.css'
import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/authContext'

const Dashboard = () => {

  const { user } = useAuthValue()

  return (
    <div className={style.dashboard}>
      <div className={style.dashboard_head}>
        <h3>Olá {user.displayName.split(' ')[0]}, seja bem-vindo(a)! 	&#128075;</h3>
        <Link to='criar'><button className='btn'>Fazer Orçamento</button></Link>
      </div>

      <div className={style.info_dash}>
        <div className={style.compras}>
          <h3>Total de Despesas</h3>
          <p><span>R$ </span>3.17</p>
        </div>
        <div className={style.pedidos}>
          <h3>Total de Pedidos</h3>
          <p><span>R$ </span>300.17</p>
        </div>
        <div className={style.lucro}>
          <h3>Total de Lucro</h3>
          <p><span>R$ </span>300.17</p>
        </div>
      </div>

      <div className={style.last_buy}>
        <h3>Últimas Compras feitas:</h3>
        <table>
          <thead className={style.tr2}>
            <tr>
              <th>Produto</th>
              <th>Último Preço de Custo</th>
              <th>Data de Compra</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Oléo de Soja</td>
              <td>1000 <span>ml</span></td>
              <td>1230 <span>ml</span></td>
            </tr>
            <tr className={style.tr2}>
              <td>Trigo</td>
              <td>1000 <span>g</span></td>
              <td>4350 <span>ml</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard