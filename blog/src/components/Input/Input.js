import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	height: 40px;
	width: ${({ width = '100%' }) => width};
	margin: ${({ margin = '0' }) => margin};
	padding: ${({ padding = '8px' }) => padding};
	border: solid 1px #000;
	border-radius: 8px;
	font-size: 18px;
`;

Input.propTypes = {
	width: PropTypes.string,
	margin: PropTypes.string,
	padding: PropTypes.string,
};
