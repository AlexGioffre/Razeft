import {SEARCH_LOADING, SEARCH_LOADED, SEARCH_FAIL} from './types'

export const SearchShow = (query) => (dispatch) => {
    if(query.length <= 0){
        return -1;
    } else {
        const text = document.createTextNode(query);
        const searchElement = text.substringData(0, text.length);
        dispatch({type: SEARCH_LOADING})
        fetch(`/api/search/${searchElement}`,{
            headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
        })
        .then(response => response.json())
        .then(result => dispatch({type: SEARCH_LOADED, payload: result}))
        .catch(err => dispatch({type: SEARCH_FAIL, payload: err}));
    }
}