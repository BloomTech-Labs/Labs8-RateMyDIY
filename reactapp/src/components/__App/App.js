// Dependencies
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'; // removed Link from import (unused)
import styled from 'styled-components';
import Auth from '../../components/Auth/Auth';
import { connect } from 'react-redux';
import { loggedIn } from '../../actions/index';

// Components
import {
	ReviewList,
	LandingPage,
	ProjectList,
	CreateEditPage,
	Billing,
	UserSettingsSideBar,
	UserSettingsSummaries,
	UserSettingSettings,
	//  SearchBar, // not used
	SearchPage,
	ProjectPage,
	NewProject,
	AboutTheTeam
} from '../../components';

//Styles
const AppContainer = styled.div`
  display: flex;
  max-width: 1280px;
  min-width: 600px;
  height: auto;
  background: #eff;
  margin: 10px auto;
`;

class App extends Component {
	state = {};

	componentDidMount() {
		this.props.loggedIn();
	}

	render() {
		return (
			<AppContainer>
				{/* <h1>Navigation</h1> */}
				{/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ReviewList">Review List</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/search">Search Page</Link>
          </li>
          <li>
            <Link to="/signin">Sign Up or Sign In</Link>
          </li>
        </ul> */}
				{/* <Navbar /> */}
				<Route exact path="/" component={LandingPage} />
				<Route path="/settings" component={UserSettingsSideBar} />
				<Route path="/settings/summaries" component={UserSettingsSummaries} />
				<Route exact path="/ReviewList" component={ReviewList} />
				<Route exact path="/ProjectList" component={ProjectList} />
				<Route exact path="/CreateEditPage" component={CreateEditPage} />
				<Route path="/settings/settings" component={UserSettingSettings} />
				<Route path="/search" component={SearchPage} />
				<Route path="/signin" component={Auth} />
				<Route path="/project/:id" component={ProjectPage} />
				<Route path="/newproject" component={NewProject} />
				<Route path="/about" component={AboutTheTeam} />
			</AppContainer>
		);
	}
}

const mapStateToProps = state => ({
	userInfo: state.loggedInReducer.userInfo,
	gettingUserInfo: state.loggedInReducer.gettingUserInfo,
	error: state.loggedInReducer.userInfo
});

export default withRouter(
	connect(
		mapStateToProps,
		{ loggedIn }
	)(App)
);
