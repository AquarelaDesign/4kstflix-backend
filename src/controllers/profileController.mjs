import { Profile, WatchList } from "../db/models/index.mjs";

/**
 * Cria um novo perfil para um usuário.
 *
 * @param {Object} req - O objeto de solicitação que contém as informações do perfil do usuário.
 * @param {Object} res - O objeto de resposta para enviar de volta o perfil criado.
 * @param {string} req.body.name - O nome do perfil.
 * @param {string} req.body.imageLink - O link para a imagem do perfil.
 * @param {string} req.body.userId - O ID do usuário associado ao perfil.
 *
 * @returns {Object} - O objeto de perfil criado.
 */
async function create(req, res) {
  const { name, imageLink, userId } = req.body;

  // Verifique quantos perfis
  const profiles = await Profile.findAll({
    where: { userId },
  });

  // Se houver 3 ou mais, retorne
  if (profiles.length >= 3) {
    res.status(422).end;
    return;
  }

  // Crie uma nova watchlist
  const watchList = await WatchList.create();

  // Crie um perfil com essa WatchListid
  const profile = await Profile.create({
    name,
    imageLink,
    userId,
    watchListId: watchList.dataValues.id,
  });

  res.send(profile.dataValues);
}

/**
 * Recupera os perfis associados a um usuário específico.
 *
 * @param {Object} req - O objeto de solicitação que contém o ID do usuário.
 * @param {string} req.params.userId - O ID do usuário cujos perfis devem ser recuperados.
 *
 * @returns {Object} - Uma matriz de objetos de perfil para o usuário especificado.
 */
async function getProfiles(req, res) {
  let userId = req.params.userId;
  const profiles = await Profile.findAll({
    where: { userId },
  });
  let profileData = [];
  if (profiles.length) {
    profileData = profiles.map((profile) => profile.dataValues);
  }
  res.send(profileData);
}

/**
 * Exclui um perfil por seu ID.
 *
 * @param {Object} req - O objeto de solicitação que contém o ID do perfil a ser excluído.
 * @param {string} req.params.profileId - O ID do perfil a ser excluído.
 *
 * @returns {void} - Sem valor de retorno. A função envia um código de status de 200 após a exclusão bem -sucedida.
 */
async function deleteProfile(req, res) {
  let id = req.params.profileId;
  const profile = await Profile.destroy({
    where: { id },
  });
  res.status(200).end();
}

export { create, getProfiles, deleteProfile };
