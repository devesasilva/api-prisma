const prisma = require("../config/prisma");
const validarCliente = require("../utils/validarCliente");

// Listar todos
exports.listar = async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany({
            orderBy: { id: "asc" }
        });
        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar clientes" });
    }
};

// Buscar por ID
exports.buscarPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const cliente = await prisma.cliente.findUnique({
            where: { id }
        });

        if (!cliente) {
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar cliente" });
    }
};

// Criar cliente
exports.criar = async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;

        const erro = validarCliente(nome, email, telefone);

        if (erro) {
            return res.status(400).json({ erro });
        }

        const novoCliente = await prisma.cliente.create({
            data: {
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                telefone: telefone ? telefone.trim() : null
            }
        });

        res.status(201).json(novoCliente);
    } catch (error) {
        // P2002 = violação de campo único (email repetido)
        if (error.code === "P2002") {
            return res.status(409).json({ erro: "Email já cadastrado" });
        }
        console.error(error);
        res.status(500).json({ erro: "Erro ao criar cliente" });
    }
};

// Atualizar
exports.atualizar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, email, telefone } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const clienteExistente = await prisma.cliente.findUnique({
            where: { id }
        });

        if (!clienteExistente) {
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }

        const erro = validarCliente(nome, email, telefone);

        if (erro) {
            return res.status(400).json({ erro });
        }

        const clienteAtualizado = await prisma.cliente.update({
            where: { id },
            data: {
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                telefone: telefone ? telefone.trim() : null
            }
        });

        res.status(200).json(clienteAtualizado);
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({ erro: "Email já cadastrado" });
        }
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar o cliente" });
    }
};

// Deletar
exports.deletar = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const clienteExistente = await prisma.cliente.findUnique({
            where: { id }
        });

        if (!clienteExistente) {
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }

        await prisma.cliente.delete({
            where: { id }
        });

        res.status(200).json({ mensagem: "Cliente deletado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao deletar cliente" });
    }
};