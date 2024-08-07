import axios from "axios";
import config from "../config/config.mjs";

const {
  tmdbApiKey,
  tmdbApiAccountId,
  tmdbApiAccessToken,
  language,
  region,
  originalLanguage,
} = config;
/*
const routeMatch = {
  tr: `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}&language=${language}&page=4&region=${region}`,
  pn: `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=${language}&page=1`,
  ctv: `https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&language=${language}&sort_by=popularity.desc&page=1&with_genres=35&with_original_language=${originalLanguage}`,
  hm: `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=27`,
  am: `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=28&page=3`,
  dtv: `https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&language=${language}&sort_by=popularity.desc&page=1&with_genres=18&with_original_language=${originalLanguage}`,
  cm: `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=35&page=2`,
  stv: `https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&language=${language}&sort_by=popularity.desc&page=1&with_genres=10765&with_original_language=${originalLanguage}`,
  // 'Trending Now': `https://api.themoviedb.org/3/trending/all/week?api_key=${tmdbApiKey}&language=${language}&page=2`,
  // documentary: `/discover/movie?api_key=${tmdbApiKey}&with_genres=99`,
};
*/
/**
 * Busca conteúdo da API do banco de dados de filmes (TMDB) com base na rota e parâmetros fornecidos.
 *
 * @param {Object} req - Objeto de solicitação expressa contendo o objeto Params com o contentId.
 * @param {Object} res - Objeto de resposta expressa para enviar os dados de conteúdo buscados.
 * @returns {Promise<void>} - Resolve quando o conteúdo é buscado e enviado com sucesso, ou rejeita com um status 404 se a rota não existir.
 */
async function getContent(req, res) {
  const genres = req.params.genres;

  const routeMatch = {
    tr: `https://api.themoviedb.org/3/movie/top_rated?language=${language}&page=1`,
    pn: `https://api.themoviedb.org/3/movie/popular?language=${language}&page=1`,
    ctv: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${language}&page=1&sort_by=popularity.desc&with_genres=${
      genres || 35
    }&with_original_language=${originalLanguage}`,
    dtv: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${language}&page=1&sort_by=popularity.desc&with_genres=${
      genres || 18
    }&with_original_language=${originalLanguage}`,
    stv: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${language}&page=1&sort_by=popularity.desc&with_genres=${
      genres || 10765
    }&with_original_language=${originalLanguage}`,
    hm: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${language}&page=1&sort_by=popularity.desc&with_genres=${
      genres || 27
    }`,
    am: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${language}&page=3&sort_by=popularity.desc&with_genres=${
      genres || 28
    }`,
    cm: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${language}&page=2&sort_by=popularity.desc&with_genres=${
      genres || 35
    }`,
    // 'Trending Now': `https://api.themoviedb.org/3/trending/all/week?api_key=${tmdbApiKey}&language=${language}&page=2`,
    // documentary: `/discover/movie?api_key=${tmdbApiKey}&with_genres=99`,
  };

  const route = routeMatch[req.params.contentId];
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiAccessToken}`,
    },
  };
  const response = await axios(route, options);
  if (response.status === 200) {
    const { data } = response;
    res.status(200).json({ data });
  }
  res.status(404).end();
}

async function getGender(req, res) {
  const type = req.params.type || "movie";
  const route = `https://api.themoviedb.org/3/genre/${type.toLowerCase()}/list?language=${language}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiAccessToken}`,
    },
  };
  const response = await axios(route, options);
  if (response.status === 200) {
    const { data } = response;
    res.status(200).json({ data });
  }
  res.status(404).end();
}

export { getContent, getGender };
