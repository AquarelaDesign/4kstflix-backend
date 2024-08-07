import { WatchList } from "../db/models/index.mjs";

/**
 * Adiciona um novo item à lista de observação especificada por ID.
 *
 * @param {Object} req - Objeto de solicitação expressa contendo os parâmetros e o corpo.
 * @param {Object} res - Objeto de resposta expressa para enviar o resultado.
 * @param {string} req.params.watchListId - O ID da lista de observação para adicionar o item.
 * @param {string} req.body.path - O caminho do item a ser adicionado à lista de observação.
 *
 * @returns {Promise<Object>} - Retorna o conteúdo da lista de relógios atualizados com o novo item adicionado.
 */
async function addWatchListById(req, res) {
  let watchListId = req.params.watchListId;
  let watchListContent = await WatchList.findAll({
    where: { watchListId },
  });

  if (watchListContent.length > 20) {
    res.status(422).end();
    return;
  }

  if (watchListContent.map((wc) => wc.poster_path).includes(req.body.path)) {
    res.status(422).end();
    return;
  }

  let newItem = await WatchList.create({
    watchListId,
    poster_path: req.body.path,
  });

  res.json([...watchListContent, newItem]);
}

/**
 * Exclui um item de conteúdo específico da lista de observação especificada.
 *
 * @param {Object} req - Objeto de solicitação expressa contendo os parâmetros e o corpo.
 * @param {Object} res - Objeto de resposta expressa para enviar o resultado.
 * @param {string} req.params.contentId - O ID do item de conteúdo a ser excluído da lista de observação.
 * @param {string} req.body.watchListId - O ID da lista de observação à qual o item de conteúdo pertence.
 *
 * @returns {Promise<Object>} - Retorna a lista de conteúdo atualizada sem o item excluído.
 */
async function deleteWatchListContent(req, res) {
  let id = req.params.contentId;
  let watchListId = req.body.watchListId;

  await WatchList.destroy({
    where: { id },
  });

  let watchListContent = await WatchList.findAll({
    where: { watchListId },
  });

  res.json(watchListContent);
}

/**
 * Recupera o conteúdo de uma lista de observação especificada por seu ID.
 *
 * @param {Object} req - Objeto de solicitação expressa contendo os parâmetros e o corpo.
 * @param {Object} res - Objeto de resposta expressa para enviar o resultado.
 * @param {string} req.params.watchListId - O ID da lista de observação para recuperar seu conteúdo.
 *
 * @returns {Promise<Object>} - Retorna o conteúdo da lista de observação especificada.
 */
async function getWatchListById(req, res) {
  let watchListId = req.params.watchListId;
  let watchListContent = await WatchList.findAll({
    where: { watchListId },
  });
  res.json(watchListContent);
}

export { addWatchListById, deleteWatchListContent, getWatchListById };
