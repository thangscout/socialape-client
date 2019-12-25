import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NoImg from "../images/no-img.png";

// MUI Stuff
import Paper from "@material-ui/core/Paper";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles(theme => ({
	...theme.spreadThis,
	handle: {
		height: 20,
		backgroundColor: theme.palette.primary.main,
		width: 60,
		margin: '0 auto 7px'
	},
	fullLine: {
		height: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		width: '100%',
		marginBottom: 10
	},
	halfLine: {
		height: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		width: '50%',
		marginBottom: 10
	},
	invisibleBorder: {
		border: 'none'
	}
}));

function ProfileSkeleton({ ...props }){
	const classes = useStyles();
	
	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={NoImg} alt="profile" className="profile-image" />
				</div>
			</div>
			<hr className={classes.invisibleBorder}/>
			<div className="profile-details">
				<div className={classes.handle} />
				<hr className={classes.invisibleBorder}/>
				<div className={classes.fullLine} />
				<div className={classes.fullLine} />
				<hr className={classes.invisibleBorder}/>
				<LocationOn color="primary"/> <span>Location</span>
				<hr className={classes.invisibleBorder}/>
				<LinkIcon color="primary" /> https://website.com
				<hr className={classes.invisibleBorder}/>
				<CalendarToday color="primary" /> Joined date
			</div>
		</Paper>
	);
}

export default ProfileSkeleton;