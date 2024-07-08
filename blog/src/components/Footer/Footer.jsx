import { useState, useEffect } from 'react';
import { Weather } from '../Weather/Weather';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [weatherData, setWeatherData] = useState({});

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Sochi&units=metric&lang=ru&appid=1dc6d9a7f2a75e8ccc4a15b83b0fefc3',
		)
			.then(resp => resp.json())
			.then(data => setWeatherData(data))
			.catch(error => console.warn(error.message));
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			{weatherData.cod === 200 ? <Weather data={weatherData} /> : ''}
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	height: 120px;
	width: 1000px;
	padding-inline: 37px 0;
	border-radius: 8px 8px 0 0;
	background-color: #fff;
	/* box-shadow: 0 -3px 6px #0002; */
	font-weight: 600;
`;
