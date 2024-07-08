import { ACTION_TYPE } from './actionType';

export const showModal = args => ({ type: ACTION_TYPE.SET_MODAL, payload: args });
