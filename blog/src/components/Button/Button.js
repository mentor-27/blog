import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ className, type = 'button', children, ...props }) => {
	return (
		<button className={className} type={type} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	margin: ${({ margin }) => margin};
	width: ${({ width = '100%' }) => width};
	height: 32px;
	border: none;
	border-radius: 8px;
	background-color: #ccc;

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.string,
};
