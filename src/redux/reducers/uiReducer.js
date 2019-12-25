import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from "../types";

const initialState = {
	isLoading: false,
	isError: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_ERRORS:
			return {
				...state,
				isLoading: false,
				isError: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				isLoading: false,
				isError: null
			};
		case LOADING_UI:
			return {
				...state,
				isLoading: true
			};
		case STOP_LOADING_UI:
			return {
				...state,
				isLoading: false
			}
		default:
			return state;
	};
};
