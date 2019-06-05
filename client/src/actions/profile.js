import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, DELETE_ACCOUNT } from './types';

// Get the current users profile
export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.post('http://localhost:5000/api/profile', JSON.stringify(formData), config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile updated' : 'Profile has been created', 'light'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        console.log(err.response.data.errors);
        err.response.data.errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

// Add experience to the profile
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.put('http://localhost:5000/api/profile/experience', JSON.stringify(formData), config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');

    } catch (err) {
        // console.error(err.response.data);
        err.response.data.errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
};

// Add education to the profile
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.put('http://localhost:5000/api/profile/education', JSON.stringify(formData), config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');

    } catch (err) {
        console.log(err.response.data.errors);
        err.response.data.errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
};

export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Removed', 'danger'));
    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response.data
        })
    }
};

export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Removed', 'danger'));
    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response.data
        })
    }
};

// Delete account and profile

export const deleteAccount = () => async dispatch => {
    if (!window.confirm('Are you sure? This can NOT be undone!!')) { return }
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/`);
        dispatch({
            type: CLEAR_PROFILE
        });
        dispatch({
            type: DELETE_ACCOUNT
        })
        dispatch(setAlert('Your account has been deleted', 'light'));
    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response.data
        })
    }
};