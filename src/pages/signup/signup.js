import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppIcon from "../../images/favicon.png";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Redux Stuff
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";
import { clearErrors } from "../../redux/actions/dataActions";


const useStyles = makeStyles(theme => ({
	...theme.spreadThis
}));

function Signup({ ...props }) {
	const [state, setState] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		handle: "",
		isError: {}
	});

	const {
		email,
		password,
		confirmPassword,
		handle,
		isError
	} = state;

	const history = useHistory();
	const classes = useStyles();

	const handleSubmit = event => {
		event.preventDefault();

		const newUserData = {
			email: email,
			password: password,
			confirmPassword: confirmPassword,
			handle: handle
		};
		props.signupUser(newUserData, history);
	};

	const { clearErrors} = props;

	useEffect(() => {
		if (props.UI.isError) {
			setState(state => ({ ...state, isError: props.UI.isError}));
		}
		return () => {
			clearErrors();
		}
	}, [ props.UI.isError, clearErrors]);

	return (
		<Grid container className={classes.form}>
			<Grid item sm />
			<Grid item sm>
				<img className={classes.image} src={AppIcon} alt="icon" />
				<Typography variant="h1" className={classes.pageTitle}>
					Signup
				</Typography>
				<form noValidate onSubmit={handleSubmit}>
					<TextField
						id="email"
						name="email"
						type="email"
						label="Email"
						className={classes.textField}
						helperText={isError.email}
						error={isError.email ? true : false}
						value={email}
						onChange={event =>
							setState({ ...state, email: event.target.value })
						}
						fullWidth
					/>
					<TextField
						id="password"
						name="password"
						type="password"
						label="Password"
						className={classes.textField}
						helperText={isError.password}
						error={isError.password ? true : false}
						value={password}
						onChange={event =>
							setState({ ...state, password: event.target.value })
						}
						fullWidth
					/>
					<TextField
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						label="Confirm Password"
						className={classes.textField}
						helperText={isError.confirmPassword}
						error={isError.confirmPassword ? true : false}
						value={confirmPassword}
						onChange={event =>
							setState({
								...state,
								confirmPassword: event.target.value
							})
						}
						fullWidth
					/>
					<TextField
						id="handle"
						name="handle"
						type="text"
						label="Handle"
						className={classes.textField}
						helperText={isError.handle}
						error={isError.handle ? true : false}
						value={handle}
						onChange={event =>
							setState({ ...state, handle: event.target.value })
						}
						fullWidth
					/>
					{isError.general && (
						<Typography
							variant="body2"
							className={classes.customError}
						>
							{isError.general}
						</Typography>
					)}
					<Button
						className={classes.button}
						type="submit"
						variant="contained"
						color="primary"
						disabled={props.UI.isLoading}
					>
						Signup
						{props.UI.isLoading && (
							<CircularProgress
								size={30}
								className={classes.progress}
							/>
						)}
					</Button>
					<br />
					<small>
						Already have an account ? login &nbsp;
						<Link to={`/login`}>here</Link>
					</small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	);
};

Signup.propTypes = {
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI
});

export default connect(mapStateToProps, { signupUser, clearErrors })(Signup);