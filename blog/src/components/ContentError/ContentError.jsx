import PropTypes from 'prop-types';
import { Title } from '../Title/Title';
import styled from 'styled-components';

const ContentErrorContainer = ({ className, children, error }) =>
	error ? (
		<div className={className}>
			<Title level="2" margin="0 0 20px 0">
				Ошибка
			</Title>
			<div>{error}</div>
		</div>
	) : (
		children
	);

export const ContentError = styled(ContentErrorContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

ContentError.propTypes = {
	children: PropTypes.node,
	error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
