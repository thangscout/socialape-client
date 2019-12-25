import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
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
import { loginUser } from "../../redux/actions/userActions";
import { clearErrors } from "../../redux/actions/dataActions";

const useStyles = makeStyles(theme => ({
	...theme.spreadThis
}));

function Login({ ...props }){
	const [state, setState] = useState({
		email: '',
		password: '',
		isError: {}
	});
	const { email, password, isError } = state;

	const history = useHistory();
	const classes = useStyles();

	const handleSubmit = event => {
		event.preventDefault();
		const userData = {
			email: email,
			password: password
		};
		props.loginUser(userData, history);
	};

	const onChangeInput = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.value
		})
	}
	const { clearErrors } = props;

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
					Login
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
						onChange={onChangeInput}
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
						onChange={onChangeInput}
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
						Login
						{props.UI.isLoading && (
							<CircularProgress size={30} className={classes.progress}/>
						)}
					</Button>
					<br/>
					<small>
						don't have an account ? sign up{" "}
						<Link to={`/signup`}>here</Link>
					</small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	);
};

Login.propTypes = {
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = { loginUser, clearErrors};

export default connect(mapStateToProps, mapActionsToProps)(Login);