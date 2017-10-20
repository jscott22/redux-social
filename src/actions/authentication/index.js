import axios from 'axios';
import {ROOT_URL} from '../../config/config';
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_USER} from './types';

const fetchUser = {
    type: FETCH_USER
};

const unAuthUser = {
    type: UNAUTH_USER
};

const authError = (error) => ({
    type: AUTH_ERROR,
    payload: {
        user: null,
        error
    }
});

export const checkAuth = history => async dispatch => {
    try {
        dispatch(fetchUser);
        const response = await axios.get(`${ROOT_URL}/auth/checkauth`, {withCredentials: true});
        if (response.data.user) {
            return dispatch({
                type: AUTH_USER,
                payload: {
                    user: response.data.user,
                    error: null
                }
            });
        }
        dispatch(unAuthUser);
    } catch({response: {data: {message}}}) {
        dispatch(authError(message));
        history.push('/');
    }
};

export const signIn = ({email, password}, history) => async dispatch => {
    try {
        dispatch(fetchUser);
        const response = await axios.post(
            `${ROOT_URL}/auth/signin`,
            {email, password});
        if (response.data.user) {
            dispatch({
                type: AUTH_USER,
                payload: {
                    user: response.data.user,
                    error: null
                }
            });
            history.push('/feed');
        }
    } catch ({response: {data: {message}}}) {
        dispatch(authError("Invalid "));
    }
};

export const signOut = history => async dispatch =>{
    try {
        await axios.get(`${ROOT_URL}/auth/signout`);
        dispatch({type: UNAUTH_USER});
        history.push('/');
    } catch({response: {data: {message}}}) {
        dispatch(authError(message));
    }
};

export const signUp = (values, history) => async dispatch =>{
    try {
        dispatch(fetchUser);
        const response = await axios.post(
            `${ROOT_URL}/auth/signup`,
            {...values});
        if (response.data.user) {
            history.push('/signin');
        }
    } catch ({response: {data: {message}}}) {
        dispatch(authError(message));
    }
};