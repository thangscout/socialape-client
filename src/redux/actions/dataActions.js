import {
	SET_SCREAMS,
	LOADING_DATA,
	UNLIKE_SCREAM,
	LIKE_SCREAM,
	DELETE_SCREAM,
	LOADING_UI,
	POST_SCREAM,
	SET_ERRORS,
	CLEAR_ERRORS,
	STOP_LOADING_UI,
	SET_SCREAM,
	SUMIT_COMMENT
} from "../types";
import axios from "axios";

// Get all screams
export const getScreams = source => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/screams`, { cancelToken: source.token })
		.then(res => {
			dispatch({
				type: SET_SCREAMS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: SET_SCREAMS,
				payload: []
			});
		});
};

// Get a scream
export const getScream = screamId => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/scream/${screamId}`)
		.then(res => {
			dispatch({
				type: SET_SCREAM,
				payload: res.data
			});
			dispatch({
				type: STOP_LOADING_UI
			});
		})
		.catch(err => console.log(err));
};

// Post a cream
export const postScream = newScream => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post(`/scream`, newScream)
		.then(res => {
			dispatch({
				type: POST_SCREAM,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

// Like a scream
export const likeScream = screamId => dispatch => {
	axios
		.get(`/scream/${screamId}/like`)
		.then(res => {
			dispatch({
				type: LIKE_SCREAM,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

// Unlike a scream
export const unlikeScream = screamId => dispatch => {
	axios
		.get(`/scream/${screamId}/unlike`)
		.then(res => {
			dispatch({
				type: UNLIKE_SCREAM,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

// Submit a comment
export const submitComment = (screamId, commnetData) => dispatch => {
	axios
		.post(`/scream/${screamId}/comment`, commnetData)
		.then(res => {
			dispatch({
				type: SUMIT_COMMENT,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

// Delete a scream
export const deleteScream = screamId => dispatch => {
	axios
		.delete(`/scream/${screamId}`)
		.then(() => {
			dispatch({ type: DELETE_SCREAM, payload: screamId });
		})
		.catch(err => console.log(err));
};

// Get Data User
export const getUserData = (userHandle) => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios.get(`/user/${userHandle}`)
		.then(res => {
			dispatch({
				type: SET_SCREAMS,
				payload: res.data.screams
			});
		})
		.catch(() => {
			dispatch({
				type: SET_SCREAMS,
				payload: null
			});
		});
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};
