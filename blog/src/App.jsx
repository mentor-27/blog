// import { useLayoutEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header, Footer, Modal, ContentError } from './components';
import { Authorization, Registration, Users, Post, Main } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from './redux/selectors';
import { ERROR, ROLE } from './constants';
import { logout, setUser } from './redux/actions';
// import { getSession } from './bff/api';
import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	width: 1000px;
	height: 100%;
	margin: 0 auto;
`;

const Page = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 32px;
	padding-block: 50px;
	position: absolute;
	inset-block: 130px;
	width: 100%;
	overflow: hidden auto;
	border-radius: 8px;
	background-color: #fff;
`;

export const App = () => {
	const roleId = useSelector(selectUserRole);
	const dispatch = useDispatch();

	// useLayoutEffect(() => {
	// 	const currSession = JSON.parse(sessionStorage.getItem('blogSession'));

	// 	if (!currSession?.hash) return;

	// 	const checkRemoteSession = async () => {
	// 		const remoteSession = await getSession(currSession.hash);

	// 		if (!remoteSession) {
	// 			logout(currSession.hash);
	// 			return;
	// 		}

	// 		dispatch(
	// 			setUser({
	// 				...currSession.user,
	// 				sessionId: currSession.hash,
	// 			}),
	// 		);
	// 	};

	// 	checkRemoteSession();
	// }, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route
						path="/login"
						element={roleId === ROLE.GUEST ? <Authorization /> : <Navigate to="/" />}
					/>
					<Route
						path="/register"
						element={roleId === ROLE.GUEST ? <Registration /> : <Navigate to="/" />}
					/>
					<Route path="/users" element={<Users />} />
					<Route path="/posts" element={<Post />} />
					<Route path="/posts/:id" element={<Post />} />
					<Route path="/posts/:id/edit" element={<Post />} />
					<Route path="*" element={<ContentError error={ERROR.PAGE_NOT_FOUND} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
