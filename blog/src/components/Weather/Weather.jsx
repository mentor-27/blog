import PropTypes from 'prop-types';
import styled from 'styled-components';

const WeatherContainer = ({ className, data }) => {
	const { name, main, weather } = data;
	return (
		<div className={className}>
			<div className="verticalBlock">
				<div className="name">{name}</div>
				<div className="dateSign">
					{new Date().toLocaleDateString('ru', { day: 'numeric', month: 'long' })}
				</div>
			</div>
			<div className="verticalBlock">
				<div className="temp">{Math.round(main.temp)}°С</div>
				<div className="description">{weather[0].description}</div>
			</div>
			<div className="imgBlock">
				<img
					src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
					alt={weather[0].description}
				/>
			</div>
		</div>
	);
};

export const Weather = styled(WeatherContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	width: fit-content;
	padding-left: 16px;
	background: linear-gradient(to right, transparent, #abc 65%);

	& .name {
		font-size: 24px;
		font-weight: 600;
	}

	& .dateSign {
		font-size: 16px;
		font-style: italic;
	}

	& .verticalBlock {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& .temp {
		font-size: 36px;
		font-weight: 600;
	}

	& .description {
		width: 100px;
		text-align: center;
		font-size: 12px;
		font-weight: 400;
	}

	& .imgBlock {
		display: flex;
		align-items: center;
		height: 100%;
	}
`;

Weather.propTypes = {
	data: PropTypes.object.isRequired,
};

// Response object shape
/* {
	"coord": {
			"lon": 12.3456,
			"lat": 98.7654
	},
	"weather": [
			{
					"id": 804,
					"main": "Clouds",
					"description": "пасмурно",
					"icon": "04n"
			}
	],
	"base": "stations",
	"main": {
			"temp": 6.65,
			"feels_like": 2.04,
			"temp_min": 6.65,
			"temp_max": 6.65,
			"pressure": 1013,
			"humidity": 62,
			"sea_level": 1013,
			"grnd_level": 1005
	},
	"visibility": 10000,
	"wind": {
			"speed": 1.23,
			"deg": 180,
			"gust": 16.62
	},
	"clouds": {
			"all": 100
	},
	"dt": 1715376105,
	"sys": {
			"country": "RU",
			"sunrise": 1715388505,
			"sunset": 1715444978
	},
	"timezone": 14400,
	"id": 482283,
	"name": "Анапа",
	"cod": 200
}
 */
