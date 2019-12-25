import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../../components/screams/scream/Scream";
import StaticProfile from "../../components/profiles/static-profile/StaticProfile";
import ScreamSkeleton from "../../util/ScreamSkeleton";
import ProfileSkeleton from "../../util/ProfileSkeleton";

// MUI Stuff
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";
import { getUserData } from "../../redux/actions/dataActions";

function User({ ...props }) {
	const {
		getUserData,
		data: { screams, isLoading },
		match: {
			params: { handle, screamId }
		}
	} = props;
	const [profile, setProfile] = useState(null);
	const [screamIdParam, setScreamIdParam] = useState(null);

	useEffect(() => {
		if (screamId) {
			setScreamIdParam(screamId);
		};

		getUserData(handle);
		const fetchData = () => {
			axios
				.get(`/user/${handle}`)
				.then(res => {
					setProfile(res.data.user);
				})
				.catch(err => console.log(err));
		};
		fetchData();
	}, [getUserData, handle, screamId]);

	const screamsMarkup = isLoading ? (
		<ScreamSkeleton />
	) : screams === null ? (
		<p>No screams from this user</p>
	) : !screamIdParam ? (
		screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
	): (
		screams.map(scream => {
			if (scream.screamId !== screamIdParam) {
				return <Scream key={scream.screamId} scream={scream} />
			} else {
				return <Scream key={scream.screamId} scream={scream} openDialog/>
			}
		})
	)

	return (
		<Grid container spacing={2}>
			<Grid item sm={8} xs={12}>
				{screamsMarkup}
			</Grid>
			<Grid item sm={4} xs={12}>
				{profile === null ? (
					<ProfileSkeleton/>
				) : (
					<StaticProfile profile={profile} />
				)}
			</Grid>
		</Grid>
	);
}

User.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);
