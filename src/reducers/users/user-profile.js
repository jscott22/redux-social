import {
    FETCH_USER_PROFILE,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
} from '../../actions/types';
import {PROMOTE_USER_SUCCESS} from '../../actions/users/types';

const initialState = {
    users: {},
    selectedUserId: null,
    fetchingProfile: false,
};

export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_USER_PROFILE:
            return {
                ...state,
                fetchingProfile: true,
                selectedUserId: null
            };

        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                fetchingProfile: false,
                selectedUserId: action.payload.userId,
                users: {
                    ...state.users,
                    [action.payload.userId]: action.payload.user
                },
            };

        case USER_PROFILE_FAILURE:
            return {
                ...state,
                fetchingProfile: false,
            };

        case PROMOTE_USER_SUCCESS:
            const userId = action.payload;

            const updatedUser = {
                ...state.users[userId],
                isAdmin: true
            };

            return {
                ...state,
                users: {
                    ...state.users,
                    [userId]: updatedUser
                }
            };
        default:
            return state;
    }
}