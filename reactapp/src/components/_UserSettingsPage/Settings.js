// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsername, getProfilePic } from '../../actions/settingActions';
import axios from 'axios';

import { Nav, Twillio } from '../../components';
//Styles
const SettingsPageContainer = styled.div`
    width: 100%;
    min-width: 550px;
	background-color: ${props => props.theme.mui.palette.primary.main};
`;

const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    border-radius: 30px;
    background-color: ${props => props.theme.mui.palette.primary.light}
`;

const ProfileImgHolder = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 50%;
`;

const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
`;

const ProfileForm = styled.form`
    display: flex;
    justify-content: space-around;
    width: 30%;
    height: 100%;
    margin: 3% 0%;
`;

const UsernameHeader = styled.h1`
    color: ${props => props.theme.mui.palette.secondary.main};
`;

// const CustomFileInput = styled.input`
//     // ::-webkit-file-upload-button {
//     //     background: ${props => props.theme.mui.palette.secondary.light}
//     //     color: ${props => props.theme.mui.palette.secondary.main}
//     //     padding: 1em;
//     //     border-radius: 20px;
//     // }
//     display: none;
// `;

const FileButton = styled.label`
    background-color: white;
    border: 1px solid ${props => props.theme.mui.palette.primary.main};
    border-radius: 5px;
    padding: 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.6rem;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;

    &:hover {
        background-color: ${props => props.theme.mui.palette.primary.main}
        color: white;
    }
`;

const UploadButton = styled.button`
    background-color: white;
    border: 1px solid ${props => props.theme.mui.palette.primary.main};
    border-radius: 5px;
    padding: 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.6rem;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;

    &:hover {
        background-color: ${props => props.theme.mui.palette.primary.main}
        color: white;
    }
`;

class UserSettings extends Component {
	state = {
		username: '',
		img_url: null
	};

	singleFileChangedHandler = event => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	singleFileUploadHandler = event => {
		event.preventDefault();
		const data = new FormData();
		// If file selected
		if (this.state.selectedFile) {
			data.append(
				'image',
				this.state.selectedFile,
				this.state.selectedFile.name
			);
			axios
				.post(
					(process.env.REACT_APP_BACKEND || 'http://localhost:5000') +
						`/api/projects/image-upload`,
					data,
					{
						headers: {
							accept: 'application/json',
							'Accept-Language': 'en-US,en;q=0.8',
							'Content-Type': `multipart/form-data; boundary=${data._boundary}`
						}
					}
				)
				.then(response => {
					if (200 === response.status) {
						// If file size is larger than expected.
						if (response.data.error) {
							if ('LIMIT_FILE_SIZE' === response.data.error.code) {
								// this.ocShowAlert("Max size: 2MB", "red");
							} else {
								console.log(response.data.location);
								// If not the given file type
								// this.ocShowAlert(response.data.error, "red");
							}
						} else {
							// Success
							let fileName = response.data;

							let photo = response.data.location;
							this.setState({
								img_url: photo
							});
							console.log('filedata', fileName);

							console.log('photo', photo);

							this.props.getProfilePic(this.state.img_url);

							//   this.ocShowAlert("File Uploaded", "#3089cf");
						}
					} else {
						console.log('error');
					}
				})
				.catch(error => {
					// If another error
					console.log('error');
				});
		}
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.getUsername(this.state.username);
		this.setState({
			username: ''
		});
	};

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		return (
			<SettingsPageContainer>
				<Nav />
                <SettingsContainer>
				<ProfileImgHolder>
                    <ProfileImg src={this.props.userInfo.img_url} />
                </ProfileImgHolder>
				<ProfileForm>
                    <div>
                    <FileButton for='fileupload'>Choose File</FileButton>
					<input id='fileupload' type="file" style={{display: 'none'}} onChange={this.singleFileChangedHandler} />
                    </div>
                    <div>
						<UploadButton
							onClick={this.singleFileUploadHandler}
						>
							Upload!
						</UploadButton>
					</div>
				</ProfileForm>
                {this.props.img_url ? this.props.img_url : this.props.profilepic_error}

                <UsernameHeader>{this.props.userInfo.username}</UsernameHeader> 
				<form onSubmit={this.submitHandler}>
					<input
						type="text"
						value={this.state.username}
						name="username"
						onChange={this.changeHandler}
					/>
					<input type="submit" value="Change Username" />
				</form>
                {this.props.username_error ? this.props.username_error : null}
                
                <Twillio />
                </SettingsContainer>
			</SettingsPageContainer>
		);
	}
}

const mapStateToProps = state => ({
	gettingUsername: state.settingsReducer.gettingUsername,
	username: state.settingsReducer.username,
	username_error: state.settingsReducer.username_error,
	gettingProfilePic: state.settingsReducer.gettingProfilePic,
	img_url: state.settingsReducer.img_url,
	profilepic_error: state.settingsReducer.profilepic_error,
	userInfo: state.loggedInReducer.userInfo
});

export default connect(
	mapStateToProps,
	{ getUsername, getProfilePic }
)(UserSettings);
