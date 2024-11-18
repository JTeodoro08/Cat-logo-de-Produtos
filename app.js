
const express = require("express");
const app = express();
// const { v4: uuidv4 } = require("uuid");
const port = 3000;

// Variável com os dados do produtos
const produtos = [
    {id: 1, nome: 'Geladeira', marca: 'Consul', preco: 4590},
    {id: 2, nome: 'SmartTV', marca: 'LG', preco: 3500},
    {id: 3, nome: 'Celular', marca: 'Samsung', preco: 1800},
    {id: 4, nome: 'Impressora', marca: 'Epson', preco: 2290},
    {id: 5, nome: 'Ventilador', marca: 'Arno', preco: 290}, 
    {id: 6, nome: 'Tablet', marca: 'Xiaomi', preco: 2170},
    {id: 7, nome: 'Fogao', marca: 'Atlas', preco: 1590},
    {id: 8, nome: 'Iphone 15', marca: 'Apple', preco: 6879},
    {id: 9, nome: 'Computador', marca: 'Dell', preco: 4280},
    {id: 10, nome: 'TV 4K', marca: 'Sony', preco: 5290},
];  



// Middleware para permitir JSON no corpo da requisição
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Rota Principal
app.get('/', (req, res) => {
    res.send('Bem vindo a pti de Api Rest Node.js!');
});

app.get('/produtos', (req, res) => {
   res.send(produtos);
});

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

// Endpoint POST para adicionar um produto
app.post('/produtos', (req, res) => {
    const novoProduto = {
        id: produtos.length + 1,
        nome: req.body.nome,
        marca: req.body.marca,
        preco: req.body.preco
    };
    produtos.push(novoProduto);
    res.status(201).send('Novo produto adicionado com sucesso!');
});

// Endpoint PUT para atualizar um produto pelo ID
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(produto => produto.id === id);

    if (index !== -1) {
        produtos[index] = { ...produtos[index], ...req.body };
        res.status(200).json(produtos[index]);
    } else {
        res.status(404).send("Produto não encontrado");
    }
});

// Endpoint DELETE para remover um produto pelo ID
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(produto => produto.id === id);

    if (index !== -1) {
        const produtoRemovido = produtos.splice(index, 1);
        res.status(200).send(`Produto com ID ${id} removido com sucesso`);
    } else {
        res.status(404).send("Produto não encontrado");
    }
});


// Rota sobre
app.get('/pti', (req, res) => {
    res.sendFile(__dirname + '/public/pti.html');
});



// Executar o servidor na porta:3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);  
});
