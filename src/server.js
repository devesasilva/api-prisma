require("dotenv").config();

const express = require("express");
const cors = require("cors");
const produtoRoutes = require("./routes/produtoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/produtos", produtoRoutes);
app.use("/clientes", clienteRoutes);

module.exports = app;

if (process.env.NODE_ENV !== "test") {
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000")
    });
}