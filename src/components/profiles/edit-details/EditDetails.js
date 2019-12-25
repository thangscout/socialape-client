import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MyButton from "../../../util/MyButton";

// Redux Stuff
import { connect } from "react-redux";
import { editUserDetails } from "../../../redux/actions/userActions";

// MUI Stuff
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from "@material-ui/core";

// Icons
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
	...theme.spreadThis,
	button: {
		float: "right"
	}
}));

function EditDetails({ ...props }) {
	const [state, setState] = useState({
		bio: "",
		website: "",
		location: "",
		open: false
	});
	const classes = useStyles();
	const { bio, website, location, open } = state;

	const { credentials, editUserDetails } = props;
	const mapUserDetailsToState = credentials => {
		setState(state => ({
			...state,
			bio: credentials.bio ? credentials.bio : "",
			website: credentials.website ? credentials.website : "",
			location: credentials.location ? credentials.location : ""
		}));
	};

	useEffect(() => {
		mapUserDetailsToState(credentials);
	}, [credentials]);

	const handleOpen = () => {
		setState({ ...state, open: true });
		mapUserDetailsToState(credentials);
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	const handleSubmit = () => {
		const userDetails = {
			bio: bio,
			website: website,
			location: location
		};
		editUserDetails(userDetails);
		handleClose();
	};

	const handleChangeInput = event => {
		setState({
			...state,
			[event.target.name]: event.target.value
		});
	};

	return (
		<>
			<MyButton tip="Edit details" onClick={handleOpen} btnClassName={classes.button}>
				<EditIcon color="primary" />
			</MyButton>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Edit your details</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							name="bio"
							type="text"
							label="Bio"
							multiline
							row="3"
							placeholder="A short bio abour yourself"
							className={classes.textField}
							value={bio}
							onChange={handleChangeInput}
							fullWidth
						/>
						<TextField
							name="website"
							type="text"
							label="Webstie"
							placeholder="Your personal/professinal website"
							className={classes.textField}
							value={website}
							onChange={handleChangeInput}
							fullWidth
						/>
						<TextField
							name="location"
							type="text"
							label="Location"
							placeholder="Where you live"
							className={classes.textField}
							value={location}
							onChange={handleChangeInput}
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
