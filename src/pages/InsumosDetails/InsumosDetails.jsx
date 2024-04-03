import style from './InsumosDetails.module.css'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useEffect } from 'react'
import { useAuthValue } from '../../context/authContext'

const InsumosDetails = () => {

const { id } = useParams()
const { user } = useAuthValue()
const { document: insumo } = useFetchDocument('produtos', id)
const { loading, error } = useAuthentication
const { updateDocument, response } = useUpdateDocument('produtos')
const navigate = useNavigate()

  return (
    <div className={style.insumos}>
      <div className={style.insumos_head}>
          <h3>(botao de voltar) Nome do Produto</h3>
            <Link to='edit'><button className='btn'>Editar</button></Link>
      </div>
      <div className={style.insumo_details_section}>
            <div className={style.container}>
                <div className={style.text_info}>
                    <h3>Dados do Produto</h3>
                    <p>O Preço Médio de Custo do seu produto é calculado a partir do peso dele. Então, isso significa que toda vez que ele for utilizado em receitas será contabilizado a partir do custo de R$ por G/ML.</p>
                </div>
                <div className={style.form}>
                    <form>
                        {insumo &&
                        <>
                            <label>
                                <span>Nome do Produto</span>
                                <input type="text"className={style.input_form} defaultValue={insumo.produto}/>
                            </label>
                            <label>
                                <span>Tipo de Produto</span>
                                <input type="text" className={style.input_form} placeholder='Insumo' defaultValue={insumo.tipoProduto}/>
                            </label>
                            <label>
                                <span>Peso da Embalagem</span>
                                <input type="text" className={style.input_form} defaultValue={insumo.pesoEmbalagem}/>
                            </label><br/>
                            <label>
                                <span>Último Preço de Compra</span>
                                <input type="text" className={style.input_form} defaultValue={insumo.preçoCompra}/>
                            </label>
                            <label>
                                <span>Preço Médio por Unidade de Medida</span>
                                <input type="text" className={style.input_form} defaultValue={insumo.preçoMedio}/>
                            </label>
                            <label>
                                <span>Estoque Atual Baseado no Peso</span>
                                <input type="text" className={style.input_form} placeholder='10.4 UND' defaultValue={insumo.estoque}/>
                            </label>
                            <div className='container'>
                            <Link to='edit'><button className='btn'>Registrar Vencimento</button></Link>
                            <Link to='edit'><button className='btn'>Cadastrar Compra</button></Link>
                            </div>
                        </>
                        }
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InsumosDetails