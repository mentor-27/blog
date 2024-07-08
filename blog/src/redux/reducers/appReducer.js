import { ACTION_TYPE } from '../actions';

const initialAppState = {
	modal: {
		isOpen: false,
		title: '',
		confirmSign: 'Да',
		cancelSign: 'Отмена',
		onConfirm: () => {},
	},
};

export const appReducer = (state = initialAppState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_MODAL:
			return {
				...state,
				modal: { ...state.modal, ...payload, isOpen: true },
			};

		case ACTION_TYPE.HIDE_MODAL:
			return initialAppState;

		default:
			return state;
	}
};
