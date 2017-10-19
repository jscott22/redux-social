import {combineReducers} from 'redux';
import profile from './user-profile';
import posts from './user-posts';

import {
    FETCH_USER_PROFILE,
    USER_PROFILE_FAILURE,
    FETCH_USER_POSTS_REQUEST,
    FETCH_USER_POSTS_FAILURE
} from '../../actions/types';

const usersError = (state = null, action) => {
    switch(action.type) {
        case FETCH_USER_PROFILE:
        case FETCH_USER_POSTS_REQUEST:
            return null;
        case FETCH_USER_POSTS_FAILURE:
        case USER_PROFILE_FAILURE:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    profile,
    posts,
    error: usersError
})