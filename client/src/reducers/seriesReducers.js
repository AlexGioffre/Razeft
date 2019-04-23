import {GET_SERIES_SHOWS_LOADING, GET_SERIES_SHOWS_LOADED, GET_SERIES_SHOWS_FAIL} from '../actions/types';


const initialState = {
    isPeddingSeries: true,
    series: {}
}



export default function(state=initialState, action) {
    switch(action.type){
        case GET_SERIES_SHOWS_LOADING:
            return {
                ...state,
                isPeddingSeries: true,
                series: {}
            };
        case GET_SERIES_SHOWS_LOADED:
            return {
                ...state,
                isPeddingSeries: false,
                series: action.payload
            };
        case GET_SERIES_SHOWS_FAIL:
            return {
                ...state,
                isPeddingSeries: true,
                series: {}
            };
        default:
            return state;
    }
}