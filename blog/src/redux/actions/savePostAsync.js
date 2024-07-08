import { request } from '../../utils';
import { setPostData } from './setPostData';

export const savePostAsync = (id, newPostData) => dispatch =>
	request(`/posts/${id || ''}`, id ? 'PATCH' : 'POST', newPostData).then(({ data }) => {
		dispatch(setPostData(data));
		return data;
	});
