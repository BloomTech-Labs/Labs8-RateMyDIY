// Dependencies
import React, { Component } from "react";
import { Route } from "react-router-dom";
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
  UserSettingSettings,
  SearchBar,
  SearchPage
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
        {/* <Navbar /> */}
        <Route exact path="/" component={ExampleComponent} />
        <Route exact path="/landing" component={LandingPage} />
        <Route path="/settings" component={UserSettingsSideBar} />
        <Route path="/settings/summaries" component={UserSettingsSummaries} />
        <Route exact path="/ReviewList" component={ReviewList} />
        <Route exact path="/ProjectList" component={ ProjectList} />
        <Route path="/settings/positions" component={UserSettingEducation} />
        <Route path="/settings/education" component={UserSettingPositions} />
        <Route path="/settings/skills" component={UserSettingSkills} />
        <Route path="/settings/resumes" component={UserSettingResumes} />
        <Route path="/settings/billing" component={UserSettingBilling} />
        <Route path="/settings/settings" component={UserSettingSettings} />
        <Route path="/search" component={SearchPage} />
      </AppContainer>
    );
  }
}

export default App;
