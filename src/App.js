import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import {
	ThemeProvider as MuiThemeProvider,
	createMuiTheme
} from "@material-ui/core/styles";
import fileTheme from "./util/theme";
import jwtDecode from "jwt-decode";
import axios from "axios";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Components
import Navbar from "./components/layout/nav-bar/Navbar";
import AuthRoute from "./util/AuthRoute";

// Pages
import home from "./pages/home/home";
import login from "./pages/login/login";
import signup from "./pages/signup/signup";
import user from "./pages/user/user";

const theme = createMuiTheme(fileTheme);
axios.defaults.baseURL = 'https://europe-west1-socialape-2951d.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		// authenticated = false;
		store.dispatch(logoutUser());
		window.location.href = "/login";
	} else {
		store.dispatch({ type: SET_AUTHENTICATED});
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<div className="container">
						<Navbar />
						<Switch>
							<Route exact path="/" component={home} />
							<AuthRoute
								exact
								path="/login"
								component={login}
							/>
							<AuthRoute
								exact
								path="/signup"
								component={signup}
							/>
							<Route exact path="/users/:handle" component={user} />
							<Route exact path="/users/:handle/scream/:screamId" component={user}/>
						</Switch>
					</div>
				</Router>
			</Provider>
		</MuiThemeProvider>
	);
}

export default App;
