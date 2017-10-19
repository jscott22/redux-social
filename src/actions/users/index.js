import axios from 'axios';
import {ROOT_URL} from '../../config/config';
import {
    FETCH_USER_PROFILE,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
    REMOVE_USER_REQUEST,
    REMOVE_USER_SUCCESS,
    REMOVE_USER_FAILURE,
    PROMOTE_USER_REQUEST,
    PROMOTE_USER_FAILURE,
    PROMOTE_USER_SUCCESS
} from './types';

export const getUserProfile = (userId) => (
    async (dispatch) => {
        try {
            dispatch({type: FETCH_USER_PROFILE});
            const response = await axios.get(
                `${ROOT_URL}/api/user/profile?userId=${userId}`,
                {withCredentials: true});
            dispatch({
                type: USER_PROFILE_SUCCESS,
                payload: {
                    userId,
                    user: response.data.user
                }
            });
        } catch({response: {statusText}}) {
            dispatch({type: USER_PROFILE_FAILURE, payload: statusText});
        }
    }
);

export const removeUser = (userId, history) => (
    async (dispatch) => {
        try {
            dispatch({
                type: REMOVE_USER_REQUEST
            });
            await axios.delete(
                `${ROOT_URL}/api/user?userId=${userId}`,
                {withCredentials: true});
            dispatch({
                type: REMOVE_USER_SUCCESS
            });
            history.push('/feed');
        } catch({response: {data: {message}}}) {
            dispatch({
                type: REMOVE_USER_FAILURE,
                payload: message
            });
        }
    }
);

export const promoteUser = (userId, history) => (
    async (dispatch) => {
        try {
            dispatch({
                type: PROMOTE_USER_REQUEST
            });
            await axios.patch(
                `${ROOT_URL}/api/user/promote?userId=${userId}`,
                {withCredentials: true});
            dispatch({
                type: PROMOTE_USER_SUCCESS,
                payload: userId
            });
        } catch({response: {data: {message}}}) {
            dispatch({
                type: PROMOTE_USER_FAILURE,
                payload: message
            });
        }
    }
);