const fs = require('fs').promises;
const path = require('path');

// Caminho do arquivo JSON
const dbPath = path.join(__dirname, '../../db.json');

// Função utilitária para ler o JSON
const readDB = async () => {
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
};

// Função utilitária para salvar o JSON
const saveDB = async (db) => {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
};

const selectUser = async () => {
  const db = await readDB();
  return db.usuario || [];
};

const selectUserId = async (id) => {
  const db = await readDB();
  return db.usuario.find((u) => u.id === Number(id)) || null;
};

const selectUserByEmail = async (email) => {
  const db = await readDB();
  return db.usuario.find((u) => u.email === email) || null;
};

const insertUser = async (data) => {
  const db = await readDB();
  const users = db.usuario;

  // Novo ID baseado no último ID
  const lastId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
  const newUser = {
    id: lastId + 1,
    nome: data.nome,
    telefone: data.telefone,
    email: data.email,
    senha: data.senha,
    admin: data.admin || 0,
  };

  users.push(newUser);
  await saveDB(db);

  return newUser.id;
};

const updateUser = async (data, id) => {
  const db = await readDB();
  const users = db.usuario;
  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) return false;

  users[index] = {
    id: Number(id),
    nome: data.nome,
    telefone: data.telefone,
    email: data.email,
    senha: data.senha,
    admin: data.admin || 0,
  };

  await saveDB(db);
  return true;
};

const deleteUser = async (id) => {
  const db = await readDB();
  const users = db.usuario;
  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) return false;

  users.splice(index, 1);
  await saveDB(db);
  return true;
};

const login = async (data) => {
  const db = await readDB();
  return db.usuario.find((u) => u.email === data.email && u.senha === data.senha) || null;
};

const lastID = async () => {
  const db = await readDB();
  const users = db.usuario;
  return users.length > 0 ? Math.max(...users.map((u) => u.id)) : null;
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
