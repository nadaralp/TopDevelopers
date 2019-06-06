import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR } from './types';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:5000/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: response.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.statusText
        })
    }
}