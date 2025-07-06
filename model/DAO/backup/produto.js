const db = require('../../config/connection.js');

const selectProdutos = async () => {
  try {
    const [produtos] = await db.query(`
      SELECT 
        p.*, 
        c.nome AS nome_categoria, 
        c.descricao AS descricao_categoria
      FROM produto AS p
      JOIN categoria AS c ON p.id_categoria = c.id
    `);
    return produtos;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const selectProdutoById = async (id) => {
  try {
    const [produto] = await db.query(`
      SELECT 
        p.*, 
        c.nome AS nome_categoria, 
        c.descricao AS descricao_categoria
      FROM produto AS p
      JOIN categoria AS c ON p.id_categoria = c.id
      WHERE p.id = ?
    `, [id]);
    return produto;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const selectProdutoByFilter = async (nome, idCategoria) => {
  try {
    let sql = `
      SELECT 
        p.*, 
        c.nome AS nome_categoria, 
        c.descricao AS descricao_categoria
      FROM produto AS p
      JOIN categoria AS c ON p.id_categoria = c.id
      WHERE 1=1
    `;
    const params = [];

    if (nome) {
      sql += ' AND p.nome LIKE ?';
      params.push(`%${nome}%`);
    }

    if (idCategoria) {
      sql += ' AND p.id_categoria = ?';
      params.push(idCategoria);
    }

    const [produtos] = await db.query(sql, params);
    return produtos;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const insertProduto = async (data) => {
  try {
    const [result] = await db.query(`
      INSERT INTO produto (nome, preco, imagem, descricao, ingredientes, id_categoria)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [data.nome, data.preco, data.imagem, data.descricao, data.ingredientes, data.id_categoria]);

    return result.insertId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateProduto = async (id, data) => {
  try {
    const [result] = await db.query(`
      UPDATE produto
      SET nome = ?, preco = ?, imagem = ?, descricao = ?, ingredientes = ?, id_categoria = ?
      WHERE id = ?
    `, [data.nome, data.preco, data.imagem, data.descricao, data.ingredientes, data.id_categoria, id]);

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteProduto = async (id) => {
  try {
    const [result] = await db.query(`DELETE FROM produto WHERE id = ?`, [id]);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  selectProdutos,
  selectProdutoById,
  selectProdutoByFilter,
  insertProduto,
  updateProduto,
  deleteProduto,
};
