import {
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE
} from '../../actions/types';

const initial = {
    requesting: false,
    error: null
};

export default (state = initial, action) => {
    switch(action.type) {
        case DELETE_POST_REQUEST:
            return {
                requesting: true,
                error: null
            };
        case DELETE_POST_SUCCESS:
            return {
                requesting: false,
                error: null
            };
        case DELETE_POST_FAILURE:
            return {
                requesting: false,
                error: action.payload
            };
        default:
            return state;
    }
};