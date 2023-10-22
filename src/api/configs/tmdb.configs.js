const mediaType = {
  movie: "movie",
  tv: "tv",
};

const mediaCategory = {
  populer: "populer",
  top_rated: "top_rated",
};

const backdropPath = (imgEndpoint) =>
  `https://image.tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint) =>
  `https://image.tmdb.org/t/p/w500${imgEndpoint}`;

const youtubePath = (videoId) =>
  `https://www.youtube.com/embed/${videoId}?constrols=0`;

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
};

export default tmdbConfigs;
