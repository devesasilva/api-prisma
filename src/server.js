require("dotenv").config();

const express = require("express");
const cors = require("cors");
const produtoRoutes = require("./routes/produtoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de produtos funcionando");
});

app.use("/produtos", produtoRoutes);
app.use("/clientes", clienteRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});