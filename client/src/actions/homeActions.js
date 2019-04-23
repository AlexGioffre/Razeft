import {GET_HOME_SHOWS_LOADING, GET_HOME_SHOWS_LOADED, GET_HOME_SHOWS_FAIL} from './types';



export const getHomeShows = () => (dispatch) => {
    dispatch({type: GET_HOME_SHOWS_LOADING})
    fetch('/api/data')
        .then(response => response.json())
        .then(shows => dispatch({type: GET_HOME_SHOWS_LOADED, payload: shows}))
        .catch(err => dispatch({type: GET_HOME_SHOWS_FAIL, payload: "Error with API"}));
}