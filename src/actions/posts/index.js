import axios from 'axios';
import {ROOT_URL} from '../../config/config';
import {normalize} from 'normalizr';
import * as schema from '../normalizr';
import {
    LIKE_POST,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    FETCH_USER_POSTS_SUCCESS,
    FETCH_USER_POSTS_FAILURE,
    FETCH_USER_POSTS_REQUEST,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE
} from '../types';

export const fetchPosts = () => async  (dispatch) => {
    dispatch({type: FETCH_POSTS_REQUEST});
    try {
        const response = await axios.get(`${ROOT_URL}/api/posts`, {withCredentials: true});

        dispatch({
            type: FETCH_POSTS_SUCCESS,
            payload: normalize(response.data, schema.postsList)
        });
    } catch ({response: {data: {message}}}) {
        dispatch({
            type: FETCH_POSTS_FAILURE,
            payload: message
        })
    }
};

export const fetchUsersPosts = (userId) => async (dispatch) => {
  dispatch({type: FETCH_USER_POSTS_REQUEST});
  try {
      const response = await axios.get(`${ROOT_URL}/api/posts?userId=${userId}`, {withCredentials: true});
      dispatch({
          type: FETCH_USER_POSTS_SUCCESS,
          payload: {
              posts: normalize(response.data, schema.postsList)
          }
      });
  } catch ({response: {data: {message}}}) {
      dispatch({
          type: FETCH_USER_POSTS_FAILURE,
          payload: message
      });
  }
};

export const likePost = (liked, postId) => (
    async (dispatch) => {
        try {
            let response;
            if (!liked) {
                response = await axios.post(`${ROOT_URL}/api/post/like`, {postId}, {withCredentials: true});
            } else {
                response = await axios.post(`${ROOT_URL}/api/post/unlike`, {postId}, {withCredentials: true});
            }
            dispatch({
                type: LIKE_POST,
                payload: {
                    postId,
                    likes: response.data
                }
            })
        } catch ({response: {data: {error}}}) {
            console.warn(error);
        }
    }
);

export const createPost = ({title, content}, imageData, history) => (
    async(dispatch) => {
        try {
            dispatch({type: CREATE_POST_REQUEST});
            let imageURL = null;
            if (imageData) {
                const imageResponse = await axios.post(
                    'https://api.cloudinary.com/v1_1/deswiog5g/image/upload',
                    imageData,
                    {headers: {"X-Requested-With": "XMLHttpRequest"}}
                );
                imageURL = imageResponse.data.secure_url;
            }
            const response = await axios.post(
                `${ROOT_URL}/api/post/create`,
                {title, content, imageURL},
                {withCredentials: true}
            );
            dispatch({
                type: CREATE_POST_SUCCESS,
                payload: normalize(response.data, schema.post)
            });
            history.push('/feed');
        } catch({response: {data: message}}) {
            dispatch({
                type: CREATE_POST_FAILURE,
                payload: message
            });
        }
    }
);

export const deletePost = (postId) => (
  async (dispatch) => {
      try {
          dispatch({type: DELETE_POST_REQUEST});
          const response = await axios.delete(
              `${ROOT_URL}/api/post`,
              {data: {postId}}
          );
          dispatch({
              type: DELETE_POST_SUCCESS,
              payload: response.data.removedPost._id
          })
      } catch ({response: {data: {message}}}) {
          console.warn(message);
          dispatch({
              type: DELETE_POST_FAILURE,
              payload: message
          });
      }
  }
);