import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

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

// Add like
export const addLike = (postid) => async dispatch => {
    try {
        const response = await axios.put(`http://localhost:5000/api/posts/likes/${postid}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                postid,
                likes: response.data
            }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.data.msg
        })
    }
};

// Remove like
export const removeLike = (postid) => async dispatch => {
    try {
        const response = await axios.put(`http://localhost:5000/api/posts/unlike/${postid}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                postid,
                likes: response.data
            }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.data.msg
        })
    }
};