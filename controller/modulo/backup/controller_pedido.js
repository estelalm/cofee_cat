const pedidoDAO = require('../model/DAO/pedido.js');
const message = require('./modulo/config.js');

const getPedidos = async function() {
    try {
        const dados = await pedidoDAO.selectAllPedidos();
        if (dados) {
            return {
                pedidos: dados,
                status: message.SUCCESS_FOUND_ITEM.status,
                status_code: message.SUCCESS_FOUND_ITEM.status_code
            };
        } else {
            return message.ERROR_INTERNAL_SERVER_DB;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};

const getPedidoPorId = async function(id) {
    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        } else {
            const pedido = await pedidoDAO.selectPedidoById(id);
            if (pedido) {
                return {
                    pedido: pedido,
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

const getPedidosPorUsuario = async function(idUsuario) {
    try {
        if (idUsuario == '' || idUsuario == null || idUsuario == undefined || isNaN(idUsuario)) {
            return message.ERROR_INVALID_ID;
        } else {
            const pedidos = await pedidoDAO.selectPedidosByUsuario(idUsuario);
            if (pedidos) {
                return {
                    pedidos: pedidos,
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

const getPedidosPorStatus = async function(status) {
    try {
        const pedidos = await pedidoDAO.selectPedidosByStatus(status);
        if (pedidos) {
            return {
                pedidos: pedidos,
                status: message.SUCCESS_FOUND_ITEM.status,
                status_code: message.SUCCESS_FOUND_ITEM.status_code
            };
        } else {
            return message.ERROR_NOT_FOUND;
        }
    } catch {
        return message.ERROR_INTERNAL_SERVER;
    }
};

const getPedidosSalvosPorUsuario = async function(idUsuario) {
    try {
        if (idUsuario == '' || idUsuario == null || idUsuario == undefined || isNaN(idUsuario)) {
            return message.ERROR_INVALID_ID;
        } else {
            const pedidos = await pedidoDAO.selectPedidosSalvosByUsuario(idUsuario);
            if (pedidos) {
                return {
                    pedidos: pedidos,
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

const postPedido = async function(data, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                data.total == '' || data.total == undefined || isNaN(data.total) ||
                data.id_cliente == '' || data.id_cliente == undefined || isNaN(data.id_cliente) ||
                !Array.isArray(data.produtos) || data.produtos.length === 0
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                
                const pedidoId = await pedidoDAO.insertPedido(data);

                if (pedidoId) {
                    
                    for (const item of data.produtos) {
                        if (
                            item.id_produto && !isNaN(item.id_produto) &&
                            item.quantidade && !isNaN(item.quantidade) &&
                            item.preco_unitario && !isNaN(item.preco_unitario)
                        ) {
                            await pedidoDAO.insertItemPedido({
                                id_pedido: pedidoId,
                                id_produto: item.id_produto,
                                quantidade: item.quantidade,
                                preco_unitario: item.preco_unitario
                            });
                        }
                    }

                    return message.SUCCESS_CREATED_ITEM;
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB;
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};


const putPedido = async function(id, data, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) ||
                data.total == '' || data.total == undefined || isNaN(data.total) ||
                data.id_cliente == '' || data.id_cliente == undefined || isNaN(data.id_cliente) ||
                !Array.isArray(data.produtos) || data.produtos.length === 0
            ) {
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                
                const atualizar = await pedidoDAO.updatePedido(id, data);

                if (atualizar) {
                    
                    await pedidoDAO.deleteItensByPedido(id);

                    
                    for (const item of data.produtos) {
                        if (
                            item.id_produto && !isNaN(item.id_produto) &&
                            item.quantidade && !isNaN(item.quantidade) &&
                            item.preco_unitario && !isNaN(item.preco_unitario)
                        ) {
                            await pedidoDAO.insertItemPedido({
                                id_pedido: id,
                                id_produto: item.id_produto,
                                quantidade: item.quantidade,
                                preco_unitario: item.preco_unitario
                            });
                        }
                    }

                    return message.SUCCESS_UPDATED_ITEM;
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB;
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};


const deletePedido = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)) {
            return message.ERROR_INVALID_ID;
        } else {
            const deletar = await pedidoDAO.deletePedido(id);
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

module.exports = {
    getPedidos,
    getPedidoPorId,
    getPedidosPorUsuario,
    getPedidosPorStatus,
    getPedidosSalvosPorUsuario,
    postPedido,
    putPedido,
    deletePedido
};
