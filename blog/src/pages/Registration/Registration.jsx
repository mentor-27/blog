import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { request } from '../../utils';
import { setUser } from '../../redux/actions';
import { Button, Input, Title, FormErrorBlock } from '../../components';
import styled from 'styled-components';

const regSchema = yup.object().shape({
	login: yup
		.string()
		.required('Не указан логин')
		.matches(/^\w+$/, 'Логин невалидный')
		.min(3, 'Слишком короткий логин, минимум 3 символа')
		.max(16, 'Слишком длинный логин, максимум 16 символов'),
	password: yup
		.string()
		.required('Не указан пароль')
		.matches(
			/^[\w#%]+$/,
			'Пароль невалидный. Допустимы латинские символы, цифры и знаки: #, %',
		)
		.min(6, 'Слишком короткий пароль, минимум 6 символов')
		.max(24, 'Слишком длинный пароль, максимум 24 символа'),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const [respError, setRespError] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(regSchema),
	});

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setRespError(`Request error: ${error}`);
				return;
			}

			dispatch(setUser(user));
			reset();
			navigate('/');
		});
	};

	const formError =
		errors.login?.message || errors.password?.message || errors.confirmPassword?.message;
	const errorMessage = formError || respError;

	return (
		<div className={className}>
			<Title level="2" margin="40px 0 20px 0">
				Регистрация
			</Title>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин"
					{...register('login', { onChange: () => setRespError(null) })}
					margin="0 0 10px 0"
					autoFocus
				/>
				<Input
					type="password"
					placeholder="Пароль"
					{...register('password', { onChange: () => setRespError(null) })}
					margin="0 0 10px 0"
				/>
				<Input
					type="password"
					placeholder="Повтор пароля"
					{...register('confirmPassword', { onChange: () => setRespError(null) })}
					margin="0 0 10px 0"
				/>
				<Button type="submit" margin="0 0 12px 0" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <FormErrorBlock>{errorMessage}</FormErrorBlock>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 260px;
	}
`;
