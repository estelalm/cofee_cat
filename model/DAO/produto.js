const fs = require('fs').promises;
const path = require('path');

// Caminho do arquivo db.json
const dbPath = path.join(__dirname, '../../db.json');

// Ler o arquivo JSON
const readDB = async () => {
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
};

// Salvar no arquivo JSON
const saveDB = async (db) => {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
};

// SELECT * FROM produto JOIN categoria
const selectProdutos = async () => {
  const db = await readDB();
  const produtos = db.produto || [];
  const categorias = db.categoria || [];

  return produtos.map((p) => {
    const cat = categorias.find((c) => c.id === p.id_categoria) || {};
    return {
      ...p,
      nome_categoria: cat.nome || null,
      descricao_categoria: cat.descricao || null,
    };
  });
};

// SELECT produto por ID com JOIN categoria
const selectProdutoById = async (id) => {
  const db = await readDB();
  const produto = db.produto.find((p) => p.id === Number(id));
  if (!produto) return null;

  const cat = db.categoria.find((c) => c.id === produto.id_categoria) || {};
  return {
    ...produto,
    nome_categoria: cat.nome || null,
    descricao_categoria: cat.descricao || null,
  };
};

// SELECT com filtro por nome e/ou categoria
const selectProdutoByFilter = async (nome, idCategoria) => {
  const db = await readDB();
  let produtos = db.produto || [];
  const categorias = db.categoria || [];

  if (nome) {
    produtos = produtos.filter((p) =>
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  if (idCategoria) {
    produtos = produtos.filter((p) => p.id_categoria === Number(idCategoria));
  }

  return produtos.map((p) => {
    const cat = categorias.find((c) => c.id === p.id_categoria) || {};
    return {
      ...p,
      nome_categoria: cat.nome || null,
      descricao_categoria: cat.descricao || null,
    };
  });
};

// INSERT produto
const insertProduto = async (data) => {
  const db = await readDB();
  const produtos = db.produto;

  const lastId = produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) : 0;
  const newProduto = {
    id: lastId + 1,
    nome: data.nome,
    preco: data.preco,
    imagem: data.imagem,
    descricao: data.descricao,
    ingredientes: data.ingredientes,
    id_categoria: data.id_categoria,
  };

  produtos.push(newProduto);
  await saveDB(db);

  return newProduto.id;
};

// UPDATE produto
const updateProduto = async (id, data) => {
  const db = await readDB();
  const produtos = db.produto;

  const index = produtos.findIndex((p) => p.id === Number(id));
  if (index === -1) return false;

  produtos[index] = {
    id: Number(id),
    nome: data.nome,
    preco: data.preco,
    imagem: data.imagem,
    descricao: data.descricao,
    ingredientes: data.ingredientes,
    id_categoria: data.id_categoria,
  };

  await saveDB(db);
  return true;
};

// DELETE produto
const deleteProduto = async (id) => {
  const db = await readDB();
  const produtos = db.produto;

  const index = produtos.findIndex((p) => p.id === Number(id));
  if (index === -1) return false;

  produtos.splice(index, 1);
  await saveDB(db);
  return true;
};

module.exports = {
  selectProdutos,
  selectProdutoById,
  selectProdutoByFilter,
  insertProduto,
  updateProduto,
  deleteProduto,
};
