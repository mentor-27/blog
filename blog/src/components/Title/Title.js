import PropTypes from 'prop-types';
import styled from 'styled-components';

const TitleContainer = ({ className, level = '2', children }) => {
	switch (level) {
		case '1':
			return <h1 className={className}>{children}</h1>;
		case '2':
			return <h2 className={className}>{children}</h2>;
		case '3':
			return <h3 className={className}>{children}</h3>;
		case '4':
			return <h4 className={className}>{children}</h4>;
		case '5':
			return <h5 className={className}>{children}</h5>;
		case '6':
			return <h6 className={className}>{children}</h6>;
		default:
			break;
	}
};

export const Title = styled(TitleContainer)`
	margin: ${({ margin = '0' }) => margin};
	text-align: ${({ textAlign = 'left' }) => textAlign};
`;

Title.propTypes = {
	children: PropTypes.node,
	level: PropTypes.string,
	margin: PropTypes.string,
};
