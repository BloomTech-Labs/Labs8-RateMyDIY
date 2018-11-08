// Dependencies
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import styled from "styled-components";

// Components
import {
  ExampleComponent,
  ReviewList,
  LandingPage,
  ProjectList,
  UserSettingsSideBar,
  UserSettingsSummaries,
  UserSettingBilling,
  UserSettingEducation,
  UserSettingPositions,
  UserSettingSkills,
  UserSettingResumes,
  UserSettingSettings
} from "../../components";

//Styles
const AppContainer = styled.div`
  display: flex;
  max-width: 1280px;
  width: 880px;
  height: 100vh;
  background: #c7e8f1;
  margin: 0 auto;
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <h1>Navigation</h1>
        <ul>
          <li>
            <Link to="/landing">Landing Page</Link>
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
        </ul>
        {/* <Navbar /> */}
        <Route exact path="/" component={ExampleComponent} />
        <Route exact path="/landing" component={LandingPage} />
        <Route path="/settings" component={UserSettingsSideBar} />
        <Route path="/settings/summaries" component={UserSettingsSummaries} />
        <Route exact path="/ReviewList" component={ReviewList} />
        <Route path="/settings/positions" component={UserSettingEducation} />
        <Route path="/settings/education" component={UserSettingPositions} />
        <Route path="/settings/skills" component={UserSettingSkills} />
        <Route path="/settings/resumes" component={UserSettingResumes} />
        <Route path="/settings/billing" component={UserSettingBilling} />
        <Route path="/settings/settings" component={UserSettingSettings} />
      </AppContainer>
    );
  }
}

export default App;
