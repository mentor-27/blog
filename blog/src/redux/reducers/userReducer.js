import { ROLE } from '../../constants/role';
import { ACTION_TYPE } from '../actions';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	sessionId: null,
};

export const userReducer = (state = initialUserState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...payload,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
