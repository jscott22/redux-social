import {combineReducers} from 'redux';
import createPost from './create';
import deletePost from './delete';
import postList from './postList';

import {
    LIKE_POST
} from '../../actions/types';

const initialState = [];

const feed = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_POST:
            return state.map(post => {
                return post._id === action.payload.postId ?
                    {...post, likes: action.payload.likes} :
                    post
            });
        default:
            return state
    }
};

export default combineReducers({
    posts: postList,
    create: createPost,
    delete: deletePost,
});

