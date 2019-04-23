import {GET_MOVIE_DETTAIL_LOADING, GET_MOVIE_DETTAIL_LOADED, GET_MOVIE_DETTAIL_FAIL} from './types';


export const getMovieDettails = (id) => (dispatch) => {
    dispatch({type: GET_MOVIE_DETTAIL_LOADING})
    fetch(`/api/movieId/${id}`,{
            headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
        })
        .then(response => response.json())
        .then(movie => dispatch({type: GET_MOVIE_DETTAIL_LOADED, payload: movie}))
        .catch(err => dispatch({type: GET_MOVIE_DETTAIL_FAIL, payload: err}));
}