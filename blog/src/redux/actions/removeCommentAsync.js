import { request } from '../../utils';
import { removeComment } from './removeComment';

export const removeCommentAsync = (postId, commentId) => dispatch => {
	request(`/posts/${postId}/comments/${commentId}`, 'DELETE').then(postData => {
		dispatch(removeComment(commentId));
	});
};
