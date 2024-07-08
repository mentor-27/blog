import PropTypes from 'prop-types';
import { Icon, Input } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className, search, setSearch }) => {
	const onChange = ({ target }) => {
		setSearch(target.value);
	};

	return (
		<div className={className}>
			<Input
				value={search}
				onChange={onChange}
				padding="8px 32px 8px 8px"
				placeholder="Поиск по названию..."
			/>
			<Icon className="searchIcon" id="fa-search" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	position: relative;
	width: 340px;

	& .searchIcon {
		position: absolute;
		inset: 50% 8px auto auto;
		transform: translateY(-50%);
	}
`;

Search.propTypes = {
	search: PropTypes.string,
	setSearch: PropTypes.func,
};
