import {AUTH_USER, FETCH_USER, UNAUTH_USER, AUTH_ERROR} from '../../actions/types';

const initialState = {
    authenticated: null,
    fetching: false,
    user: null,
    error: null
};

export default function auth (state = initialState, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: true,
                fetching: false,
                ...action.payload
            };
        case FETCH_USER:
            return {
                ...state,
                fetching: true
            };
        case UNAUTH_USER:
            return {
                ...state,
                authenticated: false,
                fetching: false,
                user: null,
                error: null
            };
        case AUTH_ERROR:
            return {
                ...state,
                authenticated: false,
                fetching: false,
                ...action.payload
            };
        default:
            return state;
    }
}