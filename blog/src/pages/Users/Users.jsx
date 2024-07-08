import { useEffect, useState } from 'react';
import { ContentError, Title } from '../../components';
import { TableRow, UserRow } from './components';
import { ERROR, ROLE } from '../../constants';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../redux/selectors';
import styled from 'styled-components';
import { request } from '../../utils';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(true);
	const [renderList, setRenderList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (userRole !== ROLE.ADMIN) {
			setErrorMessage(ERROR.ACCESS_DENIED);
			return;
		}

		Promise.all([request('/users'), request('/users/roles')]).then(
			([usersResp, rolesResp]) => {
				setErrorMessage(false);

				if (usersResp.error || rolesResp.error) {
					setErrorMessage(usersResp.error || rolesResp.error);
					return;
				}

				setUsers(usersResp.data);
				setRoles(rolesResp.data);
			},
		);
	}, [renderList, userRole]);

	const onUserRemove = id => {
		request(`/users/${id}`, 'DELETE').then(() => {
			setRenderList(!renderList);
		});
	};

	return (
		<div className={className}>
			<ContentError error={errorMessage}>
				<Title level="2" margin="0 0 20px 0">
					Пользователи
				</Title>
				<TableRow>
					<div className="loginCol">Логин</div>
					<div className="regDateCol">Дата регистрации</div>
					<div className="roleIdCol">Роль</div>
				</TableRow>
				{users.map(({ id, login, registeredAt, roleId }) => (
					<UserRow
						key={id}
						id={id}
						login={login}
						registeredAt={registeredAt}
						roleId={roleId}
						roles={roles.filter(({ id }) => +id !== ROLE.GUEST)}
						onUserRemove={() => onUserRemove(id)}
					/>
				))}
			</ContentError>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
`;
