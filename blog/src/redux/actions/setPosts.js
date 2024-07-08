import { ACTION_TYPE } from './actionType';

export const setPosts = postList => ({ type: ACTION_TYPE.SET_POSTS, payload: postList });
