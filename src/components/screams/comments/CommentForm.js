import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { submitComment } from "../../../redux/actions/dataActions";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Redux Stuff
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
	...theme.spreadThis
}));

function CommentForm({ ...props }) {
	const classes = useStyles();
	const [body, setBody] = useState("");
	const [isError, setIsError] = useState({});
	const { authenticated, submitComment, screamId, UI } = props;

	const handleChange = event => {
		setBody(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		submitComment(screamId, { body: body });
	};

	useEffect(() => {
		if (UI.isError) {
			setIsError(UI.isError);
		}
		if (!UI.isError && !UI.isLoading) {
			setBody("");
			setIsError({});
		}
	}, [UI.isError, UI.isLoading]);

	const commentFormMarkup = authenticated ? (
		<Grid item sm={12} style={{ textAlign: "center" }}>
			<form onSubmit={handleSubmit}>
				<TextField
					name="body"
					type="text"
					label="Comment a scream"
					error={isError.comment ? true : false}
					helperText={isError.comment}
					value={body}
					onChange={handleChange}
					fullWidth
					className={classes.textField}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className={classes.button}
				>
					Submit
				</Button>
			</form>
			<hr className={classes.visibleSeparatorr} />
		</Grid>
	) : null;
	return commentFormMarkup;
}

CommentForm.propTypes = {
	submitComment: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	UI: state.UI,
	authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(CommentForm);
