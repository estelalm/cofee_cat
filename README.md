
# 📘 API CofeeCat

**Base URL:** `http://localhost:8080/1.0/cofeecat/`  
**Content-Type:** `application/json` para requisições com body (POST/PUT)

---

## 🔐 USUÁRIOS

### 🔹 Listar todos os usuários  
**GET** `/usuarios`  
**Resposta:**
```json
{
  "usuarios": [...],
  "status": "success",
  "status_code": 200
}
```

---

### 🔹 Buscar usuário por ID  
**GET** `/usuario/:id`  
Exemplo: `/usuario/1`

---

### 🔹 Cadastrar novo usuário  
**POST** `/usuario`  
**Body JSON:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

---

### 🔹 Atualizar usuário por ID  
**PUT** `/usuario/:id`  
**Body JSON:**
```json
{
  "nome": "João Atualizado",
  "email": "joao@email.com",
  "senha": "nova123"
}
```

---

### 🔹 Login de usuário  
**POST** `/usuario/login`  
**Body JSON:**
```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

---

### 🔹 Excluir usuário  
**DELETE** `/usuario/:id`

---

## 📦 PRODUTOS

### 🔹 Listar todos os produtos  
**GET** `/produtos`

---

### 🔹 Buscar produto por ID  
**GET** `/produtos/:id`  
Exemplo: `/produtos/1`

---

### 🔹 Filtrar produtos  
**GET** `/produtos?nome=expresso&idCategoria=2`  
- `nome`: (opcional)  
- `idCategoria`: (opcional)

---

### 🔹 Cadastrar novo produto  
**POST** `/produto`  
**Body JSON:**
```json
{
  "nome": "Cappuccino",
  "preco": 6.00,
  "imagem": "cappuccino.jpg",
  "descricao": "Bebida cremosa",
  "ingredientes": "Café, leite",
  "id_categoria": 2
}
```

---

### 🔹 Atualizar produto  
**PUT** `/produto/:id`  
**Body JSON:** igual ao POST

---

### 🔹 Excluir produto  
**DELETE** `/produto/:id`

---

## 📑 PEDIDOS

### 🔹 Listar todos os pedidos  
**GET** `/pedidos`

---

### 🔹 Buscar pedido por ID  
**GET** `/pedido/:id`  
Exemplo: `/pedido/3`

---

### 🔹 Buscar pedidos de um usuário  
**GET** `/pedidos/usuario/:idUsuario`

---

### 🔹 Buscar pedidos por status  
**GET** `/pedidos/status/:status`

---

### 🔹 Buscar pedidos salvos (rascunhos)  
**GET** `/pedidos/salvos/:idUsuario`

---

### 🔹 Criar novo pedido  
**POST** `/pedido`  
**Body JSON:**
```json
{
  "total": 25.50,
  "id_cliente": 1,
  "produtos": [
    { "id_produto": 1, "quantidade": 2 },
    { "id_produto": 3, "quantidade": 1 }
  ]
}
```

---

### 🔹 Atualizar pedido  
**PUT** `/pedido/:id`  
**Body JSON:** igual ao POST

---

### 🔹 Excluir pedido  
**DELETE** `/pedido/:id`
