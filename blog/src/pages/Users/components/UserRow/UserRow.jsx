import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '../../../../components';
import { ROLE } from '../../../../constants';
import { request } from '../../../../utils';
import styled from 'styled-components';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [currRoleId, setCurrRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setCurrRoleId(+target.value);
	};

	const onRoleSave = () => {
		request(`/users/${id}`, 'PATCH', { roleId: currRoleId }).then(() =>
			setInitialRoleId(currRoleId),
		);
	};

	return (
		<div className={className}>
			<div className="loginCol">{login}</div>
			<div className="regDateCol">{new Date(registeredAt).toLocaleDateString()}</div>
			<div className="roleIdCol">
				<select value={currRoleId} onChange={onRoleChange}>
					{roles.map(({ roleId, name }) => (
						<option key={roleId} value={roleId}>
							{name}
						</option>
					))}
				</select>
			</div>
			<Icon
				id="fa-floppy-o"
				cursor="pointer"
				onClick={onRoleSave}
				disabled={initialRoleId === currRoleId}
			/>
			<Icon id="fa-trash-o" cursor="pointer" onClick={onUserRemove} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	gap: 8px;
	width: 650px;
	margin-bottom: 8px;
	padding: 4px 8px;
	border: solid 2px #000;
	border-radius: 4px;
	font-size: 20px;

	&:last-of-type {
		margin-bottom: 0;
	}

	& > .loginCol {
		display: flex;
		align-items: center;
		width: 170px;
	}

	& > .regDateCol {
		display: flex;
		align-items: center;
		width: 210px;
	}

	& > .roleIdCol {
		display: flex;
		align-items: center;
		width: auto;
	}

	& select {
		font-size: 20px;
		border: solid 2px #000;
		border-radius: 4px;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string,
	regDate: PropTypes.string,
	roleId: PropTypes.oneOf(Object.values(ROLE)),
	roles: PropTypes.arrayOf(PropTypes.object),
	onUserRemove: PropTypes.func,
};
