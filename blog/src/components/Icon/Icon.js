import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, onClick, disabled = false }) => (
	<div className={className} onClick={onClick} disabled={disabled}>
		<i className={`fa ${id}`} aria-hidden="true" />
	</div>
);

export const Icon = styled(IconContainer)`
	display: flex;
	align-items: center;
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	cursor: ${({ cursor = 'default' }) => cursor};
	height: fit-content;

	& > i {
		transition: 0.3s;
	}

	&:hover > i {
		color: ${({ color = 'black' }) => color};
	}

	&[disabled] {
		pointer-events: none;
	}

	&[disabled] > i {
		opacity: 0.25;
	}
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	size: PropTypes.string,
	margin: PropTypes.string,
	cursor: PropTypes.string,
};
