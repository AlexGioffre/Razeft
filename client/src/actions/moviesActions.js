import {GET_MOVIE_SHOWS_LOADING, GET_MOVIE_SHOWS_LOADED, GET_MOVIE_SHOWS_FAIL} from './types';



export const getMoviesShows = () => (dispatch) => {
    dispatch({type: GET_MOVIE_SHOWS_LOADING})
    fetch('/api/movies')
        .then(response => response.json())
        .then(movies => dispatch({type: GET_MOVIE_SHOWS_LOADED, payload: movies}))
        .catch(err => dispatch({type: GET_MOVIE_SHOWS_FAIL, payload: "Error with API"}));
}