import {
    IMAGE_UPLOADING,
    IMAGE_UPLOAD_FAILURE,
    IMAGE_UPLOAD_SUCCESS
} from '../../actions/types';

const initialState = {
    uploading: false,
    error: null,
    uploads: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case IMAGE_UPLOADING:
            return {
                ...state,
                uploading: true
            };
        case IMAGE_UPLOAD_SUCCESS:
            return {
                ...state,
                uploading: false,
                uploads: [...state.uploads, action.payload]
            };
        case IMAGE_UPLOAD_FAILURE:
            return {
                ...state,
                uploading: false,
                error: action.payload
            };
        default:
            return state;
    }
}