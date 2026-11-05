const validarCliente = require("../utils/validarCliente");

test("deve retornar null para dados válidos", () => {
    const resultado = validarCliente("Maria", "maria@email.com", "11999999999");
    expect(resultado).toBe(null);
});

test("deve retornar null quando telefone não for informado", () => {
    const resultado = validarCliente("Maria", "maria@email.com");
    expect(resultado).toBe(null);
});

test("deve retornar erro se nome estiver vazio", () => {
    const resultado = validarCliente("", "maria@email.com", "11999999999");
    expect(resultado).toBe("Nome é obrigatório");
});

test("deve retornar erro se email estiver vazio", () => {
    const resultado = validarCliente("Maria", "", "11999999999");
    expect(resultado).toBe("Email é obrigatório");
});

test("deve retornar erro se email for inválido", () => {
    const resultado = validarCliente("Maria", "maria-email.com", "11999999999");
    expect(resultado).toBe("Email inválido");
});

test("deve retornar erro se telefone tiver menos de 10 dígitos", () => {
    const resultado = validarCliente("Maria", "maria@email.com", "123");
    expect(resultado).toBe("Telefone deve ter pelo menos 10 dígitos");
});