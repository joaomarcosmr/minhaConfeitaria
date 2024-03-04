import React from 'react'
import style from './PedidosDetails.module.css'
import { Link } from 'react-router-dom'

const PedidosDetails = () => {
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
                        <label>
                            <span>Nome do Cliente</span>
                            <input type="text"className={style.input_form}/>
                        </label>
                        <label>
                            <span>Telefone</span>
                            <input type="text" className={style.input_form} placeholder='Insumo'/>
                        </label>
                        <label>
                            <span>E-mail</span>
                            <input type="text" className={style.input_form}/>
                        </label><br/>
                        <label>
                            <span>Descrição do pedido</span>
                            <input type="text" className={style.input_form}/>
                        </label>
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
                                {/* DA PRA FAZER UM MAP COM UMA VARIAVEL QUE AUMENTA CADA VEZ QUE CLICA NO BOTAO, SE ELA AUMENTAR SIGNIFICA UM NOVO TD PRA TABELA */}
                                <tr>
                                    <td>
                                        <select>
                                            <option>Óleo de Soja</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" />
                                    </td>
                                    <td>
                                        <span>R$ </span>395.78
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select>
                                            <option>Óleo de Soja</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" />
                                    </td>
                                    <td>
                                        <span>R$ </span>395.78
                                    </td>
                                </tr>
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
                                {/* DA PRA FAZER UM MAP COM UMA VARIAVEL QUE AUMENTA CADA VEZ QUE CLICA NO BOTAO, SE ELA AUMENTAR SIGNIFICA UM NOVO TD PRA TABELA */}
                                <tr>
                                    <td>
                                        <select>
                                            <option>Óleo de Soja</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" />
                                    </td>
                                    <td>
                                        <span>R$ </span>395.78
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select>
                                            <option>Óleo de Soja</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" />
                                    </td>
                                    <td>
                                        <span>R$ </span>395.78
                                    </td>
                                </tr>
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
                                {/* DA PRA FAZER UM MAP COM UMA VARIAVEL QUE AUMENTA CADA VEZ QUE CLICA NO BOTAO, SE ELA AUMENTAR SIGNIFICA UM NOVO TD PRA TABELA */}
                                <tr>
                                    <td>
                                        <select>
                                            <option>Óleo de Soja</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" />
                                    </td>
                                    <td>
                                        <span>R$ </span>395.78
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select>
                                            <option>Óleo de Soja</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" />
                                    </td>
                                    <td>
                                        <span>R$ </span>395.78
                                    </td>
                                </tr>
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
                        <label>
                            <span>Preço Cobrado</span>
                            <input type="text"className={style.input_form}/>
                        </label>
                        <label>
                            <span>Lucro Total</span>
                            <input type="text" className={style.input_form} placeholder='Insumo'/>
                        </label>
                        <label>
                            <span>E-mail</span>
                            <input type="text" className={style.input_form}/>
                        </label><br/>
                        <label>
                            <span>Descrição do pedido</span>
                            <input type="text" className={style.input_form}/>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PedidosDetails