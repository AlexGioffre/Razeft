import {GET_SERIES_DETTAIL_LOADED, GET_SERIES_DETTAIL_LOADING, GET_SERIES_DETTAIL_FAIL} from './types';


export const getSeriesDettails = (id) => (dispatch) => {
    dispatch({type: GET_SERIES_DETTAIL_LOADING})
    fetch(`/api/seriesId/${id}`,{
            headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
        })
        .then(response => response.json())
        .then(series => dispatch({type: GET_SERIES_DETTAIL_LOADED, payload: series}))
        .catch(err => dispatch({type: GET_SERIES_DETTAIL_FAIL, payload: err}));
}