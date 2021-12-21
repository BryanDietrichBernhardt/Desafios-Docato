const express = require('express');
const app = express();
const data = require("./data/data.json");
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10)

app.use(express.json()); //utilizar a notação json
app.use(express.urlencoded({ extends: false })); //quando passar parametros via url, conseguir decodar

app.get("/clients", (req, res) => { //resquest, response
    res.json(data);
});

app.get("/clients/:id", (req, res) => { //resquest, response
    const { id } = req.params
    const client = data.find(cli => cli.id == id) //procurar um cliente com um id igual
    
    if (!client) return res.status(204).json();

    res.json(client);
});

//adicionar
app.post("/clients", (req, res) => {
    const { name, cpf, email, username, password } = req.body;
    cryptPassword = bcrypt.hashSync(password, salt)
    const id = data.length + 1;

    //salvar
    data.push({ id, name, cpf, email, username, cryptPassword })

    res.json('Successful');
})

//atualizar
app.put("/clients/:id", (req, res) => {
    const { id } = req.params
    const client = data.find(cli => cli.id == id)

    if (!client) return res.status(204).json();

    const { name, email } = req.body;
    client.name = name;

    res.json(client);
})

app.delete("/clients/:id", (req, res) => {
    const {id} = req.params;
    const data = data.filter(client =qq> client.id != id);
    

    res.json(clientsFiltered);
})

app.listen(3000, () => {
    console.log("Server is running");
});