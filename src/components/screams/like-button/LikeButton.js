import React from "react";
import MyButton from "../../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../../redux/actions/dataActions";

function LikeButton({ ...props }) {
	const { screamId, user: { authenticated , likes } } = props;
	const likedScream = () => {
		if (likes && likes.find(like => like.screamId === screamId)) {
			return true;
		} else {
			return false;
		}
	};

	const likeScream = () => {
		props.likeScream(screamId);
	};

	const unlikeScream = () => {
		props.unlikeScream(screamId);
	};

	const likeButton = !authenticated ? (
		<Link to="/login">
			<MyButton tip="Like">
				<FavoriteBorder color="primary" />
			</MyButton>
		</Link>
	) : likedScream() ? (
		<MyButton tip="Undo like" onClick={unlikeScream}>
			<FavoriteIcon color="primary" />
		</MyButton>
	) : (
		<MyButton tip="Like" onClick={likeScream}>
			<FavoriteBorder color="primary" />
		</MyButton>
	);
	return (likeButton);
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	likeScream,
	unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);