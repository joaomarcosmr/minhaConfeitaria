import React from 'react'
import style from './Insumos.module.css'
import InsumosModal from '../../components/InsumosModal'
import { useAuthValue } from '../../context/authContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDocuments } from '../../hooks/useDocuments'

const Insumos = () => {
  const [ modal, setModal ] = useState(false)
  const { user } = useAuthValue()
  const uid = user.uid
  const { documents: produtos, loading, error } = useDocuments('produtos')

  return (
    <div className={style.compras}>
      <div className={style.compras_head}>
          <h3>Compras de Insumos</h3>
          <button className='btn' onClick={() => setModal(true)}>Adicionar</button>
      </div>
      <InsumosModal modal={modal} setModal={setModal}/>

      <div className={style.search}>
        <div className={style.search_container}>
          <input type="text" placeholder="Pesquise os produtos cadastrados"/>
        </div>
      </div>

        
      {/* Fazer mensagem que nao tem cadastro ainda */}
      
      <table>
        <thead className={style.tr2}>
          <tr>
            <th>Produto</th>
            <th>Peso Embalagem</th>
            <th>Estoque em Peso</th>
            <th>Último Preço de Custo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos && produtos.map((produto, index) => (
          produto.uid === uid && (
            <tr key={produto.id} className={index % 2 === 0 ? '' : style.tr2}>
            <td>{produto.produto}</td>
            <td>{produto.pesoEmbalagem} <span>{produto.unidadeMedida}</span></td>
            <td>{produto.estoque} <span>{produto.unidadeMedida}</span></td>
            <td><span>R$ </span>{produto.preçoCompra}</td>
            <td><Link to='detalhes'>Detalhes</Link> / <Link>Apagar</Link></td>
            </tr>
          )
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default Insumos