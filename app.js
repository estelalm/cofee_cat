

/* Configurações */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//controllers
const controller_usuario = require('./controller/controller_usuario.js');

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

app.listen(8080, () => {
    console.log('API funcionando na porta 8080');
});
