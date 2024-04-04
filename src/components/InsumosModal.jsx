import React from 'react'
import style from './InsumosModal.module.css'
import { useAuthValue } from '../context/authContext'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useCreateProduct } from '../hooks/useCreateProduct'


const InsumosModal = ({modal, setModal}) => {
    const [produto, setProduto] = useState('')
    const [pesoEmbalagem, setPesoEmbalagem] = useState(0)
    const [unidadeMedida, setUnidadeMedida] = useState('G')
    const [preçoCompra, setPreçoCompra] = useState(0)
    const [estoque, setEstoque] = useState(0)
    const { user } = useAuthValue()
    const { insertDocument, response } = useCreateProduct('produtos')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()

        insertDocument({
            produto,
            unidadeMedida,
            estoque,
            pesoEmbalagem,
            preçoCompra: (preçoCompra).toFixed(2),
            preçoEstoque: pesoEmbalagem * estoque,
            uid: user.uid,
            createdBy: user.displayName
        })
        
        console.log(response.error)

        navigate('/insumos')
    }

    if(modal){
        return (
            <div className={style.InsumosModal_background}>
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
                                placeholder='Ex: Leite Condensado Italac'
                                onChange={(e) => setProduto(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Unidade de Medida do Peso</span><br/>
                                <select onChange={(e) => setUnidadeMedida(e.target.value)} defaultValue="">
                                    <option value="G">Gramas</option>
                                    <option value="ML">Mililitros</option>
                                </select>
                        </label><br/>
                        <label>
                            <span>Quantidade Comprada</span><br/>
                            <input 
                                type="number" 
                                className={style.input_form} 
                                placeholder='Ex: Se você comprou 5 leites, insira 5'
                                onChange={(e) => setEstoque(e.target.value)}
                            />
                        </label><br/>
                        <label>
                            <span>Peso da Embalagem</span>
                            <input 
                                type="number" 
                                className={style.input_form} 
                                placeholder='Ex: Se você comprou 5 leites, insira o peso de 1 leite'
                                onChange={(e) => setPesoEmbalagem(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Último Preço de Compra</span>
                            <input 
                                type="text"
                                className={style.input_form}
                                placeholder='Ex: 3.99 - Utilize o Ponto ao invés da vírgula'
                                onChange={(e) => setPreçoCompra(Number(e.target.value))}
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