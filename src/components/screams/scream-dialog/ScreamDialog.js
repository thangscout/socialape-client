import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MyButton from "../../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LikeButton from "../like-button/LikeButton";
import Comments from "../comments/Comments";
import CommentForm from "../comments/CommentForm";

// MUI Stuff
import {
	Dialog,
	DialogContent,
	CircularProgress,
	Grid,
	Typography
} from "@material-ui/core";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../../redux/actions/dataActions";

const useStyles = makeStyles(theme => ({
	...theme.spreadThis,
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: '50%',
		objectFit: 'cover'
	},
	dialogContent: {
		padding: 20
	},
	closeButton: {
		position: 'absolute',
		left: '90%'
	},
	expandButton: {
		position: 'absolute',
		left: '90%'
	},
	spinnerDiv: {
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 50
	}
}));

function ScreamDialog({ ...props }) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [oldPath, setOldPath] = useState('');
	const [newPath, setNewPath] = useState('');
	const {
		getScream,
		clearErrors,
		scream: {
			// screamId,
			body,
			createdAt,
			likeCount,
			commentCount,
			userImage,
			comments
		},
		screamId,
		userHandle,
		UI: { isLoading },
		openDialog
	} = props;

	const handleOpen = useCallback(() => {
		let oldPath = window.location.pathname;
		const newPath = `/users/${userHandle}/scream/${screamId}`;
		
		if (oldPath === newPath) oldPath = `/users/${userHandle}`;

		window.history.pushState(null, null, newPath);
		setOpen(true);
		getScream(screamId);
		setOldPath(oldPath);
		setNewPath(newPath);
	}, [getScream, screamId, userHandle]);

	const handleClose = () => {
		window.history.pushState(null, null, oldPath);
		setOpen(false);
		clearErrors();
	};

	useEffect(() => {
		if (openDialog) {
			handleOpen();
		}
	}, [openDialog, handleOpen]);

	const dialogMarkup = isLoading ? (
		<div className={classes.spinnerDiv}>
			<CircularProgress size={200} thickness={2}/>
			<span style={{ display: 'none'}}>{newPath}</span>
		</div>
	): (
		<Grid container spacing={2}>
			<Grid item sm={5}>
				<img src={userImage} alt="Profile" className={classes.profileImage} />
			</Grid>
			<Grid item sm={7}>
				<Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
					@{userHandle}
				</Typography>
				<hr className={classes.invisibleSeparator} />
				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
				</Typography>
				<hr className={classes.invisibleSeparator} />
				<Typography variant="body1">{body}</Typography>
				<LikeButton screamId={screamId}/>
				<span>
					{likeCount > 1 ? `${likeCount} Likes` : `${likeCount} Like`}
				</span>
				<MyButton tip="comments">
					<ChatIcon color="primary" />
				</MyButton>
				<span>
					{commentCount > 1
						? `${commentCount} Comments`
						: `${commentCount} Comment`}
				</span>
			</Grid>
			<hr className={classes.visibleSeparator}/>
			<CommentForm screamId={screamId} />
			<Comments comments={comments || []}/>
		</Grid>
	)

	return (
		<>
			<MyButton onClick={handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
				<UnfoldMore color="primary" />
			</MyButton>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
					<CloseIcon />
				</MyButton>
				<DialogContent className={classes.dialogContent}>
					{dialogMarkup}
				</DialogContent>
			</Dialog>
		</>
	);
};

ScreamDialog.propTypes = {
	getScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	screamId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	scream: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	scream: state.data.scream,
	UI: state.UI
});

const mapActionsToProps = {
	getScream,
	clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(ScreamDialog);
