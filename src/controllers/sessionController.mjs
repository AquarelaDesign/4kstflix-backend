import config from "../config/config.mjs";
import { Users } from "../db/models/index.mjs";
import { generateToken } from "../util/auth.mjs";

const jwtConfig = config.jwtConfig;
const { expiresIn } = jwtConfig;

/**
 * Autentica o usuário verificando as credenciais e gerando um token.
 * @param {Object} req - Objeto de solicitação expressa contendo as credenciais do usuário.
 * @param {Object} res - Objeto de resposta expressa para enviar os dados do token e do usuário.
 * @param {Function} next - Expresse a próxima função de middleware para lidar com erros.
 * @returns {Promise<void>} - Resolve quando o token é gerado e enviado com sucesso.
 * @throws {Error} - Se as credenciais forem inválidas.
 */
async function login(req, res, next) {
  const user = await Users.login(req.body);
  if (user) {
    const token = await generateToken(user);
    res.cookie("token", token, {
      maxAge: expiresIn * 1000, // maxAge em milissegundos
      httpOnly: true,
      secure: config.environment === "production",
    });
    return res.json({
      user,
    });
  }
  return next(new Error("Credenciais inválidas"));
}

/**
 * Registra o usuário removendo o cookie do token.
 * @param {Object} req - Objeto de solicitação expressa contendo as credenciais do usuário.
 * @param {Object} res - Objeto de resposta expressa para enviar a resposta de logout.
 * @returns {Promise<void>} - Resolve quando o token é removido com sucesso e uma mensagem de sucesso é enviada.
 */
function logout(req, res) {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now() - 900000),
    });
    res.json({
      message: "Sucesso!",
    });
  } catch (e) {
    next(e);
  }
}

export { login, logout };
