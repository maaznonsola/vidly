import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = {...movie};
    delete body._id;
    return http.put(apiEndpoint + "/" + movie._id, body);
  }
  return http.post(movieUrl(movie._id), movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
