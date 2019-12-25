import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// MUI Stuff
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles(theme => ({
	...theme.spreadThis
}));

function StaticProfile({ ...props }) {
	const classes = useStyles();
	const { profile: { handle, createdAt, imageUrl, bio, website, location}} = props;

	return (
		<Paper className={classes.paper}>
				<div className={classes.profile}>
					<div className="image-wrapper">
						<img
							src={imageUrl}
							alt="profile"
							className="profile-image"
						/>
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
				</div>
			</Paper>
	);
};

StaticProfile.propTypes = {
	profile: PropTypes.object.isRequired,

};

export default StaticProfile;