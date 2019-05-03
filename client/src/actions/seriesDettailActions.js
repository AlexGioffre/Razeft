import {GET_SERIES_DETTAIL_LOADED, GET_SERIES_DETTAIL_LOADING, GET_SERIES_DETTAIL_FAIL, ADD_OR_DELETE_SERIES_LIST, ADD_OR_DELETE_SERIES_LIST_ERROR} from './types';
import axios from 'axios';

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

export const likeSeries = (id) => (dispatch, getState) => {
        const token = getState().auth.token;
        const config = {
                headers: {
                "Content-Type": "application/json"
                }
        }

        if (token) {
                config.headers['x-auth-token'] = token;
        }

        axios.put(`/api/seriesId/${id}/like`, null, config)
                .then(res => dispatch({type: ADD_OR_DELETE_SERIES_LIST, payload: res.data}))
                .catch(res => dispatch({type: ADD_OR_DELETE_SERIES_LIST_ERROR, payload: res.data}))
}