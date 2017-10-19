import {combineReducers} from 'redux';

import {
    LIKE_POST,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    CREATE_POST_SUCCESS,
    DELETE_POST_SUCCESS
} from '../../actions/types';

const updateLikes = (state, action) => {
    return {
        ...state,
        likes: action.payload.likes
    }
};

export const byId = (state = {}, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return action.payload.entities.posts;
        case LIKE_POST:
            return {
                ...state,
                [action.payload.postId]: updateLikes(state[action.payload.postId], action)
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                [action.payload.result]: action.payload.entities.posts[action.payload.result]
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                [action.payload]: undefined
            };
        default:
            return state;
    }
};

export const postIds = (state = [], action) => {
    switch(action.type) {
        case FETCH_POSTS_SUCCESS:
            return action.payload.result.posts;
        case CREATE_POST_SUCCESS:
            return [action.payload.result, ...state];
        case DELETE_POST_SUCCESS:
            return state.filter((id) => id !== action.payload);
        default:
            return state;
    }
};

export const fetching = (state = false, action) => {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return true;
        case FETCH_POSTS_SUCCESS:
        case FETCH_POSTS_FAILURE:
            return false;
        default:
            return state;
    }
};

export const error = (state = null, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
        case FETCH_POSTS_REQUEST:
            return null;
        case FETCH_POSTS_FAILURE:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
   byId,
   postIds,
   fetching,
   error
});