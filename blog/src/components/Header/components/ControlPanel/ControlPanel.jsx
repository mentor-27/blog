import { ROLE } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon, Title } from '../../..';
import { logout } from '../../../../redux/actions';
import { selectUserLogin, selectUserRole } from '../../../../redux/selectors';
import { checkAccess } from '../../../../utils';
import styled from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 96px;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const login = useSelector(selectUserLogin);
	const userRole = useSelector(selectUserRole);

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<RightAligned>
				{userRole === ROLE.GUEST ? (
					<Button onClick={() => navigate('/login')}>Войти</Button>
				) : (
					<>
						<Title level="3">{login}</Title> |{' '}
						<Icon
							id="fa-sign-out"
							cursor="pointer"
							onClick={() => {
								dispatch(logout());
								navigate('/login');
							}}
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					id="fa-backward"
					size="25px"
					onClick={() => navigate(-1)}
					cursor="pointer"
				/>
				{isAdmin && (
					<Link to="/posts">
						<Icon id="fa-file-text-o" cursor="pointer" />
					</Link>
				)}
				{isAdmin && (
					<Link to="/users">
						<Icon id="fa-group" cursor="pointer" />
					</Link>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;
