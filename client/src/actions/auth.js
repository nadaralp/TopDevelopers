import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS, REGISTER_FAIL, AUTH_ERROR, AUTH_SUCCESS, LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT, CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';


//REGISTER USER
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('http://localhost:5000/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(queryUser())
        dispatch(setAlert('Registered Successfully !', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const queryUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('http://localhost:5000/api/auth');
        dispatch({
            type: AUTH_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Login user 
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('http://localhost:5000/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(queryUser())
        dispatch(setAlert('Logged In Successfully !', 'success'))
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            // console.log(errors);
            if (Array.isArray(errors)) {
                errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')))
            }
            if (errors.__proto__ === {}.__proto__) {
                dispatch(setAlert(errors.msg, 'danger'))
            }
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout / clear profiles
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch(setAlert("You have been logged out", "light"))
}