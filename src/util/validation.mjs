import { validationResult } from "express-validator";

/**
 * Lida com erros de validação para solicitações recebidas. Se houver erros de validação,
 * ele cria um objeto de erro com os erros e o passa para o próximo middleware.
 *
 * @param {Object} req - O objeto de solicitação recebido.
 * @param {Object} _res - O objeto de resposta (não utilizado nesta função).
 * @param {Function} next - A próxima função de middleware.
 * @return {void}
 */
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  console.log("validationErrors", validationErrors);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => ` Campo ${error.path}: ${error.msg}`);

    console.log("errors", errors);
    const err = Error(errors);
    // const err = {};
    err.errors = errors;
    err.status = 400;
    err.title = "Erro na validação";
    next(errors);
  }
  next();
};

export { handleValidationErrors };
