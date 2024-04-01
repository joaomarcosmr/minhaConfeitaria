import React from 'react'
import style from './Pedidos.module.css'
import { useAuthValue } from '../../context/authContext'
import { useDocuments } from '../../hooks/useDocuments'
import { Link } from 'react-router-dom'

const Pedidos = () => {

const { user } = useAuthValue()
const uid = user.uid
const { documents: pedido, loading, error } = useDocuments('pedidos')

  return (
    <div className={style.pedidos}>
      <div className={style.pedidos_head}>
          <h3>Pedidos</h3>
          <Link to='criar'><button className='btn'>Adicionar</button></Link>
      </div>

      <div className={style.search}>
        <div className={style.search_container}>
          <input type="text" placeholder="Pesquise os produtos cadastrados"/>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Telefone Cliente</th>
            <th>Preço Cobrado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        {pedido && pedido.map((pedido, index) => (
          pedido.uid === uid && (
          <tr key={pedido.id} className={index % 2 === 0 ? '' : style.tr2}>
            <td>{pedido.nomeCliente}</td>
            <td>{pedido.telefoneCliente}</td>
            <td><span>R$ </span>{pedido.preçoFinalPedido}</td>
            <td><Link to='detalhes'>Detalhes</Link> / <Link>Apagar</Link></td>
          </tr>
        )
        ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default Pedidos