import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MyButton from "../../../util/MyButton";

// MUI Stuff
import {
	Button,
	TextField,
	Dialog,
	DialogContent,
	DialogTitle,
	CircularProgress
} from "@material-ui/core";

// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// Redux Stuff
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../../redux/actions/dataActions";

const useStyles = makeStyles(theme => ({
	...theme.spreadThis
}));

function PostScream({ ...props }) {
	const classes = useStyles();
	const { UI, postScream, clearErrors } = props;
	const [state, setState] = useState({
		open: false,
		body: "",
		isError: {}
	});

	const handleOpen = () => {
		setState({ ...state, open: true });
	};

	const handleClose = () => {
		clearErrors();
		setState(state => ({ ...state, open: false, isError: {} }));
	};

	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const handleSubmit = event => {
		event.preventDefault();
		postScream({ body: state.body });
	};

	useEffect(() => {
		if (UI.isError) {
			setState(state => ({ ...state, isError: UI.isError }));
		}
		if (!UI.isError && !UI.isLoading) {
			setState(state => ({ ...state, body: "", open: false, isError: {} }));
		}
	}, [UI.isError, UI.isLoading]);

	return (
		<div>
			<MyButton onClick={handleOpen} tip="Post a scream !">
				<AddIcon />
			</MyButton>
			<Dialog
				open={state.open}
				onClose={handleClose}
				fullWidth
				maxWidth="sm"
			>
				<div className={classes.postScremStyle}>
					<MyButton
						tip="Close"
						onClick={handleClose}
						tipClassName="close-button"
					>
						<CloseIcon />
					</MyButton>
					<DialogTitle>Post a new scream</DialogTitle>
					<DialogContent>
						<form onSubmit={handleSubmit}>
							<TextField
								name="body"
								type="text"
								label="SCREAM!!"
								multiline
								rows="3"
								placeholder="Scream at your fellow apes"
								error={state.isError.body ? true : false}
								helperText={state.isError.body}
								className={classes.textField}
								onChange={handleChange}
								fullWidth
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className="submit-button"
								disabled={UI.isLoading}
							>
								Submit
								{UI.isLoading && (
									<CircularProgress
										siz={30}
										className="progress-spinner"
									/>
								)}
							</Button>
						</form>
					</DialogContent>
				</div>
			</Dialog>
		</div>
	);
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProp = state => ({
	UI: state.UI
});

export default connect(mapStateToProp, { postScream, clearErrors })(PostScream);
