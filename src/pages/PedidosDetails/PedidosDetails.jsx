import React from 'react'
import style from './PedidosDetails.module.css'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useEffect, useState } from 'react'
import { useAuthValue } from '../../context/authContext'

const PedidosDetails = () => {

const { id } = useParams()
const { user } = useAuthValue()
const { document: pedidos } = useFetchDocument('pedidos', id)
const { loading, error } = useAuthentication
const { updateDocument, response } = useUpdateDocument('pedidos')
const navigate = useNavigate()

  return (
    <div className={style.pedidos}>
      <div className={style.pedidos_head}>
          <h3>(botao de voltar) Nome do Produto</h3>
            <Link to='edit'><button className='btn'>Editar</button></Link>
      </div>
      <div className={style.pedidos_details_section}>
            <div className={style.container}>
                <div className={style.form}>
                    <h3>Detalhes do Cliente</h3><br/>
                    <form>
                        {pedidos &&
                        <>
                            <label>
                                <span>Nome do Cliente</span>
                                <input type="text"className={style.input_form} disabled defaultValue={pedidos.nomeCliente}/>
                            </label>
                            <label>
                                <span>Telefone</span>
                                <input type="text" className={style.input_form} disabled placeholder='Insumo' defaultValue={pedidos.telefoneCliente}/>
                            </label>
                            <label><br/>
                                <span>E-mail</span>
                                <input type="text" className={style.input_form} disabled defaultValue={pedidos.emailCliente}/>
                            </label><br/>
                            <label>
                                <span>Descrição do pedido</span>
                                <input type="text" className={style.input_form} disabled defaultValue={pedidos.descricaoPedido}/>
                            </label>
                        </>
                        }
                    </form>
                </div>
            </div>
        </div>
        <div className={style.pedidos_details_section}>
            <div className={style.container}>
                <div className={style.form}>
                    <h3>Detalhes da Massa</h3><br/>
                    <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Produto Usado</th>
                                    <th>Peso Usado na Receita</th>
                                    <th>Preço Médio</th>
                                </tr>
                            </thead>
                            <tbody>
                            {pedidos && pedidos.ingredientesDaMassa.map((ingrediente, index) => (
                                <tr key={index}>
                                    <td>
                                        <select disabled>
                                            <option>{ingrediente.produto}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" disabled defaultValue={ingrediente.quantidade}/>
                                    </td>
                                    <td>
                                        <span disabled>R$ {ingrediente.preçoDeCustoReceita}</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
        <div className={style.pedidos_details_section}>
            <div className={style.container}>
                <div className={style.form}>
                    <h3>Detalhes do Recheio</h3><br/>
                    <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Produto Usado</th>
                                    <th>Peso Usado na Receita</th>
                                    <th>Preço Médio</th>
                                </tr>
                            </thead>
                            <tbody>
                            {pedidos && pedidos.length > 0 ? (pedidos.ingredientesDoRecheio.map((ingrediente, index) => (
                                <tr key={index}>
                                <td>
                                    <select disabled>
                                        <option>{ingrediente.produto}</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="number" disabled defaultValue={ingrediente.quantidade}/>
                                </td>
                                <td>
                                    <span disabled>R$ {ingrediente.preçoDeCustoReceita}</span>
                                </td>
                            </tr>
                            ))) : (
                                <div className={style.produtos_nao_cadastrados}>
                                    <span>Não foram cadastrados ingredientes nessa sessão</span>
                                </div>
                            )}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
        <div className={style.pedidos_details_section}>
            <div className={style.container}>
                <div className={style.form}>
                    <h3>Detalhes da Cobertura</h3><br/>
                    <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Produto Usado</th>
                                    <th>Peso Usado na Receita</th>
                                    <th>Preço Médio</th>
                                </tr>
                            </thead>
                            <tbody>
                            {pedidos && pedidos.length > 0 ? (pedidos.ingredientesDaCobertura.map((ingrediente, index) => (
                                <tr key={index}>
                                <td>
                                    <select disabled>
                                        <option>{ingrediente.produto}</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="number" disabled defaultValue={ingrediente.quantidade}/>
                                </td>
                                <td>
                                    <span disabled>R$ {ingrediente.preçoDeCustoReceita}</span>
                                </td>
                            </tr>
                            ))) : (
                                <div className={style.produtos_nao_cadastrados}>
                                    <span>Não foram cadastrados ingredientes nessa sessão</span>
                                </div>
                            )}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
        <div className={style.pedidos_details_section}>
            <div className={style.container}>
                <div className={style.form}>
                    <h3>Detalhes Finais</h3><br/>
                    <form>
                    {pedidos &&
                    <>
                        <label>
                            <span>Preço Cobrado</span>
                            <input type="text"className={style.input_form} disabled defaultValue={pedidos.preçoFinalPedido}/>
                        </label>
                        <label>
                            <span>Preço Frete</span> 
                            <input type="text" className={style.input_form} placeholder='Insumo' disabled defaultValue={pedidos.preçoFinalPedido}/>
                        </label>
                        <label><br/>
                            <span>Preço Mão de Obra</span>
                            <input type="text" className={style.input_form} disabled defaultValue={pedidos.preçoFinalPedido}/>
                        </label><br/>
                        <label>
                            <span>Lucro Total</span>
                            <input type="text" className={style.input_form} disabled defaultValue={pedidos.preçoFinalPedido}/>
                        </label>
                    </>
                    }
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PedidosDetails