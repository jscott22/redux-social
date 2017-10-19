import {combineReducers} from 'redux';
import { reducer as form } from 'redux-form';

import auth from './authentication/index';
import posts from './posts/index';
import imageUpload from './upload/upload';
import users from './users/index';


const rootReducer = combineReducers({
    auth,
    posts,
    form,
    imageUpload,
    users
});

export default rootReducer;