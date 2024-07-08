import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Title } from '../../../../components';

const PaginationContainer = ({ className, setPage, current, last }) => {
	return (
		<div className={className}>
			<Button onClick={() => setPage(1)} disabled={current === 1}>
				Начало
			</Button>
			<Button onClick={() => setPage(current - 1)} disabled={current === 1}>
				Назад
			</Button>
			<Title level="4" className="currPage">
				{current}
			</Title>
			<Button onClick={() => setPage(current + 1)} disabled={current === last}>
				Вперёд
			</Button>
			<Button onClick={() => setPage(last)} disabled={current === last}>
				Конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	flex: 1 0 0;
	gap: 8px;
	width: 100px;
	height: 40px;

	& button {
		padding-inline: 16px;
	}

	& .currPage {
		border: solid 2px #000;
		border-radius: 8px;
		text-align: center;
		width: fit-content;
		padding: 4px 16px;
		font-size: 18px;
		background-color: #ccc;
	}
`;

Pagination.propTypes = {
	setPage: PropTypes.func.isRequired,
	current: PropTypes.number.isRequired,
	last: PropTypes.number.isRequired,
};
