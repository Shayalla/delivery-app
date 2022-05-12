// Comments: Valida formato de email.
function regexEmail(email) {
  const response = new RegExp(['^[\\w.]+@[a-z]+.\\w{2,3}$']);

  // Retorna True or False para a validação do regex
  return response.test(String(email).toLowerCase());
}

module.exports = regexEmail;
