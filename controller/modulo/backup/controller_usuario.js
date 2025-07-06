const usuarioDAO = require('../model/DAO/usuario.js');
const message = require('./modulo/config.js');
const bcrypt = require('bcrypt');

const getUsuario = async function() {
    try {
        const dados = await usuarioDAO.selectUser();
        if (dados) {
            return {
                usuario: dados,
                status: message.SUCCESS_FOUND_USER.status,
                status_code: message.SUCCESS_FOUND_USER.status_code
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER;
    }
};

const getUsuarioPorId = async function(id) {
    try {
        if (id == '' || id == null || isNaN(id) || id == undefined) {
            return message.ERROR_INVALID_ID;
        } else {
            const rtnUsuario = await usuarioDAO.selectUserId(id);
            if (rtnUsuario) {
                if (rtnUsuario.length > 0) {
                    return {
                        usuario: rtnUsuario[0],
                        status: message.SUCCESS_FOUND_USER.status,
                        status_code: message.SUCCESS_FOUND_USER.status_code
                    };
                } else {
                    console.log(id);
                    return message.ERROR_NOT_FOUND;
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER;
    }
};

const postUsuario = async function(data, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                data.nome == '' || data.nome == undefined || data.nome == null || data.nome.length > 100 ||
                data.telefone == '' || data.telefone == undefined || data.telefone == null || data.telefone.length > 20 ||
                data.email == '' || data.email == undefined || data.email == null || data.email.length > 100 ||
                data.senha == '' || data.senha == undefined || data.senha == null || data.senha.length > 30
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
               
                const senhaCriptografada = await bcrypt.hash(data.senha, 10); 

                data.senha = senhaCriptografada;

                const inserir = await usuarioDAO.insertUser(data);
                if (inserir) {
                    return message.SUCCESS_CREATED_USER;
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB;
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER;
    }
};


const putUsuario = async function(id, data, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                data.nome == '' || data.nome == undefined || data.nome == null || data.nome.length > 100 ||
                data.telefone == '' || data.telefone == undefined || data.telefone == null || data.telefone.length > 20 ||
                data.email == '' || data.email == undefined || data.email == null || data.email.length > 100 ||
                data.senha == '' || data.senha == undefined || data.senha == null || data.senha.length > 30
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                const atualizar = await usuarioDAO.updateUser(data, id);
                if (atualizar) {
                    return message.SUCCESS_UPDATED_ITEM;
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB;
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER;
    }
};

const postLogin = async function(data, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                data.email == '' || data.email == undefined || data.email == null || data.email.length > 100 ||
                data.senha == '' || data.senha == undefined || data.senha == null || data.senha.length > 30
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {

                const usuarioEncontrado = await usuarioDAO.selectUserByEmail(data.email);

                if (usuarioEncontrado.length > 0) {
                    const senhaHash = usuarioEncontrado[0].senha;
                    
                    const senhaValida = await bcrypt.compare(data.senha, senhaHash);

                    if (senhaValida) {
                        return {
                            usuario: usuarioEncontrado[0],
                            status: message.SUCCESS_FOUND_USER.status,
                            status_code: message.SUCCESS_FOUND_USER.status_code
                        };
                    } else {
                        return message.ERROR_INVALID_LOGIN;
                    }
                } else {
                    return message.ERROR_INVALID_LOGIN;
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER;
    }
};


module.exports = {
    getUsuario,
    getUsuarioPorId,
    postUsuario,
    putUsuario,
    postLogin
};
