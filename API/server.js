const express = require('express');
const app = express();
const data = require("./data/data.json");

app.get("/clients", (req, res) => { //resquest, response
    
});

app.get("/clients/:id", (req, res) => { //resquest, response

});

app.post("/clients", () => {})

app.put("/clients/:id", () => {})

app.delete("/clients/:id", () => {})

app.listen(3000, () => {
    console.log("Server is running");
});