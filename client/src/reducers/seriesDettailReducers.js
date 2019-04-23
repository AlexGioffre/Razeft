import {GET_SERIES_DETTAIL_LOADED, GET_SERIES_DETTAIL_LOADING, GET_SERIES_DETTAIL_FAIL} from '../actions/types';


const initialState = {
    isPeddingDettails: true,
    series: {}
}



export default function(state=initialState, action) {
    switch(action.type){
        case GET_SERIES_DETTAIL_LOADING:
            return {
                ...state,
                isPeddingDettails: true,
                series: {}
            };
        case GET_SERIES_DETTAIL_LOADED:
            return {
                ...state,
                isPeddingDettails: false,
                series: action.payload
            };
        case GET_SERIES_DETTAIL_FAIL:
            return {
                ...state,
                isPeddingDettails: true,
                series: {}
            };
        default:
            return state;
    }
}