import { Button, Title } from '../';
import { useSelector } from 'react-redux';
import { HIDE_MODAL } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalTitle,
	selectModalConfirmSign,
	selectModalCancelSign,
	selectModalOnConfirm,
} from '../../redux/selectors';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const dispatch = useDispatch();
	const isOpen = useSelector(selectModalIsOpen);
	const title = useSelector(selectModalTitle);
	const confirmSign = useSelector(selectModalConfirmSign);
	const cancelSign = useSelector(selectModalCancelSign);
	const onConfirm = useSelector(selectModalOnConfirm);

	if (!isOpen) return null;

	const hide = () => {
		dispatch(HIDE_MODAL);
	};

	const confirm = () => {
		onConfirm();
		hide();
	};

	return (
		<div className={className}>
			<div className="modalContext">
				<Title level="2" textAlign="center">
					{title}
				</Title>
				<div className="buttons">
					{confirmSign && <Button onClick={confirm}>{confirmSign}</Button>}
					<Button onClick={hide} {...(!confirmSign ? { width: '100px' } : {})}>
						{cancelSign}
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	inset: 0;
	background-color: #0008;
	backdrop-filter: blur(3px);
	z-index: 50;

	& .modalContext {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
		padding: 48px;
		width: 500px;
		border-radius: 16px;
		background: #fff;
		box-shadow: 0 0 15px #0008;
	}

	& .buttons {
		display: flex;
		justify-content: space-evenly;
		gap: 32px;
		width: 100%;
	}
`;
