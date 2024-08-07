import fetch from "axios";
import config from "../config/config.mjs";

const { tmdbApiKey, language } = config;

/**
 * Obtém os vídeos para um programa de TV específico da API de banco de dados de filmes (TMDB).
 *
 * @param {Object} req - O objeto de solicitação que contém o ID do programa de TV nos parâmetros.
 * @param {Object} res - O objeto de resposta para enviar os dados buscados.
 *
 * @returns {void}
 *
 * @throws Lançará um erro se a solicitação da API do TMDB falhar.
 *
 * @example
 * getVideos(req, res);
 */
async function getVideos(req, res) {
  let id = req.params.id;
  let response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${tmdbApiKey}&language=${language}`
  );
  if (response.ok) {
    let data = await response.json();
    res.json(data.results);
    return;
  }
}

export default getVideos;
