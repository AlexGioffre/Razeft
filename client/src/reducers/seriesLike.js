import {ADD_OR_DELETE_SERIES_LIST, ADD_OR_DELETE_SERIES_LIST_ERROR} from '../actions/types';


const initialState = {
    msg: ""
}



export default function(state=initialState, action) {
    switch(action.type){
        case ADD_OR_DELETE_SERIES_LIST:
            return {
                ...state,
                msg: action.payload
            };
        case ADD_OR_DELETE_SERIES_LIST_ERROR:
            return {
                ...state,
                msg: action.payload
            };
        default:
            return state;
    }
}
