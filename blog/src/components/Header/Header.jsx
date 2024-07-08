import { Logo, ControlPanel } from './components';
import styled from 'styled-components';

const Description = styled.div`
	font-style: italic;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Description>
			Веб-технологии
			<br />
			Написание кода
			<br />
			Разбор ошибок
		</Description>
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120px;
	padding-inline: 37px 17px;
	position: fixed;
	top: 0;
	width: 1000px;
	border-radius: 0 0 8px 8px;
	background-color: #fff;
`;
