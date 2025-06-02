const { PrismaClient } = require("@prisma/client");
const { sqltag } = require("@prisma/client/runtime/library");

const prisma = new PrismaClient();

const selectUser = async function () {
  try {
    let sql = "SELECT * from usuario;";
    let rs = await prisma.$queryRawUnsafe(sql);
    return rs;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const selectUserId = async function (id) {
  try {
    let sql = `SELECT * FROM usuario WHERE usuario.id = ${id}`;
    let rs = await prisma.$queryRawUnsafe(sql);
    return rs;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const insertUser = async function (data) {
  try {
    let sql = `INSERT INTO usuario(nome, telefone, email, senha, admin) VALUES 
        (
            '${data.nome}',
            '${data.telefone}',
            '${data.email}',
            '${data.senha}',
            '${data.admin}',
        )`;

    let rs = await prisma.$executeRawUnsafe(sql);
    return rs;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateUser = async function(data, id){
    try{
        let sql= `UPDATE usuario SET 
            nome ='${data.nome}',
            telefone = '${data.telefone}',
            email = '${data.email}',
            senha = '${data.senha}',
            admin = '${data.admin}',
            WHERE id='${id}';`
            
        let rs = await prosma.$executeRawUnsafe(sql);
    }catch(error){
      return false;
    }
}

const login = async function (data) {
  try {
    let sql = `SELECT * from usuario where email = '${data.email}' AND senha = '${data.senha}';`;
    let rs = await prisma.$queryRawUnsafe(sql);
    return rs;
  } catch (error) {
    return false;
  }
};
const selectUserByEmail = async function (email) {
    try {
        const sql = `SELECT * FROM usuario WHERE email = '${email}';`;
        const rs = await prisma.$queryRawUnsafe(sql);
        return rs;
    } catch (error) {
        console.log(error);
        return false;
    }
};


const lastID = async function () {
  try {
    let sql = `SELECT id FROM usuario ORDER BY id DESC LIMIT 1;`;
    let sqlID = await prisma.$queryRawUnsafe(sql);

    return sqlID;
  } catch (error) {
    return false;
  }
};

module.exports = {
  selectUser,
  selectUserId,
  selectUserByEmail,
  insertUser,
  updateUser,
  login,
  lastID
};
