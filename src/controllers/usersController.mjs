import { check } from "express-validator";

import config from "../config/config.mjs";
import { Users } from "../db/models/index.mjs";
import { generateToken } from "../util/auth.mjs";

const jwtConfig = config.jwtConfig;
const { expiresIn } = jwtConfig;

/**
 * Esta função recupera todos os usuários do banco de dados e os retorna como uma resposta JSON.
 *
 * @param {Object} req - O objeto de solicitação expresso que contém os detalhes da solicitação HTTP.
 * @param {Object} res - O objeto de resposta expressa usada para enviar a resposta HTTP.
 * @param {Function} _next - A próxima função de middleware na cadeia de middleware expressa.
 *
 * @returns {Promise<void>} - Uma promessa que resolve quando a função conclui sua execução.
 * @throws {Error} - Se ocorrer um erro durante a execução da função.
 */
async function findAll(req, res, _next) {
  const users = await Users.findAll();
  res.json(users);
}

/**
 * Esta função gera um token para o usuário e define um cookie com o token na resposta.
 *
 * @param {Object} req - O objeto de solicitação expresso que contém os detalhes da solicitação HTTP.
 * @param {Object} res - O objeto de resposta expressa usada para enviar a resposta HTTP.
 *
 * @returns {Promise<void>} - Uma promessa que resolve quando a função conclui sua execução.
 * @throws {Error} - Se ocorrer um erro durante a execução da função.
 */
async function getToken(req, res) {
  const user = await Users.signup(req.body);
  const token = await generateToken(user);
  res.cookie("token", token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({
    user,
  });
}

const validateSignup = [
  // check("username", "Deve estar entre 5 e 70 caracteres")
  //   .isLength({ min: 5, max: 70 }),
  check("email", "Deve ser um e-mail válido").exists().isEmail(),
  check("password", "Deve ser 6 ou mais caracteres")
    .exists()
    .isLength({ min: 6, max: 70 }),
  check(
    "confirmPassword",
    "Confirme a senha. Ele deve ter o mesmo valor que o campo de senha"
  ).custom((value, { req }) => value === req.body.password),
];

export { findAll, getToken, validateSignup };
