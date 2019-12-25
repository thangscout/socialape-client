import React, { useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Scream from "../../components/screams/scream/Scream";
import Profile from "../../components/profiles/profile/Profile";
import ScreamSkeleton from "../../util/ScreamSkeleton";

// Redux Stuff
import { connect } from "react-redux";
import { getScreams } from "../../redux/actions/dataActions";

function Home({ ...props }) {
	
	const { getScreams, data: { screams, isLoading}} = props;

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();

		const fetchData = () => {
			getScreams(source);
		};

		fetchData();
		return () => {
			source.cancel();
		};
	}, [getScreams]);

	const recentScreamsMarkup = !isLoading
		? screams.map(scream => (
				<Scream scream={scream} key={scream.screamId} />
		  ))
		: (
			<ScreamSkeleton />
		);
	
	return (
		<Grid container spacing={2}>
			<Grid item sm={8} xs={12}>
				{recentScreamsMarkup}
			</Grid>
			<Grid item sm={4} xs={12}>
				<Profile />
			</Grid>
		</Grid>
	);
};

Home.propTypes = {
	getScreams: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, { getScreams })(Home);
