/**
 * Formata um CPF no padrão XXX.XXX.XXX-XX
 * @param {string} cpf - CPF não formatado (somente números)
 * @returns {string} CPF formatado
 */
function formatterCPF(cpf) {
    // Remover qualquer caractere que não seja número
    const numeros = cpf.replace(/[^\d]/g, '');
  
    // Verificar se o CPF possui 11 dígitos
    if (numeros.length !== 11) {
      throw new Error('CPF deve ter 11 dígitos');
    }
  
    // Formatando o CPF no padrão brasileiro
    const cpfFormatado = `${numeros.substring(0, 3)}.${numeros.substring(3, 6)}.${numeros.substring(6, 9)}-${numeros.substring(9, 11)}`;
  
    return cpfFormatado;
  }

  module.exports = { formatterCPF };
  