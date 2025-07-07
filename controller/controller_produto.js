const produtoDAO = require('../model/DAO/produto.js');
const message = require('./modulo/config.js');

const getProdutos = async function() {
    try {
        const dados = await produtoDAO.selectProdutos();
        if (dados) {
            return {
                produtos: dados,
                status: message.SUCCESS_FOUND_ITEM.status,
                status_code: message.SUCCESS_FOUND_ITEM.status_code
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER;
    }
};

const getProdutoPorId = async function(id) {
    try {
        if (id == '' || id == null || isNaN(id) || id == undefined) {
            return message.ERROR_INVALID_ID;
        } else {
            const produto = await produtoDAO.selectProdutoById(id);
            if (produto) {
                return {
                    produto: produto,
                    status: message.SUCCESS_FOUND_ITEM.status,
                    status_code: message.SUCCESS_FOUND_ITEM.status_code
                };
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER;
    }
};

const getProdutoPorFiltro = async function(nome, idCategoria) {
    try {
        const dados = await produtoDAO.selectProdutoByFilter(nome, idCategoria);
        if (dados) {
            return {
                produtos: dados,
                status: message.SUCCESS_FOUND_ITEM.status,
                status_code: message.SUCCESS_FOUND_ITEM.status_code
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER;
    }
};

const postProduto = async function(data, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                data.nome == '' || data.nome == undefined || data.nome == null || data.nome.length > 100 ||
                data.preco == '' || data.preco == undefined || data.preco == null || isNaN(data.preco) ||
                data.id_categoria == '' || data.id_categoria == undefined || data.id_categoria == null || isNaN(data.id_categoria)
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                const inserir = await produtoDAO.insertProduto(data);
                if (inserir) {
                    return message.SUCCESS_CREATED_ITEM;
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

const putProduto = async function(id, data, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                id == '' || id == null || id == undefined || isNaN(id) ||
                data.nome == '' || data.nome == undefined || data.nome == null || data.nome.length > 100 ||
                data.preco == '' || data.preco == undefined || data.preco == null || isNaN(data.preco) ||
                data.id_categoria == '' || data.id_categoria == undefined || data.id_categoria == null || isNaN(data.id_categoria)
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                const atualizar = await produtoDAO.updateProduto(id, data);
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

const deleteProduto = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        } else {
            const deletar = await produtoDAO.deleteProduto(id);
            if (deletar) {
                return message.SUCCESS_DELETED_ITEM;
            } else {
                return message.ERROR_INTERNAL_SERVER_DB;
            }
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER;
    }
};

const getCategoriasComProdutos = async function() {
    try {
        const produtos = await produtoDAO.selectProdutos();

        if (!produtos || produtos.length === 0) {
            return message.ERROR_NOT_FOUND;
        }

        const categoriasMap = {};
        produtos.forEach(produto => {
            const idCategoria = produto.id_categoria;
            if (!categoriasMap[idCategoria]) {
                categoriasMap[idCategoria] = {
                    id: idCategoria,
                    nome: produto.nome_categoria,
                    descricao: produto.descricao_categoria,
                    quantidade: 0,
                    produtos: []
                };
            }

            categoriasMap[idCategoria].quantidade++;
            categoriasMap[idCategoria].produtos.push(produto);
        });

        const categorias = Object.values(categoriasMap);

        return {
            categorias: categorias,
            status: message.SUCCESS_FOUND_ITEM.status,
            status_code: message.SUCCESS_FOUND_ITEM.status_code
        };

    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};


module.exports = {
    getProdutos,
    getProdutoPorId,
    getProdutoPorFiltro,
    postProduto,
    putProduto,
    deleteProduto
};
