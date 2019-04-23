import {GET_MOVIE_SHOWS_LOADING, GET_MOVIE_SHOWS_LOADED, GET_MOVIE_SHOWS_FAIL} from '../actions/types';


const initialState = {
    isPeddingMovie: true,
    movies: {}
}



export default function(state=initialState, action) {
    switch(action.type){
        case GET_MOVIE_SHOWS_LOADING:
            return {
                ...state,
                isPeddingMovie: true,
                movies: {}
            };
        case GET_MOVIE_SHOWS_LOADED:
            return {
                ...state,
                isPeddingMovie: false,
                movies: action.payload
            };
        case GET_MOVIE_SHOWS_FAIL:
            return {
                ...state,
                isPeddingMovie: true,
                movies: {}
            };
        default:
            return state;
    }
}