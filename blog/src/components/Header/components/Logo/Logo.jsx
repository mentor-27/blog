import { Link } from 'react-router-dom';
import { Icon } from '../../..';
import styled from 'styled-components';

const BlogSign = styled.div`
	font-size: 48px;
	line-height: 48px;
	font-weight: 600;
	margin-top: 14px;
`;

const WebDevSign = styled.div`
	font-size: 18px;
	font-weight: 600;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa-code" size="70px" margin="0 16px 0 0" cursor="pointer" />
		<div>
			<BlogSign>Блог</BlogSign>
			<WebDevSign>веб-разработчика</WebDevSign>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
	margin-top: -16px;
`;
