import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const TableRow = styled(TableRowContainer)`
	display: flex;
	gap: 8px;
	margin-bottom: 8px;
	width: 650px;
	padding: 4px 8px;
	border: solid 2px transparent;
	font-size: 20px;

	& .loginCol {
		width: 170px;
	}

	& .regDateCol {
		width: 210px;
	}

	& .roleIdCol {
		width: auto;
	}
`;

TableRow.propTypes = {
	children: PropTypes.node,
};
