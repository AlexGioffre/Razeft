import axios from 'axios';

import {
    USER_LOADED,
    USER_LOADING,
    USER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

import {returnErrors} from './errorActions'

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    axios
        .get('/api/profile', config)
        .then(res =>
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        )
        .catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type:USER_FAIL
            })
        })

}


export const register = ({name, email, password} ) => dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json",
        }
    }
    const body = JSON.stringify({name, email, password});

    axios.post('/api/signup', body, config)
        .then(response => dispatch({type: REGISTER_SUCCESS, payload: response.data}))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({type: REGISTER_FAIL})
        })
}

export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const body = JSON.stringify({email, password});

    axios.post('/api/signin', body, config)
        .then(response => dispatch({type: LOGIN_SUCCESS, payload: response.data}))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"))
            dispatch({type: LOGIN_FAIL})
        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

