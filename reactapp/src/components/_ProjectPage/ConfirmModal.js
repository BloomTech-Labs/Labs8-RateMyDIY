// Dependencies
import React from 'react';

// Styles
import styled, { css } from 'styled-components';

const ModalShade = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(200, 200, 200, 0.85);
`;

const ModalBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 45%;
	left: 50%;
	width: 530px;
	height: 180px;
	background: white;
	padding: 43px 62px;
	border: 2px solid #9a9a9a;
	transform: translate(-50%, -50%);
`;

const StatusMessage = styled.p``;

const ModalPrompt = styled.h4`
	font-size: 1.5rem;
	font-weight: bold;
	color: #4a494a;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const SubmitButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 191px;
	height: 43px;
	font-size: 1.5rem;
	font-weight: bold;
	text-decoration: none;
	color: white;
	background: #24b8bd;
	border: 1px solid #969696;
	cursor: pointer;

	${props =>
		props.cancel &&
		css`
			background: #ca001a;
		`};
`;

const ConfirmModal = props => {
	return (
		<ModalShade>
			<ModalBox>
				{props.statusMessage ? (
					<StatusMessage>{props.statusMessage}</StatusMessage>
				) : (
					<React.Fragment>
						<ModalPrompt>{props.confirm.text[0] || 'u sure tho?'}</ModalPrompt>
						<ButtonContainer>
							<SubmitButton cancel onClick={props.confirm.cancel}>
								{props.confirm.text[1] || 'No'}
							</SubmitButton>
							<SubmitButton onClick={props.confirm.submit}>
								{props.confirm.text[2] || 'Yes'}
							</SubmitButton>
						</ButtonContainer>
					</React.Fragment>
				)}
			</ModalBox>
		</ModalShade>
	);
};

export default ConfirmModal;
