import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { PostContent, PostComments, PostForm } from './components';
import { setPostData } from '../../redux/actions';
import { selectPost, selectUserRole } from '../../redux/selectors';
import { ContentError } from '../../components';
import { ERROR, ROLE } from '../../constants';
import { checkAccess, request } from '../../utils';
import styled from 'styled-components';

const PostConatiner = ({ className }) => {
	const [error, setError] = useState(true);
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const isCreating = useMatch('/posts');
	const isEditing = useMatch('/posts/:id/edit');
	const params = useParams();
	const userRole = useSelector(selectUserRole);

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	useEffect(() => {
		if (!isAdmin && (isCreating || isEditing)) {
			setError(ERROR.ACCESS_DENIED);
			return;
		}

		if (isCreating) {
			setError(false);
			return;
		}

		request(`/posts/${params.id}`).then(({ data }) => {
			dispatch(setPostData(data));
			setError(null);
		});
	}, [dispatch, params.id, isAdmin, isCreating, isEditing]);

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<ContentError error={error}>
					<PostForm {...(isCreating ? {} : { ...post })} />
				</ContentError>
			) : (
				<>
					<PostContent {...post} />
					<PostComments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostConatiner)`
	display: flex;
	flex-direction: column;
	padding-inline: 80px;
`;
