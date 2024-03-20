import React from 'react'
import { useState, useEffect } from 'react'
import style from './PedidosCreate.module.css'
import { Link } from 'react-router-dom'
import { useDocuments } from '../../hooks/useDocuments'
import { useAuthValue } from '../../context/authContext'

const PedidosCreate = () => {

    const [salvo, setSalvo] = useState(false)
    const [editando, setEditando] = useState(false)
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [itemSelecionado, setItemSelecionado] = useState('')
    const [descricao, setDescricao] = useState('')
    const [errorSalvar, setErrorSalvar] = useState('')
    const [quantidadeMassa, setQuantidadeMassa] = useState(0)
    const [maoDeObra, setMaoDeObra] = useState(0)
    const [custoEmbalagem, setCustoEmbalagem] = useState(0)
    const [idMassa, setIdMassa] = useState(0)
    const [idRecheio, setIdRecheio] = useState(0)
    const [idCobertura, setIdCobertura] = useState(0)
    const [ingredienteMassa, setIngredienteMassa] = useState([{id: idMassa, produto: '', quantidade: 0, preçoDeCustoReceita: 0, salvo: false }])
    const [ingredienteRecheio, setIngredienteRecheio] = useState([{id: idRecheio, produto: '', quantidade: 0, preçoDeCustoReceita: 0, salvo: false }])
    const [ingredienteCobertura, setIngredienteCobertura] = useState([{id: idCobertura, produto: '', quantidade: 0, preçoDeCustoReceita: 0, salvo: false }])

    const { user } = useAuthValue()
    const uid = user.uid
    const { documents: produtos, loading, error } = useDocuments('produtos')

    const massa = 'massa';
    const cobertura = 'cobertura'
    const recheio = 'recheio'
    
    const adicionarIngrediente = (sessao) => {
        if(sessao == massa){
            const todosSalvos = ingredienteMassa.every(item => item.salvo);
            if (todosSalvos === true && !editando){
                setIngredienteMassa([...ingredienteMassa, {id: idMassa, produto: '', quantidade: 0, preçoDeCustoReceita: 0, salvo: false }]);
                setItemSelecionado('')
                setQuantidadeMassa(0);
                setErrorSalvar('')
            } else {
                setErrorSalvar('É necessário salvar o ingrediente primeiro')
            }
        } else if(sessao == recheio){
            const todosSalvos = ingredienteRecheio.every(item => item.salvo);
            if (todosSalvos === true && !editando){
                setIngredienteRecheio([...ingredienteRecheio, {id: idRecheio, produto: '', quantidade: 0, preçoDeCustoReceita: 0, salvo: false }]);
                setItemSelecionado('')
                setQuantidadeMassa(0);
                setErrorSalvar('')
            } else {
                setErrorSalvar('É necessário salvar o ingrediente primeiro')
            }
        } else if(sessao == cobertura){
            const todosSalvos = ingredienteCobertura.every(item => item.salvo);
            if (todosSalvos === true && !editando){
                setIngredienteCobertura([...ingredienteCobertura, {id: idCobertura, produto: '', quantidade: 0, preçoDeCustoReceita: 0, salvo: false }]);
                setItemSelecionado('')
                setQuantidadeMassa(0);
                setErrorSalvar('')
            } else {
                setErrorSalvar('É necessário salvar o ingrediente primeiro')
            }
        }
    };

    const handleProduto = (sessao, index) => {
        if(sessao == massa){
            const insumoCadastrado = produtos.find(produto => {
                return uid === produto.uid &&  itemSelecionado === produto.produto
            })
    
            if (!insumoCadastrado) {
                console.error("Produto não encontrado!");
                return;
            }
    
            const preçoPorInsumo = (quantidadeMassa * insumoCadastrado.preçoCompra) / insumoCadastrado.pesoEmbalagem
    
            const updatedIngredienteMassa = [...ingredienteMassa];
                updatedIngredienteMassa[index] = {
                    id: idMassa,
                    produto: itemSelecionado,
                    quantidade: quantidadeMassa,
                    preçoDeCustoReceita: preçoPorInsumo,
                    salvo: true,
            };
    
            setEditando(false)
            setIngredienteMassa(updatedIngredienteMassa)
            setIdMassa(idMassa + 1)
            setErrorSalvar('')
        } else if(sessao == cobertura){
            const insumoCadastrado = produtos.find(produto => {
                return uid === produto.uid &&  itemSelecionado === produto.produto
            })
    
            if (!insumoCadastrado) {
                console.error("Produto não encontrado!");
                return;
            }
    
            const preçoPorInsumo = (quantidadeMassa * insumoCadastrado.preçoCompra) / insumoCadastrado.pesoEmbalagem
    
            const updatedIngredienteCobertura = [...ingredienteCobertura];
                updatedIngredienteCobertura[index] = {
                    id: idCobertura,
                    produto: itemSelecionado,
                    quantidade: quantidadeMassa,
                    preçoDeCustoReceita: preçoPorInsumo,
                    salvo: true,
            };
    
            setEditando(false)
            setIngredienteCobertura(updatedIngredienteCobertura)
            setIdCobertura(idCobertura + 1)
            setErrorSalvar('')
        } else if(sessao == recheio){
            const insumoCadastrado = produtos.find(produto => {
                return uid === produto.uid &&  itemSelecionado === produto.produto
            })
    
            if (!insumoCadastrado) {
                console.error("Produto não encontrado!");
                return;
            }
    
            const preçoPorInsumo = (quantidadeMassa * insumoCadastrado.preçoCompra) / insumoCadastrado.pesoEmbalagem
    
            const updatedIngredienteRecheio = [...ingredienteRecheio];
                updatedIngredienteRecheio[index] = {
                    id: idRecheio,
                    produto: itemSelecionado,
                    quantidade: quantidadeMassa,
                    preçoDeCustoReceita: preçoPorInsumo,
                    salvo: true,
            };
    
            setEditando(false)
            setIngredienteRecheio(updatedIngredienteRecheio)
            setIdRecheio(idRecheio + 1)
            setErrorSalvar('')
        }
    };

    const editProduto = (ingrediente, sessao, index) => {
        if(sessao == massa){
            const todosSalvos = ingredienteMassa.every(item => item.salvo);

            if(todosSalvos){
                setItemSelecionado(ingrediente.produto)
                setQuantidadeMassa(ingrediente.quantidade)
    
                const updatedIngredienteMassa = [...ingredienteMassa];
                updatedIngredienteMassa[index] = {
                    id: idMassa,
                    produto: itemSelecionado,
                    quantidade: quantidadeMassa,
                    preçoDeCustoReceita: 0,
                    salvo: false,
                };
    
                setIngredienteMassa(updatedIngredienteMassa)
                setEditando(true)
            }
        } else if (sessao == recheio){
            const todosSalvos = ingredienteRecheio.every(item => item.salvo);

            if(todosSalvos){
                setItemSelecionado(ingrediente.produto)
                setQuantidadeMassa(ingrediente.quantidade)
    
                const updatedIngredienteRecheio = [...ingredienteRecheio];
                updatedIngredienteRecheio[index] = {
                    id: idRecheio,
                    produto: itemSelecionado,
                    quantidade: quantidadeMassa,
                    preçoDeCustoReceita: 0,
                    salvo: false,
                };
    
                setIngredienteRecheio(updatedIngredienteRecheio)
                setEditando(true)
            }
        } else if (sessao == cobertura){
            const todosSalvos = ingredienteCobertura.every(item => item.salvo);

            if(todosSalvos){
                setItemSelecionado(ingrediente.produto)
                setQuantidadeCobertura(ingrediente.quantidade)
    
                const updatedIngredienteCobertura = [...ingredienteCobertura];
                updatedIngredienteCobertura[index] = {
                    id: idCobertura,
                    produto: itemSelecionado,
                    quantidade: quantidadeMassa,
                    preçoDeCustoReceita: 0,
                    salvo: false,
                };
    
                setIngredienteCobertura(updatedIngredienteCobertura)
                setEditando(true)
            }
        }

    }

    const delProdutos = (ingrediente, sessao) => { 
        if(sessao == massa){
            const novoArray = ingredienteMassa.filter(item => item !== ingrediente);
            setIngredienteMassa(novoArray);
        } else if(sessao == recheio){
            const novoArray = ingredienteRecheio.filter(item => item !== ingrediente);
            setIngredienteRecheio(novoArray);
        } else if (sessao == cobertura){
            const novoArray = ingredienteCobertura.filter(item => item !== ingrediente);
            setIngredienteCobertura(novoArray);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div className={style.criar_pedido}>
        <div className={style.criar_pedidos_head}>
          <h3><Link to=''>(seta pra trás)</Link> Crie um Novo Pedido</h3>
          <Link to=''><button className='btn'>Salvar Pedido</button></Link>
        </div>

        {/* SESSÃO DE CLIENTE */}
        <div className={style.criar_pedido_section}>
            <div className={style.container}>
                <div className={style.text_info}>
                    <h3>Cliente</h3>
                    <p>Faça o cadastro do seu cliente, coloque o máximo de informações possível. Caso não tenha todos os dados, pode deixar o campo em branco.</p>
                </div>
                <div className={style.form}>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Nome</span>
                            <input type="text"className={style.input_form} onChange={(e) => setNome(e.target.value)}/>
                        </label>
                        <label>
                            <span>Telefone</span>
                            <input type="text" className={style.input_form} onChange={(e) => setTelefone(e.target.value)}/>
                        </label><br/>
                        <label>
                            <span>E-mail</span>
                            <input type="text" className={style.input_form} onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                        <label>
                            <span>Descrição do pedido</span>
                            <textarea rows="5" placeholder='Descreva o pedido em ate 100 caracteres' className={style.input_form} onChange={(e) => setDescricao(e.target.value)}></textarea>
                        </label>
                    </form>
                </div>
            </div>
        </div>

        {/* SESSÃO DE MASSA */}
        <div className={style.criar_pedido_section}>
            <div className={style.container}>
                <div className={style.text_info}>
                    <h3>Massa</h3>
                    <p>Coloque os ingredientes utilizados e suas proporções, lembre-se que para aparecer os ingredientes aqui você deve cadastra-los na aba Produtos (para saber mais clique aqui)</p>
                </div>
                <div className={style.form}>
                    <form onSubmit={handleSubmit}>
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Produto Usado</th>
                                    <th>Peso Usado na Receita</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredienteMassa.map((ingrediente, index) => (
                                    <tr key={ingrediente.id}>
                                        <td>
                                            {ingrediente && !ingrediente.salvo ?
                                                (<>
                                                    <select onChange={(e) => setItemSelecionado(e.target.value)} defaultValue="">
                                                        <option disabled hidden value="">Selecione um produto</option>
                                                        {produtos && produtos.map((produto) => (
                                                            produto.uid === uid && (
                                                            <option key={produto.id} value={produto.produto}>{produto.produto}</option>
                                                        )))}
                                                    </select>
                                                </>)
                                                :
                                                (<>
                                                    <select onChange={(e) => setItemSelecionado(e.target.value)} defaultValue="">
                                                        <option disabled hidden value="">Selecione um produto</option>
                                                        {produtos && produtos.map((produto) => (
                                                            produto.uid === uid && (
                                                            <option key={produto.id} disabled value={produto.produto}>{produto.produto}</option>
                                                        )))}
                                                    </select>
                                                </>)
                                            }
                                        </td>
                                        <td>
                                        {ingrediente && !ingrediente.salvo ?
                                                (<>
                                                    <input type="number" onChange={(e) => setQuantidadeMassa(e.target.value)}/> <span className='g-ml'>G / ML</span>
                                                </>)
                                                :
                                                (<>
                                                    <input type="number" disabled onChange={(e) => setQuantidadeMassa(e.target.value)}/> <span className='g-ml'>G / ML</span>
                                                </>)
                                            }
                                        </td>
                                        <td>
                                            {ingrediente && !ingrediente.salvo ?
                                                (<>
                                                    <button id='btn-save' onClick={() => handleProduto(massa, index)}>Salvar</button>
                                                    <button id='btn-del' onClick={() => delProdutos(ingrediente, massa)}>Excluir</button>
                                                </>)
                                                :
                                                (<>
                                                    <button id='btn' onClick={() => editProduto(ingrediente, massa, index)}>Editar</button>
                                                    <button id='btn-del' onClick={() => delProdutos(ingrediente, massa)}>Excluir</button>
                                                </>)
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={style.adicionar_pedido}>
                            <button onClick={() => adicionarIngrediente(massa)}>Adicionar Ingrediente</button>
                            {errorSalvar.length > 0 && <p className='error'>{errorSalvar}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
        {/* SESSÃO DE RECHEIO */}
        <div className={style.criar_pedido_section}>
            <div className={style.container}>
                <div className={style.text_info}>
                    <h3>Recheio</h3>
                    <p>Coloque os ingredientes utilizados e suas proporções, lembre-se que para aparecer os ingredientes aqui você deve cadastra-los na aba Produtos (para saber mais clique aqui)</p>
                </div>
                <div className={style.form}>
                    <form onSubmit={handleSubmit}>
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Produto Usado</th>
                                    <th>Peso Usado na Receita</th>
                                    <th>Preço Médio</th>
                                </tr>
                            </thead>
                            <tbody>
                            {ingredienteRecheio.map((ingrediente, index) => (
                                    <tr key={ingrediente.id}>
                                        <td>
                                            {ingrediente && !ingrediente.salvo ?
                                                (<>
                                                    <select onChange={(e) => setItemSelecionado(e.target.value)} defaultValue="">
                                                        <option disabled hidden value="">Selecione um produto</option>
                                                        {produtos && produtos.map((produto) => (
                                                            produto.uid === uid && (
                                                            <option key={produto.id} value={produto.produto}>{produto.produto}</option>
                                                        )))}
                                                    </select>
                                                </>)
                                                :
                                                (<>
                                                    <select onChange={(e) => setItemSelecionado(e.target.value)} defaultValue="">
                                                        <option disabled hidden value="">Selecione um produto</option>
                                                        {produtos && produtos.map((produto) => (
                                                            produto.uid === uid && (
                                                            <option key={produto.id} disabled value={produto.produto}>{produto.produto}</option>
                                                        )))}
                                                    </select>
                                                </>)
                                            }
                                        </td>
                                        <td>
                                        {ingrediente && !ingrediente.salvo ?
                                                (<>
                                                    <input type="number" onChange={(e) => setQuantidadeMassa(e.target.value)}/> <span className='g-ml'>G / ML</span>
                                                </>)
                                                :
                                                (<>
                                                    <input type="number" disabled onChange={(e) => setQuantidadeMassa(e.target.value)}/> <span className='g-ml'>G / ML</span>
                                                </>)
                                            }
                                        </td>
                                        <td>
                                            {ingrediente && !ingrediente.salvo ?
                                                (<>
                                                    <button id='btn-save' onClick={() => handleProduto(recheio, index)}>Salvar</button>
                                                    <button id='btn-del' onClick={() => delProdutos(ingrediente, recheio)}>Excluir</button>
                                                </>)
                                                :
                                                (<>
                                                    <button id='btn' onClick={() => editProduto(ingrediente, recheio, index)}>Editar</button>
                                                    <button id='btn-del' onClick={() => delProdutos(ingrediente, recheio)}>Excluir</button>
                                                </>)
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={style.adicionar_pedido}>
                            <button onClick={() => adicionarIngrediente(recheio)}>Adicionar Ingrediente</button>
                            {errorSalvar.length > 0 && <p className='error'>{errorSalvar}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
        {/* SESSÃO DE COBERTURA */}
        <div className={style.criar_pedido_section}>
            <div className={style.container}>
                <div className={style.text_info}>
                    <h3>Cobertura</h3>
                    <p>Coloque os ingredientes utilizados e suas proporções, lembre-se que para aparecer os ingredientes aqui você deve cadastra-los na aba Produtos (para saber mais clique aqui)</p>
                </div>
                <div className={style.form}>
                    <form onSubmit={handleSubmit}>
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Produto Usado</th>
                                    <th>Peso Usado na Receita</th>
                                    <th>Preço Médio</th>
                                </tr>
                            </thead>
                            <tbody>
                            {ingredienteCobertura.map((ingrediente, index) => (
                                    <tr key={ingrediente.id}>
                                        <td>
                                            {ingrediente && !ingrediente.salvo ?
                                                (<>
                                                    <select onChange={(e) => setItemSelecionado(e.target.value)} defaultValue="">
                                                        <option disabled hidden value="">Selecione um produto</option>
                                                        {produtos && produtos.map((produto) => (
                                                            produto.uid === uid && (
                                                            <option key={produto.id} value={produto.produto}>{produto.produto}</option>
                                                        )))}
                                                    </select>
                                                </>)
                                                :
                                                (<>
                                                    <select onChange={(e) => setItemSelecionado(e.target.value)} defaultValue="">
                                                        <option disabled hidden value="">Selecione um produto</option>
                                                        {produtos && produtos.map((produto) => (
                                                            produto.uid === uid && (
                                                            <option key={produto.id} disabled value={produto.produto}>{produto.produto}</option>
                                                        )))}
                                                    </select>
                                                </>)
                                            }
                                        </td>
                                        <td>
                                        {ingrediente && !ingrediente.salvo ?
                                                (<>
                                                    <input type="number" onChange={(e) => setQuantidadeMassa(e.target.value)}/> <span className='g-ml'>G / ML</span>
                                                </>)
                                                :
                                                (<>
                                                    <input type="number" disabled onChange={(e) => setQuantidadeMassa(e.target.value)}/> <span className='g-ml'>G / ML</span>
                                                </>)
                                            }
                                        </td>
                                        <td>
                                            {ingrediente && !ingrediente.salvo ?
                                                (<>
                                                    <button id='btn-save' onClick={() => handleProduto(cobertura, index)}>Salvar</button>
                                                    <button id='btn-del' onClick={() => delProdutos(ingrediente, cobertura)}>Excluir</button>
                                                </>)
                                                :
                                                (<>
                                                    <button id='btn' onClick={() => editProduto(ingrediente, cobertura, index)}>Editar</button>
                                                    <button id='btn-del' onClick={() => delProdutos(ingrediente, cobertura)}>Excluir</button>
                                                </>)
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={style.adicionar_pedido}>
                            <button onClick={() => adicionarIngrediente(cobertura)}>Adicionar Ingrediente</button>
                            {errorSalvar.length > 0 && <p className='error'>{errorSalvar}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
        {/* DETALHES GERAIS DO BOLO */}
        <div className={style.criar_pedido_section}>
            <div className={style.container}>
                <div className={style.text_info}>
                    <h3>Detalhes Gerais</h3>
                    <p>Reveja todas informaçoes da sua precificação antes de salvar, caso tenha que mudar algo.</p>
                </div>
                <div className={style.form}>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Precifique sua mão de obra</span>
                            <input type="text" className={style.input_form} onChange={(e) => setMaoDeObra(e.target.value)}/>
                        </label>
                        <label>
                            <span>Custo de Embalagem</span>
                            <input type="text" className={style.input_form} onChange={(e) => setCustoEmbalagem(e.target.value)}/>
                        </label>
                        <label className="">
                            <p>Valor total de custo:</p>
                            <input type="text" disabled className={style.input_form_metade} value={massa}/>
                        </label>
                        <label className="">
                            <p>Valor Final para Cliente com Mão de Obra:</p>
                            <input type="text" disabled className={style.input_form_metade} value={massa}/>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PedidosCreate