import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../../util/MyButton";
import PostScream from "../../screams/post-scream/PostScream";
import Notifications from "../notifications/Notifications";

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Icon
import HomeIcon from "@material-ui/icons/Home";

function Navbar({ authenticated }) {
	return (
		<AppBar>
			<Toolbar className="nav-container">
				{authenticated ? (
					<>
						<PostScream/>
						<Link to="/">
							<MyButton tip="Home">
								<HomeIcon />
							</MyButton>
						</Link>
						<Notifications />
					</>
				) : (
					<>
					<Button color="inherit" component={Link} to="/login" >
					Login
					</Button>
					<Button color="inherit"component={Link} to="/" >
						Home
					</Button>
					<Button color="inherit"component={Link} to="/signup">
						Signup
					</Button>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
}
Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);