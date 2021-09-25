const express = require('express')
const { v4: uuid } = require('uuid')

const server = express()

server.use(express.json())

// Métodos HTTP
/*
    GET: Obtem dados
    POST: Cria dados
    PUT: Altera dados
    DELETE: Apaga dados
*/

/* Informações para o Professor
  Professor: 
    nome, 
    email,
    senha,
    cpf, 
    data_nascimento,  
    n_sus, 
    telefone, 
    endereco, 
    responsavel, 
    turma
*/

const professores = []

//GET => http://localhost:3000/Professors

// GET / => Retorna todos os aulos
server.get('/professores', (request, response) => {
  return response.send(professores)
})

server.post('/professores', (request, response) => {
  const dados = request.body

  professores.push({
    id: uuid(),
    ...dados,
  })

  return response.json({ mensagem: 'Professor cadastrado com sucesso!' })
})

server.put('/professores/:id', (request, response) => {
  const id_professor = request.params.id
  const dados = request.body

  const professorIndex = professores.findIndex((professor) => {
    return professor.id === id_professor
  })

  if (professorIndex === -1) {
    return response.send({ mensagem: 'Professor não encontrado' })
  }

  professores[professorIndex] = {
    id: id_professor,
    ...dados,
  }

  return response
    .status(200)
    .send({ mensagem: 'Professor atualizado com sucesso' })
})

server.delete('/professores/:id', (request, response) => {
  const id_professor = request.params.id

  const professorIndex = professores.findIndex((professor) => {
    return professor.id === id_professor
  })

  if (professorIndex === -1) {
    return response.send({ mensagem: 'Professor não encontrado' })
  }

  professores.splice(professorIndex, 1)

  return response.json({ mensagem: 'Professor apagado com sucesso!' })
})

server.listen(3000, () => {
  console.log('Server rodando na porta 3000 🚀')
})
