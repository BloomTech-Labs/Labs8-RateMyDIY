// Dependencies
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import styled from 'styled-components';
import {
	DropDown
} from '../../components';
import { sendEmail } from '../../actions';

// date check for welcome message

const loginURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signin`;

const logoutURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signout`;

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};
		this.toggle = this.toggle.bind(this);
	}
	// Custom client greeting based of client hour
	clientGreeting() {
		let clientHourTime = new Date().getHours();
		if (clientHourTime < 10) {
			return "Good morning";
		} else if (clientHourTime <= 16 && clientHourTime >= 10) {
			return "Good afternoon";
		} else if (clientHourTime <= 24 && clientHourTime > 16) {
			return "Good evening";
		}
	}
	// Sets state for the reactstrap modal
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}
	submitHandler = event => {
		event.preventDefault();
		this.props.sendEmail(this.state.to);
	};

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
		console.log(this.state.to);
	};

	render() {
		return (
			<NavWrapper>
				<AuthWrapper>
					{/* Conditional check to see if user is logged in */}
					{/* if not logged in, show the login/signup buttons */}
					{this.props.userInfo.user_id ? (
						<Fragment>
							<WelcomeMessage>
								{this.clientGreeting()} {this.props.userInfo.username}
							</WelcomeMessage>
							<DropDown />
							<AuthButton href={logoutURL}>Signout</AuthButton>
						</Fragment>
					) : (
							<Fragment>
								<AuthButton href={loginURL}>Login</AuthButton>
							</Fragment>
						)}

					{/* if logged in, show component that says "Hello NAME then have a signout button" */}
				</AuthWrapper>
			</NavWrapper>
		);
	}
}

const mapStateToProps = state => ({
	userInfo: state.loggedInReducer.userInfo
});

export default connect(
	mapStateToProps,
	{ sendEmail }
)(Nav);

// styled-components
const NavWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	margin: 0 8px 0 auto;
	max-width: 20%;
	min-width: 10%;
`;
const AuthWrapper = styled.div`
		display: flex;
	justify-content: flex-end;
	align-items: center;
	border: 1px solid black;
	margin: 0 8px 0 auto;
	padding: 4px 8px;
  padding: 10px;
	/* overflow: hidden; */
`;

const AuthButton = styled.a`
	color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
	display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  cursor: pointer;
`;

const WelcomeMessage = styled.p`
	font-size: 14px;
	margin-right: 8px;
	white-space: nowrap;
`;
