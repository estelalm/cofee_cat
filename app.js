/* ======================
   CONFIGURAÇÕES GERAIS
====================== */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Controllers
const controller_usuario = require('./controller/controller_usuario.js');
const controller_produto = require('./controller/controller_produto.js');
const controller_pedido = require('./controller/controller_pedido.js');

const app = express();

// ✅ Configuração global de CORS ANTES de tudo
app.use(cors({
  origin: '*', // ou ['https://seusite.com'] se quiser restringir
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// ✅ Middleware global para JSON
app.use(bodyParser.json());

/* ======================
   ROTAS USUÁRIO
====================== */

// GET todos usuários
app.get('/1.0/cofeecat/usuarios', async (req, res) => {
  const result = await controller_usuario.getUsuario();
  res.status(result.status_code).json(result);
});

// GET usuário por ID
app.get('/1.0/cofeecat/usuario/:id', async (req, res) => {
  const idUser = req.params.id;
  const result = await controller_usuario.getUsuarioPorId(idUser);
  res.status(result.status_code).json(result);
});

// POST criar usuário
app.post('/1.0/cofeecat/usuario', async (req, res) => {
  const contentType = req.headers['content-type'];
  const dados = req.body;
  const result = await controller_usuario.postUsuario(dados, contentType);
  res.status(result.status_code).json(result);
});

// PUT atualizar usuário
app.put('/1.0/cofeecat/usuario/:id', async (req, res) => {
  const id = req.params.id;
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const result = await controller_usuario.putUsuario(id, dados, contentType);
  res.status(result.status_code).json(result);
});

// POST login
app.post('/1.0/cofeecat/usuario/login', async (req, res) => {
  const contentType = req.headers['content-type'];
  const dados = req.body;
  const result = await controller_usuario.postLogin(dados, contentType);
  res.status(result.status_code).json(result);
});

// DELETE usuário
app.delete('/1.0/cofeecat/usuario/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller_usuario.deleteUsuario(id);
  res.status(result.status_code).json(result);
});


/* ======================
   ROTAS PRODUTOS
====================== */

// GET todos produtos
app.get('/1.0/cofeecat/produtos', async (req, res) => {
  const result = await controller_produto.getProdutos();
  res.status(result.status_code).json(result);
});

// GET produto por ID
app.get('/1.0/cofeecat/produtos/:id', async (req, res) => {
  const idProduto = req.params.id;
  const result = await controller_produto.getProdutoPorId(idProduto);
  res.status(result.status_code).json(result);
});

// GET produtos filtrados
app.get('/1.0/cofeecat/produtos/', async (req, res) => {
  let params = req.query;
  const result = await controller_produto.getProdutoPorFiltro(params);
  res.status(result.status_code).json(result);
});

// POST criar produto
app.post('/1.0/cofeecat/produto/', async (req, res) => {
  const contentType = req.headers['content-type'];
  const dados = req.body;
  const result = await controller_produto.postProduto(dados, contentType);
  res.status(result.status_code).json(result);
});

// PUT atualizar produto
app.put('/1.0/cofeecat/produto/:id', async (req, res) => {
  const id = req.params.id;
  const dados = req.body;
  const contentType = req.headers['content-type'];
  const result = await controller_produto.putProduto(id, dados, contentType);
  res.status(result.status_code).json(result);
});

// DELETE produto
app.delete('/1.0/cofeecat/produto/:id', async (req, res) => {
  const idProduto = req.params.id;
  const result = await controller_produto.deleteProduto(idProduto);
  res.status(result.status_code).json(result);
});

// GET categorias com produtos
app.get('/1.0/cofeecat/categorias', async (req, res) => {
  const result = await controller_produto.getCategoriasComProdutos();
  res.status(result.status_code).json(result);
});


/* ======================
   ROTAS PEDIDOS
====================== */

// GET todos pedidos
app.get('/1.0/cofeecat/pedidos', async (req, res) => {
  const result = await controller_pedido.getPedidos();
  res.status(result.status_code).json(result);
});

// GET pedido por ID
app.get('/1.0/cofeecat/pedido/:id', async (req, res) => {
  const idPedido = req.params.id;
  const result = await controller_pedido.getPedidoPorId(idPedido);
  res.status(result.status_code).json(result);
});

// GET pedidos por usuário
app.get('/1.0/cofeecat/pedidos/usuario/:idUsuario', async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const result = await controller_pedido.getPedidosPorUsuario(idUsuario);
  res.status(result.status_code).json(result);
});

// GET pedidos por status
app.get('/1.0/cofeecat/pedidos/status/:status', async (req, res) => {
  const status = req.params.status;
  const result = await controller_pedido.getPedidosPorStatus(status);
  res.status(result.status_code).json(result);
});

// GET pedidos salvos por usuário
app.get('/1.0/cofeecat/pedidos/salvos/:idUsuario', async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const result = await controller_pedido.getPedidosSalvosPorUsuario(idUsuario);
  res.status(result.status_code).json(result);
});

// POST criar pedido
app.post('/1.0/cofeecat/pedido', async (req, res) => {
  const contentType = req.headers['content-type'];
  const data = req.body;
  const result = await controller_pedido.postPedido(data, contentType);
  res.status(result.status_code).json(result);
});

// PUT atualizar pedido
app.put('/1.0/cofeecat/pedido/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const contentType = req.headers['content-type'];
  const result = await controller_pedido.putPedido(id, data, contentType);
  res.status(result.status_code).json(result);
});

// DELETE pedido
app.delete('/1.0/cofeecat/pedido/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller_pedido.deletePedido(id);
  res.status(result.status_code).json(result);
});


/* ======================
   START SERVER
====================== */
app.listen(8080, () => {
  console.log('✅ API funcionando na porta 8080');
});
