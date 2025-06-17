const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const selectAllPedidos = async () => {
    try {
        const pedidos = await prisma.$queryRaw`
            SELECT 
                p.*, 
                u.nome AS nome_usuario 
            FROM pedido AS p
            JOIN usuario AS u ON p.id_cliente = u.id
        `;

        for (const pedido of pedidos) {
            const itens = await prisma.$queryRaw`
                SELECT 
                    ip.*, 
                    pr.nome AS nome_produto, 
                    pr.imagem, 
                    pr.preco 
                FROM itens_pedido AS ip
                JOIN produto AS pr ON ip.id_produto = pr.id
                WHERE ip.id_pedido = ${pedido.id}
            `;
            pedido.itens = itens;
        }

        return pedidos;
    } catch (error) {
        console.log(error);
        return false;
    }
};


const selectPedidoById = async (id) => {
    try {
        const pedido = await prisma.$queryRaw`
            SELECT 
                p.*, 
                u.nome AS nome_usuario 
            FROM pedido AS p
            JOIN usuario AS u ON p.id_cliente = u.id
            WHERE p.id = ${id}
        `;

        if (pedido.length > 0) {
            const itens = await prisma.$queryRaw`
                SELECT 
                    ip.*, 
                    pr.nome AS nome_produto, 
                    pr.imagem, 
                    pr.preco 
                FROM itens_pedido AS ip
                JOIN produto AS pr ON ip.id_produto = pr.id
                WHERE ip.id_pedido = ${id}
            `;
            pedido[0].itens = itens;
            return pedido;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};


const selectPedidosByUsuario = async (idUsuario) => {
    try {
        const pedidos = await prisma.$queryRaw`
            SELECT 
                p.* 
            FROM pedido AS p
            WHERE p.id_cliente = ${idUsuario}
        `;

        for (const pedido of pedidos) {
            const itens = await prisma.$queryRaw`
                SELECT 
                    ip.*, 
                    pr.nome AS nome_produto, 
                    pr.imagem, 
                    pr.preco 
                FROM itens_pedido AS ip
                JOIN produto AS pr ON ip.id_produto = pr.id
                WHERE ip.id_pedido = ${pedido.id}
            `;
            pedido.itens = itens;
        }

        return pedidos;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const selectPedidosByStatus = async (status) => {
    try {
        const pedidos = await prisma.$queryRaw`
            SELECT 
                * 
            FROM pedido 
            WHERE status = ${status}
        `;

        for (const pedido of pedidos) {
            const itens = await prisma.$queryRaw`
                SELECT 
                    ip.*, 
                    pr.nome AS nome_produto, 
                    pr.imagem, 
                    pr.preco 
                FROM itens_pedido AS ip
                JOIN produto AS pr ON ip.id_produto = pr.id
                WHERE ip.id_pedido = ${pedido.id}
            `;
            pedido.itens = itens;
        }

        return pedidos;
    } catch (error) {
        console.log(error);
        return false;
    }
};


const selectPedidosSalvosByUsuario = async (idUsuario) => {
    try {
        const pedidos = await prisma.$queryRaw`
            SELECT 
                * 
            FROM pedido 
            WHERE id_cliente = ${idUsuario} AND salvo = 1
        `;

        for (const pedido of pedidos) {
            const itens = await prisma.$queryRaw`
                SELECT 
                    ip.*, 
                    pr.nome AS nome_produto, 
                    pr.imagem, 
                    pr.preco 
                FROM itens_pedido AS ip
                JOIN produto AS pr ON ip.id_produto = pr.id
                WHERE ip.id_pedido = ${pedido.id}
            `;
            pedido.itens = itens;
        }

        return pedidos;
    } catch (error) {
        console.log(error);
        return false;
    }
};


const insertPedido = async (data) => {
    try {
        const result = await prisma.$executeRaw`
            INSERT INTO pedido (total, id_cliente, nome_chamado, salvo, status)
            VALUES (${data.total}, ${data.id_cliente}, ${data.nome_chamado}, ${data.salvo}, ${data.status})
        `;
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};


const insertItemPedido = async (data) => {
    try {
        const result = await prisma.$executeRaw`
            INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario)
            VALUES (${data.id_pedido}, ${data.id_produto}, ${data.quantidade}, ${data.preco_unitario})
        `;
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};


const updatePedido = async (id, data) => {
    try {
        const result = await prisma.$executeRaw`
            UPDATE pedido
            SET total = ${data.total},
                nome_chamado = ${data.nome_chamado},
                salvo = ${data.salvo},
                status = ${data.status}
            WHERE id = ${id}
        `;
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};


const deletePedido = async (id) => {
    try {
        const result = await prisma.$executeRaw`
            DELETE FROM pedido WHERE id = ${id}
        `;
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
};


const deleteItensByPedido = async (idPedido) => {
    try {
        const result = await prisma.$executeRaw`
            DELETE FROM itens_pedido WHERE id_pedido = ${idPedido}
        `;
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
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
