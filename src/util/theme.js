export default {
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#00bcd4',
			dark: '#008394',
			contrastText: '#fff'
		},
		secondary: {
			light: '#ff6333',
			main: '#ff3d00',
			dark: '#b22a00',
			contrastText: '#fff'
		}
	},
	spreadThis: {
		form: {
			textAlign: "center"
		},
		image: {
			width: 64,
			margin: "20px auto"
		},
		pageTitle: {
			margin: "10px auto"
		},
		textField: {
			margin: "10px auto"
		},
		button: {
			marginTop: 20,
			position: 'relative'
		},
		customError: {
			color: "red",
			fontSize: "0.8rem",
			marginTop: 10
		},
		progress: {
			position: 'absolute'
		},
		paper: {
			padding: 20
		},
		profile: {
			'& .image-wrapper': {
				textAlign: 'center',
				position: 'relative',
				'& button': {
					position: 'absolute',
					top: '80%',
					left: '70%'
				}
			},
			'& .profile-image': {
				width: 200,
				height: 200,
				objectFit: 'cover',
				maxWidth: '100%',
				borderRadius: '50%'
			},
			'& .profile-details': {
				textAlign: 'center',
				'& span, svg': {
					verticalAlign: 'middle'
				},
				'& a': {
					color: "#00bcd4"
				}
			},
			'& hr': {
				border: 'none',
				margin: '0 0 10px 0'
			},
			'& svg.button': {
				'&:hover': {
					cursor: 'pointer'
				}
			}
		},
		buttons: {
			textAlign: 'center',
			'& a': {
				margin: '20px 10px'
			}
		},
		card: {
			'& .card' : {
				position: 'relative',
				display: "flex",
				marginBottom: 20
			},
			'& .image' : {
				minWidth: 200,
				objectFit: 'cover'
			},
			'& .content': {
				padding: 25
			}
		},
		deleteScream: {
			'& .button': {
				position: 'absolute',
				left: '90%',
				top: '10%'
			}
		},
		postScremStyle: {
			'& .submit-button': {
				position: 'relative',
				float: 'right',
				marginTop: 10
			},
			'& .progress-spinner': {
				position: 'absolute'
			},
			'& .close-button': {
				position: 'absolute',
				left: '90%',
				top: '3%'
			}
		},
		invisibleSeparator: {
			border: 'none',
			margin: 4
		},
		visibleSeparator: {
			width: '100%',
			boderBottom: '1px solid rgba(0, 0, 0, 0.1)',
			marginBottom: 20
		}
	}
}