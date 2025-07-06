const db = require('../../config/connection.js');

const selectUser = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM usuario');
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const selectUserId = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuario WHERE id = ?', [id]);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const selectUserByEmail = async (email) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuario WHERE email = ?', [email]);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const insertUser = async (data) => {
  try {
    const [result] = await db.query(
      `INSERT INTO usuario (nome, telefone, email, senha, admin) VALUES (?, ?, ?, ?, ?)`,
      [data.nome, data.telefone, data.email, data.senha, data.admin]
    );
    return result.insertId; // retorna o ID inserido
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateUser = async (data, id) => {
  try {
    const [result] = await db.query(
      `UPDATE usuario SET nome = ?, telefone = ?, email = ?, senha = ?, admin = ? WHERE id = ?`,
      [data.nome, data.telefone, data.email, data.senha, data.admin, id]
    );
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteUser = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM usuario WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const login = async (data) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM usuario WHERE email = ? AND senha = ?',
      [data.email, data.senha]
    );
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const lastID = async () => {
  try {
    const [rows] = await db.query('SELECT id FROM usuario ORDER BY id DESC LIMIT 1');
    return rows.length > 0 ? rows[0].id : null;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  selectUser,
  selectUserId,
  selectUserByEmail,
  insertUser,
  updateUser,
  deleteUser,
  login,
  lastID,
};