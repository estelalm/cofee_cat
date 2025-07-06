const fs = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, '../../db.json');

const readDB = async () => {
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
};

const saveDB = async (db) => {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
};

// Monta itens_pedido com dados do produto
const getItensPedido = (pedidoId, db) => {
  const itens = db.itens_pedido.filter(ip => ip.id_pedido === pedidoId);
  return itens.map(ip => {
    const produto = db.produto.find(p => p.id === ip.id_produto) || {};
    return {
      ...ip,
      nome_produto: produto.nome || null,
      imagem: produto.imagem || null,
      preco: produto.preco || null
    };
  });
};

// SELECT todos pedidos com usuario e itens
const selectAllPedidos = async () => {
  const db = await readDB();
  return db.pedido.map(pedido => {
    const usuario = db.usuario.find(u => u.id === pedido.id_cliente) || {};
    return {
      ...pedido,
      nome_usuario: usuario.nome || null,
      itens: getItensPedido(pedido.id, db)
    };
  });
};

// SELECT pedido por ID
const selectPedidoById = async (id) => {
  const db = await readDB();
  const pedido = db.pedido.find(p => p.id === Number(id));
  if (!pedido) return null;

  const usuario = db.usuario.find(u => u.id === pedido.id_cliente) || {};
  return {
    ...pedido,
    nome_usuario: usuario.nome || null,
    itens: getItensPedido(pedido.id, db)
  };
};

// SELECT pedidos por usuario
const selectPedidosByUsuario = async (idUsuario) => {
  const db = await readDB();
  return db.pedido
    .filter(p => p.id_cliente === Number(idUsuario))
    .map(p => ({
      ...p,
      itens: getItensPedido(p.id, db)
    }));
};

// SELECT pedidos por status
const selectPedidosByStatus = async (status) => {
  const db = await readDB();
  return db.pedido
    .filter(p => p.status === status)
    .map(p => ({
      ...p,
      itens: getItensPedido(p.id, db)
    }));
};

// SELECT pedidos salvos por usuario
const selectPedidosSalvosByUsuario = async (idUsuario) => {
  const db = await readDB();
  return db.pedido
    .filter(p => p.id_cliente === Number(idUsuario) && p.salvo === 1)
    .map(p => ({
      ...p,
      itens: getItensPedido(p.id, db)
    }));
};

// INSERT pedido
const insertPedido = async (data) => {
  const db = await readDB();
  const pedidos = db.pedido;

  const lastId = pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) : 0;
  const newPedido = {
    id: lastId + 1,
    total: data.total,
    id_cliente: data.id_cliente,
    nome_chamado: data.nome_chamado || null,
    salvo: data.salvo || 0,
    status: data.status || null
  };

  pedidos.push(newPedido);
  await saveDB(db);
  return newPedido.id;
};

// INSERT item_pedido
const insertItemPedido = async (data) => {
  const db = await readDB();
  const itens = db.itens_pedido;

  const lastId = itens.length > 0 ? Math.max(...itens.map(i => i.id)) : 0;
  const newItem = {
    id: lastId + 1,
    id_pedido: data.id_pedido,
    id_produto: data.id_produto,
    quantidade: data.quantidade,
    preco_unitario: data.preco_unitario
  };

  itens.push(newItem);
  await saveDB(db);
  return newItem.id;
};

// UPDATE pedido
const updatePedido = async (id, data) => {
  const db = await readDB();
  const pedidos = db.pedido;

  const index = pedidos.findIndex(p => p.id === Number(id));
  if (index === -1) return false;

  pedidos[index] = {
    ...pedidos[index],
    total: data.total,
    nome_chamado: data.nome_chamado || null,
    salvo: data.salvo || 0,
    status: data.status || null
  };

  await saveDB(db);
  return true;
};

// DELETE pedido
const deletePedido = async (id) => {
  const db = await readDB();
  const pedidos = db.pedido;

  const index = pedidos.findIndex(p => p.id === Number(id));
  if (index === -1) return false;

  pedidos.splice(index, 1);

  // Também remove itens relacionados
  db.itens_pedido = db.itens_pedido.filter(ip => ip.id_pedido !== Number(id));

  await saveDB(db);
  return true;
};

// DELETE itens_pedido por pedido
const deleteItensByPedido = async (idPedido) => {
  const db = await readDB();
  const before = db.itens_pedido.length;
  db.itens_pedido = db.itens_pedido.filter(ip => ip.id_pedido !== Number(idPedido));
  await saveDB(db);
  return before - db.itens_pedido.length; // retorna quantos itens foram removidos
};

module.exports = {
  selectAllPedidos,
  selectPedidoById,
  selectPedidosByUsuario,
  selectPedidosByStatus,
  selectPedidosSalvosByUsuario,
  insertPedido,
  insertItemPedido,
  updatePedido,
  deletePedido,
  deleteItensByPedido
};
