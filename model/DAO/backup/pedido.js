const db = require('../../config/connection.js');

const selectAllPedidos = async () => {
  try {
    const [pedidos] = await db.query(`
      SELECT p.*, u.nome AS nome_usuario
      FROM pedido AS p
      JOIN usuario AS u ON p.id_cliente = u.id
    `);

    for (const pedido of pedidos) {
      const [itens] = await db.query(`
        SELECT ip.*, pr.nome AS nome_produto, pr.imagem, pr.preco
        FROM itens_pedido AS ip
        JOIN produto AS pr ON ip.id_produto = pr.id
        WHERE ip.id_pedido = ?
      `, [pedido.id]);
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
    const [pedido] = await db.query(`
      SELECT p.*, u.nome AS nome_usuario
      FROM pedido AS p
      JOIN usuario AS u ON p.id_cliente = u.id
      WHERE p.id = ?
    `, [id]);

    if (pedido.length > 0) {
      const [itens] = await db.query(`
        SELECT ip.*, pr.nome AS nome_produto, pr.imagem, pr.preco
        FROM itens_pedido AS ip
        JOIN produto AS pr ON ip.id_produto = pr.id
        WHERE ip.id_pedido = ?
      `, [id]);

      pedido[0].itens = itens;
      return pedido;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const selectPedidosByUsuario = async (idUsuario) => {
  try {
    const [pedidos] = await db.query(`SELECT * FROM pedido WHERE id_cliente = ?`, [idUsuario]);

    for (const pedido of pedidos) {
      const [itens] = await db.query(`
        SELECT ip.*, pr.nome AS nome_produto, pr.imagem, pr.preco
        FROM itens_pedido AS ip
        JOIN produto AS pr ON ip.id_produto = pr.id
        WHERE ip.id_pedido = ?
      `, [pedido.id]);

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
    const [pedidos] = await db.query(`SELECT * FROM pedido WHERE status = ?`, [status]);

    for (const pedido of pedidos) {
      const [itens] = await db.query(`
        SELECT ip.*, pr.nome AS nome_produto, pr.imagem, pr.preco
        FROM itens_pedido AS ip
        JOIN produto AS pr ON ip.id_produto = pr.id
        WHERE ip.id_pedido = ?
      `, [pedido.id]);

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
    const [pedidos] = await db.query(`
      SELECT * FROM pedido WHERE id_cliente = ? AND salvo = 1
    `, [idUsuario]);

    for (const pedido of pedidos) {
      const [itens] = await db.query(`
        SELECT ip.*, pr.nome AS nome_produto, pr.imagem, pr.preco
        FROM itens_pedido AS ip
        JOIN produto AS pr ON ip.id_produto = pr.id
        WHERE ip.id_pedido = ?
      `, [pedido.id]);

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
    const [result] = await db.query(`
      INSERT INTO pedido (total, id_cliente, nome_chamado, salvo, status)
      VALUES (?, ?, ?, ?, ?)
    `, [data.total, data.id_cliente, data.nome_chamado, data.salvo, data.status]);
    return result.insertId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const insertItemPedido = async (data) => {
  try {
    const [result] = await db.query(`
      INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario)
      VALUES (?, ?, ?, ?)
    `, [data.id_pedido, data.id_produto, data.quantidade, data.preco_unitario]);
    return result.insertId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updatePedido = async (id, data) => {
  try {
    const [result] = await db.query(`
      UPDATE pedido
      SET total = ?, nome_chamado = ?, salvo = ?, status = ?
      WHERE id = ?
    `, [data.total, data.nome_chamado, data.salvo, data.status, id]);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deletePedido = async (id) => {
  try {
    const [result] = await db.query(`DELETE FROM pedido WHERE id = ?`, [id]);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteItensByPedido = async (idPedido) => {
  try {
    const [result] = await db.query(`DELETE FROM itens_pedido WHERE id_pedido = ?`, [idPedido]);
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
