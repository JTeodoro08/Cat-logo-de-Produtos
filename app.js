const express = require("express");
const app = express();
const port = process.env.PORT || 3002;

const produtos = [
    { id: 1, nome: 'Geladeira', marca: 'Consul', preco: 4590 },
    { id: 2, nome: 'SmartTV', marca: 'LG', preco: 3500 },
    { id: 3, nome: 'Celular', marca: 'Samsung', preco: 1800 },
    { id: 4, nome: 'Impressora', marca: 'Epson', preco: 2290 },
    { id: 5, nome: 'Ventilador', marca: 'Arno', preco: 290 },
    { id: 6, nome: 'Tablet', marca: 'Xiaomi', preco: 2170 },
    { id: 7, nome: 'Fogao', marca: 'Atlas', preco: 1590 },
    { id: 8, nome: 'Iphone 15', marca: 'Apple', preco: 6879 },
    { id: 9, nome: 'Computador', marca: 'Dell', preco: 4280 },
    { id: 10, nome: 'TV 4K', marca: 'Sony', preco: 5290 },
];

// Middleware para JSON
app.use(express.json());

// Middleware para arquivos estáticos
app.use(express.static('public'));

// Rota Principal
app.get('/', (req, res) => {
    res.send('Bem vindo à PTI de API Rest Node.js!');
});

// Endpoint GET para listar produtos com filtro opcional
app.get('/produtos', (req, res) => {
    const { nome } = req.query;
    if (nome) {
        const produtosFiltrados = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(nome.toLowerCase())
        );
        res.status(200).json(produtosFiltrados);
    } else {
        res.status(200).json(produtos);
    }
});

// Endpoint GET para buscar um produto pelo ID
app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id); // Obtém o ID da URL
    const produto = produtos.find(produto => produto.id === id); // Procura o produto pelo ID

    if (produto) {
        res.status(200).json(produto); // Retorna o produto encontrado
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" }); // Retorna erro 404 se não encontrar
    }
});


// Endpoint POST para adicionar um produto
app.post('/produtos', (req, res) => {
    const novoProduto = {
        id: produtos.length + 1,
        nome: req.body.nome,
        marca: req.body.marca,
        preco: req.body.preco
    };
    produtos.push(novoProduto);
    res.status(201).json({
        mensagem: "Novo produto adicionado com sucesso!",
        produto: novoProduto
    });
});

// Endpoint PUT para atualizar um produto pelo ID
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(produto => produto.id === id);

    if (index !== -1) {
        produtos[index] = { ...produtos[index], ...req.body };
        res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            produto: produtos[index]
        });
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" });
    }
});

// Endpoint DELETE para remover um produto pelo ID
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(produto => produto.id === id);

    if (index !== -1) {
        const produtoRemovido = produtos.splice(index, 1);
        res.status(200).json({
            mensagem: `Produto com ID ${id} removido com sucesso`,
            produto: produtoRemovido
        });
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" });
    }
});

// Middleware de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensagem: "Erro interno no servidor!" });
});

// Rota adicional
app.get('/pti', (req, res) => {
    res.sendFile(__dirname + '/public/pti.html');
});

// Servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
