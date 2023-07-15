import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(apiEndpoint + "/" + id);
}

export async function saveMovie(movie) {}

export function deleteMovie(id) {
  return http.delete(apiEndpoint + "/" + id);
}
