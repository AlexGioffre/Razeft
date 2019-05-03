import {GET_MOVIE_DETTAIL_LOADING, GET_MOVIE_DETTAIL_LOADED, GET_MOVIE_DETTAIL_FAIL, ADD_OR_DELETE_MOVIE_LIST, ADD_OR_DELETE_MOVIE_LIST_ERROR} from './types';
import axios from 'axios';


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

export const likeMovie = (id) => (dispatch, getState) => {
        const token = getState().auth.token;
        const config = {
                headers: {
                "Content-Type": "application/json"
                }
        }

        if (token) {
                config.headers['x-auth-token'] = token;
        }

        axios.put(`/api/movieId/${id}/like`, null, config)
                .then(res => dispatch({type: ADD_OR_DELETE_MOVIE_LIST, payload: res.data}))
                .catch(res => dispatch({type: ADD_OR_DELETE_MOVIE_LIST_ERROR, payload: res.data}))
}