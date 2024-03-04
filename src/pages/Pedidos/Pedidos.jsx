import React from 'react'
import style from './Pedidos.module.css'

import { Link } from 'react-router-dom'

const Pedidos = () => {
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
         {/* <div>
            <p>Seus Pedidos</p>
            <p>Clientes Cadastrados</p>
         </div> */}
         {/* aqui vai ser um map se a class active estiver no paragrafo acima */}
          <tr>
            <th>Cliente</th>
            <th>Preço Cobrado</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>João Marcos Martins Rosa</td>
            <td><span>R$ </span>395.78</td>
            <td>18/02/2023</td>
            <td><Link to='detalhes'>Detalhes</Link> / <Link>Apagar</Link></td>
          </tr>
        </tbody>
      </table>
      
    </div>
  )
}

export default Pedidos