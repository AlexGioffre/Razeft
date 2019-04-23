import {GET_HOME_SHOWS_LOADING, GET_HOME_SHOWS_LOADED, GET_HOME_SHOWS_FAIL} from '../actions/types';


const initialState = {
    isPeddingHome: true,
    shows: {}
}



export default function(state=initialState, action) {
    switch(action.type){
        case GET_HOME_SHOWS_LOADING:
            return {
                ...state,
                isPeddingHome: true,
                shows: {}
            };
        case GET_HOME_SHOWS_LOADED:
            return {
                ...state,
                isPeddingHome: false,
                shows: action.payload
            };
        case GET_HOME_SHOWS_FAIL:
            return {
                ...state,
                isPeddingHome: true,
                shows: {}
            };
        default:
            return state;
    }
}