import React from 'react';
// import { Link } from "react-router-dom";
import styled from 'styled-components';

//Apply styles
const SearchBarWrapper = styled.form`
	display: flex;
	width: 70%;
	height: 35px;
	//align-items: baseline;

	@media (max-width: 500px) {
		width: 85%;
		position: relative;
	}
`;
// const SearchBarSearchButtonWrapper = styled.div`
// 	@media (max-width: 500px) {
// 		position: relative;
// 	}
// `;
const SearchBarInput = styled.input`
	width: 100%;
	height: 45px;
	//color: #a6aaad;
	outline: none;
	border: 2px solid black;
	border-right: 0;
	font-size: 14px;
	padding: 0px 15px;
	font-size: 18px;
`;

const SearchBarButton = styled.button`
	position: relative;
	right: 0;
	width: 11%;
	height: 45px;
	border: 2px solid black;
	border-left: 0;
	background-color: white;

	@media (max-width: 500px) {
		text-align: right;
		box-shadow: none;
		z-index: 1;
		width: 20%;
	}
`;

const SearchBar = props => {
	console.log('lets debug the queryyyyy');
	console.log(props);
	return (
		<SearchBarWrapper>
			<SearchBarInput
				onChange={e => props.handleChange(e)}
				placeholder="Find a DIY project or Author"
				value={props.searchTerm}
			/>
			<SearchBarButton
				onClick={e => props.handleSearch(e)}
				className="search-button"
			>
				<img
					src="https://cdn4.iconfinder.com/data/icons/kripto-black-2/512/kripto-search-b.png"
					alt="Search icon"
					style={{ width: '20px', height: '20px' }}
				/>
			</SearchBarButton>
		</SearchBarWrapper>
	);
};

export default SearchBar;
