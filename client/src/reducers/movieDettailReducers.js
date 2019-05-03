import {GET_MOVIE_DETTAIL_LOADING, GET_MOVIE_DETTAIL_LOADED, GET_MOVIE_DETTAIL_FAIL} from '../actions/types';


const initialState = {
    isPeddingDettails: true,
    movie: {}
}



export default function(state=initialState, action) {
    switch(action.type){
        case GET_MOVIE_DETTAIL_LOADING:
            return {
                ...state,
                isPeddingDettails: true,
                movie: {}
            };
        case GET_MOVIE_DETTAIL_LOADED:
            return {
                ...state,
                isPeddingDettails: false,
                movie: action.payload
            };
        case GET_MOVIE_DETTAIL_FAIL:
            return {
                ...state,
                isPeddingDettails: true,
                movie: {}
            };
        default:
            return state;
    }
}
