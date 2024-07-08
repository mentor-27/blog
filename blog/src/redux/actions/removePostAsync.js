import { request } from '../../utils';
import { RESET_POST_DATA } from './resetPostData';

export const removePostAsync = postId => dispatch =>
	request(`/posts/${postId}`, 'DELETE').then(() => {
		dispatch(RESET_POST_DATA);
	});
