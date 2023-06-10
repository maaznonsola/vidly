import React, {Component} from "react";
import {getMovies, deleteMovie} from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import {paginate} from "../utils/paginate";
import {getGenres} from "../services/genreService";
import {Link} from "react-router-dom";
import SearchBox from "./searchBox";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: {path: "title", order: "asc"},
  };
  async componentDidMount() {
    const {data} = await getGenres();
    const genres = [{_id: "", name: "All Genres"}, ...data];
    this.setState({movies: getMovies(), genres});
  }
  handleSort = (sortColumn) => {
    this.setState({sortColumn});
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({movies});
    deleteMovie(movie._id);
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
  };
  handlePageChange = (page) => {
    this.setState({currentPage: page});
  };
  handleGenreSelect = (genre) => {
    this.setState({selectedGenre: genre, searchQuery: "", currentPage: 1});
  };
  handleSearch = (query) => {
    this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
  };
  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      sortColumn,
      currentPage,
      selectedGenre,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return {totalCount: filtered.length, data: movies};
  };
  render() {
    const {length: count} = this.state.movies;

    const {pageSize, currentPage, sortColumn, searchQuery} = this.state;

    if (count === 0) return <p>There are no movies in database.</p>;

    const {totalCount, data: movies} = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{marginBottom: 20}}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
