import {
    FETCH_USER_POSTS_SUCCESS,
    FETCH_USER_POSTS_REQUEST,
    FETCH_USER_POSTS_FAILURE
} from '../../actions/types';

const initialState = {
    fetchingPosts: false,
    posts: {},
    postIds: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_POSTS_REQUEST:
            return {
                ...state,
                error: null,
                fetchingPosts: true
            };

        case FETCH_USER_POSTS_SUCCESS:
            return {
                ...state,
                fetchingPosts: false,
                posts: {
                    ...action.payload.posts.entities.posts
                },
                postIds: [
                    ...action.payload.posts.result.posts
                ]
            };
        case FETCH_USER_POSTS_FAILURE:
            return {
                ...state,
                fetchingPosts: false,
                error: action.payload
            };
        default:
            return state;
    }
};