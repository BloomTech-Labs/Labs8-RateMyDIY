import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchSearchResults, fetchCategoryResults } from '../../actions';
import { connect } from 'react-redux';
import { SearchBar, Nav } from '../index';

const HeaderContainer = styled.div`
	width: 100%;
	height: 76px;
	z-index: 999;
	position: fixed;
	background-color: #232a34;
`;

const HeaderContainerWraper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderSearchContainer = styled.div`
	width: 50%;
	margin: 0 20px;
`;

const Logo = styled.img`
	cursor: pointer;
`;

class Header extends React.Component {
	state = { input: '', searchTerm: this.props.searchTerm };

	componentDidMount() {}
	handleChange = e => {
		this.setState({
			...this.state,
			input: e.target.value,
			searchTerm: e.target.value
		});
	};

	handleSearch = e => {
		e.preventDefault();
		const searchTerm = this.state.input;
		console.log(searchTerm);
		//call featch search results action
		//push to search page
		this.props.fetchSearchResults(searchTerm);
		this.props.history.push(`/search?query=${searchTerm}`);
	};
	render() {
		console.log(this.props.history);
		return (
			<HeaderContainer>
				<HeaderContainerWraper>
					<Link to="/">
						<Logo
							style={{ width: '60px', height: '60px', margin: '0 20px' }}
							src="https://ratemydiy.s3.amazonaws.com/1544565541530"
							alt="LOGO"
						/>
					</Link>

					<HeaderSearchContainer>
						<SearchBar
							handleChange={this.handleChange}
							handleSearch={this.handleSearch}
							searchTerm={this.state.searchTerm}
						/>
					</HeaderSearchContainer>
					<Nav />
				</HeaderContainerWraper>
			</HeaderContainer>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

export default connect(
	mapStateToProps,
	{ fetchSearchResults, fetchCategoryResults }
)(Header);
