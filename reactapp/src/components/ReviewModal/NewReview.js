// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { ConfirmModal } from '../../components';

// Actions
import { addReview, getReview } from '../../actions';

// Styles
import styled from 'styled-components';

const CloseModalButton = styled.button`
	align-self: flex-end;
`;

const ReviewForm = styled.form`
	display: flex;
	flex-direction: column;
`;

const StarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-self: center;
	width: 100px;
	margin: 20px 0;
`;

const Img = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 250px;
	height: 250px;
	background: #cceeee;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const ProjectTitle = styled.h2``;

const Reviewer = styled.h3``;

const TextArea = styled.textarea`
	height: 160px;
	resize: none;
	margin-bottom: 20px;
`;

const StatusMessage = styled.p``;

const CancelButton = styled.button``;

const SubmitInput = styled.input``;

class NewReview extends Component {
	state = {
		rating: null,
		text: ''
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Submit new review
	submitHandler = event => {
		event.preventDefault();

		this.props.addReview({
			user_id: this.props.user_id,
			project_id: this.props.project.project_id,
			rating: this.state.rating,
			text: this.state.text
		});
	};

	// Cancel new review (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (this.state.rating || this.state.text) {
			this.setState({
				confirm: {
					text: ['Do you want to discard these changes?'],
					cancel: event => {
						event.preventDefault();
						this.setState({ confirm: undefined });
					},
					submit: event => {
						event.preventDefault();
						this.props.showReviewModal(false);
					}
				}
			});
		} else {
			this.props.showReviewModal(false);
		}
	};

	render() {
		return (
			<React.Fragment>
				<CloseModalButton onClick={this.cancelHandler}>x</CloseModalButton>

				{/* todo: click outside modal to trigger cancelHandler */}
				<ReviewForm onSubmit={this.submitHandler}>
					<ProjectTitle>{`@${this.props.project.username}'s ${
						this.props.project.project_name
					}`}</ProjectTitle>

					<Reviewer>{`Review by: @${this.props.username}`}</Reviewer>

					<Img
						src={this.props.project.img_url}
						alt={this.props.project.img_url || 'project image'}
					/>

					<StarContainer>
						<input
							type="radio"
							name="rating"
							value="1"
							onChange={this.changeHandler}
							required
						/>
						<input
							type="radio"
							name="rating"
							value="2"
							onChange={this.changeHandler}
							required
						/>
						<input
							type="radio"
							name="rating"
							value="3"
							onChange={this.changeHandler}
							required
						/>
						<input
							type="radio"
							name="rating"
							value="4"
							onChange={this.changeHandler}
							required
						/>
						<input
							type="radio"
							name="rating"
							value="5"
							onChange={this.changeHandler}
							required
						/>
					</StarContainer>

					<TextArea
						name="text"
						type="text"
						placeholder="review text"
						value={this.state.text}
						onChange={this.changeHandler}
						required
						autoFocus
					/>

					{(this.props.addingReview || this.props.gettingReview) && (
						<StatusMessage>Adding review...</StatusMessage>
					)}
					{this.props.addingReviewError && (
						<StatusMessage>{this.props.addingReviewError}</StatusMessage>
					)}

					<ButtonContainer>
						<CancelButton onClick={this.cancelHandler}>Cancel</CancelButton>
						<SubmitInput type="submit" value="Submit Review" />
					</ButtonContainer>

					{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
				</ReviewForm>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		gettingReview: state.reviewReducer.gettingReview,

		addingReview: state.reviewReducer.addingReview,
		addingReviewError: state.reviewReducer.addingReviewError,

		reviewModal: state.reviewReducer.reviewModal
	};
};

export default connect(
	mapStateToProps,
	{
		addReview,
		getReview
	}
)(NewReview);
