import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_PROFILE,
  LOG_OUT
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// REGISTER
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors;
    if (errors && errors.constructor.name === 'Array') {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else if (errors && errors.constructor.name === 'Object') {
      dispatch(setAlert(errors.msg, 'danger'));
    } else {
      dispatch({
        type: REGISTER_FAIL
      });
    }
  }
};

// Log in user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors;
    if (errors && errors.constructor.name === 'Array') {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else if (errors && errors.constructor.name === 'Object') {
      dispatch(setAlert(errors.msg, 'danger'));
    } else {
      dispatch({
        type: LOGIN_FAIL
      });
    }
  }
};

// Log out /clear profile
export const logout = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOG_OUT
  });
};
