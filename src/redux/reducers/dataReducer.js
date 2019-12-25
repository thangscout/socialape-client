import {
	SET_SCREAMS,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	LOADING_DATA,
	DELETE_SCREAM,
	POST_SCREAM,
	SET_SCREAM,
	SUMIT_COMMENT
} from "../types";

const initialState = {
	screams: [],
	scream: {},
	isLoading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				isLoading: true
			};
		case SET_SCREAMS:
			return {
				...state,
				screams: action.payload,
				isLoading: false
			};
		case SET_SCREAM:
			return {
				...state,
				scream: action.payload
			};
		case LIKE_SCREAM:
		case UNLIKE_SCREAM:
			let index = state.screams.findIndex(
				scream => scream.screamId === action.payload.screamId
			);
			state.screams[index] = action.payload;
			if (state.scream.screamId === action.payload.screamId) {
				state.scream = action.payload;
			}
			return {
				...state
			};
		case DELETE_SCREAM:
			return {
				...state,
				screams: state.screams.filter(
					scream => scream.screamId !== action.payload
				)
			};
		case POST_SCREAM:
			return {
				...state,
				screams: [action.payload, ...state.screams]
			};
		case SUMIT_COMMENT:
			return {
				...state,
				scream: {
					...state.scream,
					comments: [action.payload, ...state.scream.comments]
				}
			}
		default:
			return state;
	}
}
