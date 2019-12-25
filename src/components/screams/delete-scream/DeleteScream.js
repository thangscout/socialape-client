import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MyButton from "../../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// Redux 
import { connect } from "react-redux";
import { deleteScream } from "../../../redux/actions/dataActions";

const useStyles = makeStyles(theme => ({
	...theme.spreadThis
}));

function DeleteScream({ ...props}){
	const [open, setOpen] = useState(false);
	const classes = useStyles();

	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	const deleteScream = () => {
		props.deleteScream(props.screamId);
		setOpen(false);
	}

	return (
		<div className={classes.deleteScream}>
			<MyButton tip="Delete Scream" onClick={handleOpen} btnClassName="button">
				<DeleteOutline color="secondary" />
			</MyButton>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>
					Are you sure you want to delete this scream ?
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={deleteScream} color="secondary">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

DeleteScream.propTypes = {
	deleteScream: PropTypes.func.isRequired
}

export default connect(null, { deleteScream })(DeleteScream);