const favoriteUtils = {
  check: ({ listFavorites, mediaId }) =>
    listFavorites &&
    listFavorites.find((e) => e.mediaId.toString() === mediaId) !== undefined,
};
export default favoriteUtils;
