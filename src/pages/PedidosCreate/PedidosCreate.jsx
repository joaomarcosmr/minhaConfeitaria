import React from 'react'
import { useState, useEffect } from 'react'
import style from './PedidosCreate.module.css'
import { Link } from 'react-router-dom'
import { useDocuments } from '../../hooks/useDocuments'
import { useAuthValue } from '../../context/authContext'

const PedidosCreate = () => {
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [descricao, setDescricao] = useState('')
    const [quantidadeMassa, setQuantidadeMassa] = useState(0)
    const [quantidadeRecheio, setQuantidadeRecheio] = useState(0)
    const [quantidadeCobertura, setQuantidadeCobertura] = useState(0)
    const [ingredienteMassa, setIngredienteMassa] = useState([])
    const [ingredienteRecheio, setIngredienteRecheio] = useState([])
    const [ingredienteCobertura, setIngredienteCobertura] = useState([])
    const [countMassa, setCountMassa] = useState(1)
    const [countRecheio, setCountRecheio] = useState(1)
    const [countCobertura, setCountCobertura] = useState(1)
    const [itemSelecionado, setItemSelecionado] = useState([])

    const { user } = useAuthValue()
    const uid = user.uid
    const { documents: produtos, loading, error } = useDocuments('produtos')

    const salvarProdutos = (e) => {
        console.log(e.target.value)
    }

    const delProdutos = () => {

    }

    const adicionarIngrediente = () => {
        setIngredienteMassa([...ingredienteMassa, { produto: '', quantidade: quantidadeMassa }]);
        setQuantidadeMassa(0);
    };

      const handleProduto = (produtoSelecionado, quantidade) => {
        // toda vez que alterar ele vai passar por essa função, o objetivo vai ser que ele pegue os dados do objeto produto.produto armazene em uma variavel, falando o preço de custo e definindo o preço médio
        console.log('Produto selecionado:', produtoSelecionado);
        console.log('Quantidade:', quantidade);
        // peguei o nome falta pegar os dados do objeto, (fazer um FOR?)
      };

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
                                <tr key={index}>
                                    <td>
                                        <select onChange={(e) => setProdutoSelecionado(index, e.target.value)}>
                                            {produtos && produtos.map((produto) => (
                                                produto.uid === uid && (
                                                <option key={produto.id} value={produto.produto}>{produto.produto}</option>
                                            )))}
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" onChange={(e) => setQuantidade(index, e.target.value)}/>
                                    </td>
                                    <td>
                                        <button id='btn-save' onClick={() => handleProduto(ingredienteMassa[index].produtoSelecionado, ingredienteMassa[index].quantidade)}>Salvar</button>
                                        <button id='btn-del' onClick={() => delProdutos()}>Excluir</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={style.adicionar_pedido}>
                            <button onClick={() => adicionarIngrediente()}>Adicionar Ingrediente</button>
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
                                {/* {renderizarItens(countRecheio, setProdutoRecheio)} */}
                            </tbody>
                        </table>
                        <div className={style.adicionar_pedido}>
                            <span>Valor total</span>
                            <button onClick={() => setCountRecheio(countRecheio + 1)}>Adicionar Ingrediente</button>
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
                                {/* {renderizarItens(countCobertura, setProdutoCobertura)} */}
                            </tbody>
                        </table>
                        <div className={style.adicionar_pedido}>
                            <span>Valor total</span>
                            <button onClick={() => setCountCobertura(countCobertura + 1)}>Adicionar Ingrediente</button>
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
                            <input type="text" className={style.input_form}/>
                        </label>
                        <label>
                            <span>Custo de Embalagem</span>
                            <input type="text" className={style.input_form}/>
                        </label>
                        <label>
                            <span>Custos Fixos Cadastrados</span>
                            <input type="text" className={style.input_form}/>
                        </label>
                    </form>
                </div>
            </div>
            <div className={style.adicionar_pedido}>
                <span>Valor total</span>
                <button>Alterar</button>
            </div>
        </div>
    </div>
  )
}

export default PedidosCreate