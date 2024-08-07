import jwt from "jsonwebtoken";

import config from "../config/config.mjs";

const jwtConfig = config.jwtConfig;
const { secret, expiresIn } = jwtConfig;

import { Users } from "../db/models/index.mjs";

class AuthenticationError extends Error {
  constructor() {
    super("Unauthorized");

    // Mantém rastreamento de pilha adequada para onde nosso erro foi lançado (disponível apenas no V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }

    this.name = "AuthenticationError";
    this.status = 401;
  }
}

/**
 * Gera um token JWT para o usuário fornecido.
 *
 * @param {Object} user - O objeto do usuário para quem o token precisa ser gerado.
 * @param {string} user.id - O identificador exclusivo do usuário.
 * @param {string} user.email - O email do usuário.
 * @param {string} user.username - O nome de usuário do usuário.
 * @param {string} user.role - O papel do usuário.
 * @returns {string} - O token JWT gerado.
 */
function generateToken(user) {
  const data = user.toSafeObject();

  return jwt.sign({ data }, secret, {
    expiresIn: Number.parseInt(expiresIn),
  });
}

/**
 * Restaura o usuário do token JWT nos cookies de solicitação.
 *
 * @param {Object} req - O objeto de solicitação que contém os cookies.
 * @param {Object} _res - O objeto de resposta, não usado nesta função.
 * @param {Function} next - A próxima função de middleware na pilha.
 *
 * @returns {Promise<void>} - Uma promessa que resolve quando o usuário é restaurada ou rejeita com um AuthenticationError se o token for inválido ou o usuário não puder ser recuperado.
 */
function restoreUser(req, _res, next) {
  const { token } = req.cookies;
  if (!token) {
    const err = new AuthenticationError();
    return next(err);
  }

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      const err = new AuthenticationError();
      return next(err);
    }

    const userId = payload.data.id;

    try {
      req.user = await Users.getCurrentUserById(userId);
    } catch (e) {
      const err = new AuthenticationError();
      return next(err);
    }

    next();
  });
}

/**
 * Restaura o usuário do token JWT nos cookies de solicitação.
 *
 * @param {Object} req - O objeto de solicitação que contém os cookies.
 * @param {Object} _res - O objeto de resposta, não usado nesta função.
 * @param {Function} next - A próxima função de middleware na pilha.
 *
 * @returns {Promise<void>} - Uma promessa que resolve quando o usuário é restaurada ou rejeita com um AuthenticationError se o token for inválido ou o usuário não puder ser recuperado.
 */
async function getCurrentUser(req, _res, next) {
  if (!req.cookies) return next();
  const { token } = req.cookies;
  if (!token) return next();

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (!err) {
      const userId = payload.data.id;
      req.user = await Users.getCurrentUserById(userId);
    }
    return next();
  });
}

const requireUser = [restoreUser];
export { generateToken, requireUser, getCurrentUser, AuthenticationError };
