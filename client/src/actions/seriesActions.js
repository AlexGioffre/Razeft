import {GET_SERIES_SHOWS_LOADING, GET_SERIES_SHOWS_LOADED, GET_SERIES_SHOWS_FAIL} from './types';



export const getSeriesShows = () => (dispatch) => {
    dispatch({type: GET_SERIES_SHOWS_LOADING})
    fetch('/api/series')
        .then(response => response.json())
        .then(series => dispatch({type: GET_SERIES_SHOWS_LOADED, payload: series}))
        .catch(err => dispatch({type: GET_SERIES_SHOWS_FAIL, payload: "Error with API"}));
}