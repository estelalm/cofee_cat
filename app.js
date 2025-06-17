

/* Configurações */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//controllers
const controller_usuario = require('./controller/controller_usuario.js');
const controller_produto = require('./controller/controller_produto.js');


const app = express();

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();
});

const bodyParserJSON = bodyParser.json();

/* Usuário */
app.get('/1.0/cofeecat/usuarios', cors(), bodyParserJSON, async (request, response) => {
    const result = await controller_usuario.getUsuario();
    response.status(result.status_code);
    response.json(result);
});

app.get('/1.0/cofeecat/usuario/:id', cors(), bodyParserJSON, async (request, response) => {
    const idUser = request.params.id;
    console.log(idUser);
    const result = await controller_usuario.getUsuarioPorId(idUser);
    response.status(result.status_code);
    response.json(result);
});

app.post('/1.0/cofeecat/usuario', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type'];
    const dados = request.body;
    const result = await controller_usuario.postUsuario(dados, contentType);
    response.status(result.status_code);
    response.json(result);
});

app.put('/1.0/cofeecat/usuario/:id', cors(), bodyParserJSON, async (request, response) => {
    const id = request.params.id;
    const dados = request.body;
    const contentType = request.headers['content-type'];
    const result = await controller_usuario.putUsuario(id, dados, contentType);
    response.status(result.status_code);
    response.json(result);
});

app.post('/1.0/cofeecat/usuario/login', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type'];
    const dados = request.body;
    const result = await controller_usuario.postLogin(dados, contentType);
    response.status(result.status_code);
    response.json(result);
});


/* Produtos */
// Todos os produtos
app.get('/1.0/cofeecat/produtos', cors(), bodyParserJSON, async (request, response) => {
    const result = await controller_produto.getProdutos();
    response.status(result.status_code);
    response.json(result);
});

// Produtos por id
app.get('/1.0/cofeecat/produtos/:id', cors(), bodyParserJSON, async (request, response) => {
    const idProduto = request.params.id;
    const result = await controller_produto.getProdutoPorId(idProduto);
    response.status(result.status_code);
    response.json(result);
});

// Produtos por filtros diversos
app.get('/1.0/cofeecat/produtos/', cors(), bodyParserJSON, async (request, response) => {
    let params = request.query
    const result = await controller_produto.getProdutoPorFiltro(params);
    response.status(result.status_code);
    response.json(result);
});

// Cadastrar um produto
app.post('/1.0/cofeecat/produto/', cors(), bodyParserJSON, async (request, response) => {
    const contentType = request.headers['content-type'];
    const dados = request.body;
    const result = await controller_produto.postProduto(dados, contentType);
    response.status(result.status_code);
    response.json(result);
});

// Alterar um produto
app.put('/1.0/cofeecat/produto/:id', cors(), bodyParserJSON, async (request, response) => {
    const id = request.params.id;
    const dados = request.body;
    const contentType = request.headers['content-type'];
    const result = await controller_produto.putProduto(id, dados, contentType);
    response.status(result.status_code);
    response.json(result);
});

// Excluir um produto
app.delete('/1.0/cofeecat/produto/:id', cors(), bodyParserJSON, async (request, response) => {
    const idProduto = request.params.id;
    const result = await controller_produto.deleteProduto(idProduto);
    response.status(result.status_code);
    response.json(result);
});






app.listen(8080, () => {
    console.log('API funcionando na porta 8080');
});
