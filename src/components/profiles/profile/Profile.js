import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "../edit-details/EditDetails";
import MyButton from "../../../util/MyButton";
import ProfileSkeleton from "../../../util/ProfileSkeleton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Redux Stuff
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../../redux/actions/userActions";

const useStyles = makeStyles(theme => ({
	...theme.spreadThis
}));

function Profile({ ...props }) {
	const classes = useStyles();
	const {
		user: {
			credentials: {
				handle,
				createdAt,
				imageUrl,
				bio,
				website,
				location
			},
			isLoading,
			authenticated
		},
		logoutUser,
		uploadImage
	} = props;

	const handleChangeImage = event => {
		const image = event.target.files[0];
		// Send to server
		const formData = new FormData();
		formData.append("image", image, image.name);
		uploadImage(formData);
	};

	const handleEditPicture = () => {
		const fileInput = document.getElementById("imageInput");
		fileInput.click();
	};

	const handleLogout = () => {
		logoutUser();
	};

	let profileMarkup = !isLoading ? (
		authenticated ? (
			<Paper className={classes.paper}>
				<div className={classes.profile}>
					<div className="image-wrapper">
						<img
							src={imageUrl}
							alt="profile"
							className="profile-image"
						/>
						<input
							type="file"
							id="imageInput"
							onChange={handleChangeImage}
							hidden="hidden"
						/>
						<MyButton
							tip="Edit profile picture"
							onClick={handleEditPicture}
							btnClassName="button"
						>
							<EditIcon color="primary" />
						</MyButton>
					</div>
					<hr />
					<div className="profile-details">
						<MuiLink
							component={Link}
							to={`/users/${handle}`}
							color="primary"
							variant="h5"
						>
							@{handle}
						</MuiLink>
						<hr />
						{bio && <Typography variant="body2">{bio}</Typography>}
						<hr />
						{location && (
							<>
								<LocationOn color="primary" />
								<span>{location}</span>
								<hr />
							</>
						)}
						{website && (
							<>
								<LinkIcon color="primary" />
								<a
									href={website}
									target="_blank"
									rel="noopener noreferrer"
								>
									{" "}
									{website}
								</a>
								<hr />
							</>
						)}
						<CalendarToday color="primary" />{" "}
						<span>
							Joined {dayjs(createdAt).format("MMM YYYY")}
						</span>
					</div>
					<MyButton tip="Logout" onClick={handleLogout}>
						<KeyboardReturn color="primary" />
					</MyButton>
					<EditDetails />
				</div>
			</Paper>
		) : (
			<Paper className={classes.paper}>
				<Typography variant="body2" align="center">
					No profile found, please login again
				</Typography>
				<div className={classes.buttons}>
					<Button
						variant="contained"
						color="primary"
						component={Link}
						to="/login"
					>
						Login
					</Button>
					<Button
						variant="contained"
						color="secondary"
						component={Link}
						to="/signup"
					>
						Signup
					</Button>
				</div>
			</Paper>
		)
	) : (
		<ProfileSkeleton />
	);
	return profileMarkup;
}

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	logoutUser,
	uploadImage
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
