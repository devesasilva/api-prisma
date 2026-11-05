function validarCliente(nome, email, telefone) {
    if (!nome || nome.trim() === "") {
        return "Nome é obrigatório";
    }

    if (!email || email.trim() === "") {
        return "Email é obrigatório";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return "Email inválido";
    }

    if (telefone && telefone.replace(/\D/g, "").length < 10) {
        return "Telefone deve ter pelo menos 10 dígitos";
    }

    return null;
}

module.exports = validarCliente;