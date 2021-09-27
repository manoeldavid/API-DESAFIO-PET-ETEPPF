const express = require('express')
const { v4: uuid } = require('uuid')
const morgan = require('morgan')
const server = express()

server.use(morgan('dev'))
server.use(express.json())

/*
    GET: Obtem dados, vai ser a função READ DO CRUD
    POST: Cria dados, vai ser o CREATE DO CRUD
    PUT: Altera dados, vai ser o UPDATE DO CRUD
    DELETE: Apaga dados, vai ser o DELETE DO CRUD
*/

/* Informações para o produto
  produtos: 
    titulo, 
    descrição,
    valor,
    marca, 
    modelo,  
    promocao, 
    estoque, 
*/

const produtos = [
  {
    "id": "1b69aec3-38f8-4767-bfef-3ffac5336833",
    "titulo": "Notebook Lenovo Ideapad",
    "descrição": "Notebook Lenovo Ideapad S145 81V70008BR - AMD Ryzen 5-3500U 8GB 256GB SSD 15,6 Windows 10",
    "valor": 3419,
    "marca": "Lenovo",
    "modelo": "Ideapad",
    "promocao": true,
    "estoque": 30
  }
]


const procurarTodosOsProdutos = (request, response) => {
  return response.send(produtos)
}

server.get('/produtos', procurarTodosOsProdutos)
server.get('/produtos/:id', (request, response) => {
  const produtoDeInteresse = produtos.find(function(produto){
    return produto.id === request.params.id
  })
  return response.send(produtoDeInteresse)  
})

server.post('/produtos', (request, response) => {
  const dados = request.body

  dados.id = uuid()
  produtos.push(dados)

  return response.json({ mensagem: 'Produto cadastrado com sucesso!', id: dados.id })
})

server.put('/produtos/:id', (request, response) => {
  const id_produtos = request.params.id
  const dados = request.body

  const produtosIndex = produtos.findIndex((produtos) => {
    return produtos.id === id_produtos
  })

  if (produtosIndex === -1) {
    return response.send({ mensagem: 'Produto não encontrado' })
  }

  produtos[produtosIndex] = {
    id: id_produtos,
    ...dados,
  }

  return response.status(200).send({ mensagem: 'Produto atualizado com sucesso' })
})

server.delete('/produto/:id', (request, response) => {
  const id_produto = request.params.id

  const indexParaRemover = produtos.findIndex((produto) => {
    return produto.id === id_produto
  })

  if (indexParaRemover === -1) {
    return response.send({ mensagem: 'Produto não encontrado' })
  }

  produtos.splice(indexParaRemover, 1)

  return response.json({ mensagem: 'Produto apagado com sucesso!' })
})

server.listen(process.env.PORT || 3000, () => {
  console.log("Server rodando na porta => 3000")
})
