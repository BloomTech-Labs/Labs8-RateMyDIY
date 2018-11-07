// Dependencies
import React, { Component } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

// Components
import { ExampleComponent, LandingPage, UserSettingsSideBar } from "../../components";

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
      </AppContainer>
    );
  }
}

export default App;
