import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../../util/MyButton";
import DeleteScream from "../delete-scream/DeleteScream";
import ScreamDialog from "../scream-dialog/ScreamDialog";
import LikeButton from "../like-button/LikeButton";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux Stuff
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
	...theme.spreadThis
}));

function Scream({ ...props }) {
	const classes = useStyles();
	const {
		scream: {
			body,
			createdAt,
			userImage,
			userHandle,
			screamId,
			likeCount,
			commentCount
		},
		user: {
			authenticated,
			credentials: { handle }
		},
		openDialog
	} = props;
	dayjs.extend(relativeTime);

	const deleteButton = authenticated && userHandle === handle ? (
		<DeleteScream screamId={screamId}/>
	) : null;

	return (
		<div className={classes.card}>
			<Card className="card">
				<CardMedia
					className="image"
					image={userImage}
					title="Profile image"
				/>
				<CardContent className="content">
					<Typography
						variant="h5"
						component={Link}
						to={`/users/${userHandle}`}
						color="primary"
					>
						{userHandle}
					</Typography>
					{deleteButton}
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).fromNow()}
					</Typography>
					<Typography variant="body1">{body}</Typography>
					<LikeButton screamId={screamId} />
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
					<ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={openDialog}/>
				</CardContent>
			</Card>
		</div>
	);
}

Scream.propTypes = {
	user: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(Scream);
