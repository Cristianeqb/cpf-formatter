const { formatterCPF } = require('../utils/validator');

describe('Teste de formatação de CPF', () => {
  it('deve formatar corretamente um CPF com 11 dígitos', () => {
    const cpf = '12345678909';
    const resultado = formatterCPF(cpf);
    expect(resultado).toBe('123.456.789-09');
  });

  it('deve retornar erro se CPF não tiver 11 dígitos', () => {
    const cpfCurto = '123456789';
    expect(() => formatterCPF(cpfCurto)).toThrow('CPF deve ter 11 dígitos');

    const cpfLongo = '1234567890912';
    expect(() => formatterCPF(cpfLongo)).toThrow('CPF deve ter 11 dígitos');
  });

  it('deve remover caracteres não numéricos antes de formatar', () => {
    const cpfComMascara = '123.456.789-09';
    const resultado = formatterCPF(cpfComMascara);
    expect(resultado).toBe('123.456.789-09');
  });
});
