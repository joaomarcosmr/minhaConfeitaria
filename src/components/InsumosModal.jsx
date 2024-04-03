import React from 'react'
import style from './InsumosModal.module.css'
import { useAuthValue } from '../context/authContext'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useCreateProduct } from '../hooks/useCreateProduct'


const InsumosModal = ({modal, setModal}) => {
    const [produto, setProduto] = useState('')
    const [tipoProduto, setTipoProduto] = useState('')
    const [pesoEmbalagem, setPesoEmbalagem] = useState('')
    const [unidadeMedida, setUnidadeMedida] = useState('')
    const [preçoCompra, setPreçoCompra] = useState('')
    const [preçoMedio, setPreçoMedio] = useState('')
    const [estoque, setEstoque] = useState('')
    const { user } = useAuthValue()
    const { insertDocument, response } = useCreateProduct('produtos')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()     


        insertDocument({
            produto,
            tipoProduto,
            pesoEmbalagem,
            unidadeMedida,
            preçoCompra,
            preçoMedio,
            estoque,
            uid: user.uid,
            createdBy: user.displayName
        })
        
        console.log(response.error)

        navigate('/insumos')
    }

    if(modal){
        return (
            <div className={style.InsumosModal_background}>
                {/* <div className={style.overlay} onClick={()=>setModal(!modal)}></div> */}
                <div className={style.InsumosModal_content}>
                    <div className={style.insumos_title}>
                        <h3>Cadastrar Insumo</h3>
                        <button type="submit" onClick={()=>setModal(!modal)}>x</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Nome do Produto</span>
                            <input 
                                type="text"
                                className={style.input_form} 
                                onChange={(e) => setProduto(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Tipo de Produto</span><br/>
                                <select onChange={setTipoProduto}>
                                    <option value="insumo">Insumo para Produção</option>
                                    <option value="embalagem">Embalagem para Entrega</option>
                                </select>
                        </label><br/>
                        <label>
                            <span>Peso da Embalagem</span>
                            <input 
                                type="text" 
                                className={style.input_form} 
                                placeholder='Se for em KG/L converta para G/ML'
                                onChange={(e) => setPesoEmbalagem(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Unidade de Medida do Peso</span><br/>
                                <select onChange={setUnidadeMedida}>
                                    <option value="gramas">Gramas</option>
                                    <option value="mililitros">Mililitros</option>
                                </select>
                        </label><br/>
                        <label>
                            <span>Último Preço de Compra</span>
                            <input 
                                type="text"
                                className={style.input_form}
                                onChange={(e) => setPreçoCompra(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Preço Médio por Unidade de Medida</span>
                            <input 
                                type="text" 
                                className={style.input_form}
                                onChange={(e) => setPreçoMedio(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Estoque Atual Baseado no Peso</span>
                            <input 
                                type="text" 
                                className={style.input_form} 
                                placeholder='10.4 UND'
                                onChange={(e) => setEstoque(e.target.value)}
                            />
                        </label>
                        {!response.loading && <button className='btn'>Cadastrar</button>}
                        {response.loading && <button className='btn' disabled>Aguarde...</button>}
                        {response.error && <p className='error'>{response.error}</p>}
                    </form>
                </div>
            </div>
        )
    }
}

export default InsumosModal