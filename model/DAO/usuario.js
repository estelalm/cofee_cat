const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const selectUser = async () => {
    try {
        const rs = await prisma.$queryRaw`
            SELECT * FROM usuario
        `;
        return rs;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const selectUserId = async (id) => {
    try {
        const rs = await prisma.$queryRaw`
            SELECT * FROM usuario WHERE usuario.id = ${id};
        `;
        return rs;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const selectUserByEmail = async (email) => {
    try {
        const rs = await prisma.$queryRaw`
            SELECT * FROM usuario WHERE email = ${email}
        `;
        return rs;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const insertUser = async (data) => {
    try {
        const rs = await prisma.$executeRaw`
            INSERT INTO usuario (nome, telefone, email, senha, admin)
            VALUES (${data.nome}, ${data.telefone}, ${data.email}, ${data.senha}, ${data.admin})
        `;
        return rs;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const updateUser = async (data, id) => {
    try {
        const rs = await prisma.$executeRaw`
            UPDATE usuario SET 
                nome = ${data.nome},
                telefone = ${data.telefone},
                email = ${data.email},
                senha = ${data.senha},
                admin = ${data.admin}
            WHERE id = ${id}
        `;
        return rs;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const deleteUser = async (id) => {
    try {
        const rs = await prisma.$executeRaw`
            DELETE FROM usuario WHERE id = ${id}
        `;
        return rs;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const login = async (data) => {
    try {
        const rs = await prisma.$queryRaw`
            SELECT * FROM usuario 
            WHERE email = ${data.email} AND senha = ${data.senha}
        `;
        return rs;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const lastID = async () => {
    try {
        const sqlID = await prisma.$queryRaw`
            SELECT id FROM usuario ORDER BY id DESC LIMIT 1
        `;
        return sqlID;
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
    lastID
};
