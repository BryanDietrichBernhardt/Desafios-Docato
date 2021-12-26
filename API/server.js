const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const cors = require('cors');

const fs = require('fs');
let fileName = "./data/data.json";
let data = require(fileName);

const puppeteer = require('puppeteer');
const url = 'https://docato.com.br/sobre/sobre-nos';

let lastId = 1;

app.use(cors());
app.use(express.json()); //utilizar a notação json
app.use(express.urlencoded({ extends: false })); //quando passar parametros via url, conseguir decodar

app.get("/clients", (req, res) => { //resquest, response
    res.json(data);
});

app.get("/about", async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const pageData = await page.evaluate(() => {
        return {
            nossaHistoria: {
                title: document.querySelector('#secao-nossa-historia > div > div > div.col-lg-7.text-center.text-lg-left.text-dark > h2 > strong').textContent,
                text1: document.querySelector('#secao-nossa-historia > div > div > div.col-lg-7.text-center.text-lg-left.text-dark > h3:nth-child(2)').textContent,
                text2: document.querySelector('#secao-nossa-historia > div > div > div.col-lg-7.text-center.text-lg-left.text-dark > h3:nth-child(3)').textContent,
            },
            emQueAcreditamos: {
                title: document.querySelector('body > main > section:nth-child(6) > div > div:nth-child(1) > div.col-lg-8.text-lg-left.text-center.my-auto > div > h2 > strong').textContent,
                text: document.querySelector('body > main > section:nth-child(6) > div > div:nth-child(1) > div.col-lg-8.text-lg-left.text-center.my-auto > div > h3').textContent
            }
        };
    });

    await browser.close();

    res.send({
        "page1": pageData.nossaHistoria,
        "page2": pageData.emQueAcreditamos,
    });
});

app.get("/clients/:id", (req, res) => { //resquest, response
    const { id } = req.params
    const client = data.find(cli => cli.id == id) //procurar um cliente com um id igual
    
    if (!client) return res.status(204).json();

    res.json(client);
});

//adicionar
app.post("/clients", (req, res) => {
    let { name, cpf, email, username, password } = req.body;
    password = bcrypt.hashSync(password, salt)
    const id = data[data.length - 1].id + 1;

    //salvar
    data.push({ id, name, cpf, email, username, password })
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));

    res.json('Successful');
})

//atualizar
app.put("/clients/:id", (req, res) => {
    const { id } = req.params;
    const client = data.find(client => client.id == id)

    if (!client) return res.status(204).json();

    const { username, password } = req.body;
    client.username = username;
    client.password = bcrypt.hashSync(password, salt);
    const index = data.findIndex(client => client.id == id);
    console.log(index)
    console.log(client)
    data[index].username = client.username;
    data[index].password = client.password;

    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));

    res.json(data[index]);
})

//excluir
app.delete("/clients/:id", (req, res) => {
    const {id} = req.params;
    data = data.filter(client => client.id != id);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    res.json(`ID ${id} deleted!`);
})

//autenticar
app.post("/login", (req, res) => {
    try {
        if(data.find(element => element.username === req.body.username).username && data.find(element => element.password === bcrypt.hashSync(req.body.password, salt)).password) res.json({
            "success": 1,
            "message": "Successful!"
        });
    }
    catch {
        res.json({
            "success": 0,
            "message": "Incorrect username or password!",
        });
    }
})

app.listen(3000, () => {
    console.log("Server is running");
});