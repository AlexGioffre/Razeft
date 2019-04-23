import {SEARCH_LOADING, SEARCH_LOADED, SEARCH_FAIL}  from '../actions/types';


const initialState = {
    result: []
}



export default function(state=initialState, action) {
    switch(action.type){
        case SEARCH_LOADING:
            return {
                ...state,
                result: []
            };
        case SEARCH_LOADED:
            return {
                ...state,
                result: action.payload
            };
        case SEARCH_FAIL:
            return {
                ...state,
                result: []
            };
        default:
            return state;
    }
}