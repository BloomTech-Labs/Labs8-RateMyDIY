// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';

//Styles
const SummariesContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 550px;
  width: 84%;
  background: #FFF;
`;

const TempDiv = styled.div`
  font-size: 50px;
`;


class UserSettingSummaries extends Component {
  render() {
    return (
      <SummariesContainer>
        <TempDiv>Under Construction</TempDiv>
      </SummariesContainer>
    );
  }
}

export default UserSettingSummaries;
