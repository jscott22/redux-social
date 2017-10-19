import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE
} from '../../actions/posts/types';

const initial = {
    sending: false,
    error: null
};

export default (state = initial, action) => {
    switch(action.type) {
        case CREATE_POST_REQUEST:
            return {
                ...state,
                create: {
                    sending: true,
                    error: null
                }
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                create: {
                    sending: false,
                    error: null
                }
            };
        case CREATE_POST_FAILURE:
            return {
                ...state,
                create: {
                    sending: false,
                    error: action.payload
                }
            };
        default:
            return state;
    }
}