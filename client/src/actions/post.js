import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST } from './types';

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

// Delete post
export const deletePost = (postid) => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/posts/${postid}`)
        dispatch({
            type: DELETE_POST,
            payload: postid
        });
        dispatch(setAlert(response.data.msg, 'success'))
    } catch (err) {
        console.log(err);
        dispatch({
            type: POST_ERROR,
            payload: err.response.data.msg
        })
    }
};

// Add Post
export const addPost = (text) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await axios.post(`http://localhost:5000/api/posts/`, JSON.stringify(text), config)
        dispatch({
            type: ADD_POST,
            payload: response.data
        });
        dispatch(setAlert("Post Created", 'success'))
    } catch (err) {
        console.log(err);
        dispatch({
            type: POST_ERROR,
            payload: err.response.statusText
        })
    }
};

// Get post
export const getPost = (postid) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:5000/api/posts/${postid}`)
        dispatch({
            type: GET_POST,
            payload: response.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.statusText
        })
    }
}