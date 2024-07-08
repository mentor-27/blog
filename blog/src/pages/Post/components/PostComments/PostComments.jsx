import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../redux/selectors';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { addCommentAsync, showModal } from '../../../../redux/actions';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import styled from 'styled-components';

const PostCommentsContainer = ({ className, postId, comments }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const canComment = checkAccess([ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER], userRole);

	const onCommentAdd = (postId, content) => {
		if (!content) {
			dispatch(
				showModal({
					title: 'Комментарий не может быть пустым',
					confirmSign: null,
					cancelSign: 'ОК',
				}),
			);
			return;
		}
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			{canComment && (
				<div className="newComment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						cursor="pointer"
						color="teal"
						margin="8px 0 0 0"
						onClick={() => onCommentAdd(postId, newComment)} // TODO (clears logins after comment is added)
					/>
				</div>
			)}
			<div className="commentsList">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
						postId={postId}
					/>
				))}
			</div>
		</div>
	);
};

export const PostComments = styled(PostCommentsContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 0;

	& .newComment {
		display: flex;
		gap: 8px;
		margin-bottom: 20px;
		width: 600px;
	}

	& textarea {
		font-family: sans-serif;
		font-size: 18px;
		width: 100%;
		height: 120px;
		padding: 8px;
		border: dashed 2px #ccc;
		border-radius: 4px;
		resize: vertical;
		outline: none;
	}

	& textarea:focus {
		border-style: solid;
		border-color: #888;
	}

	& .commentsList {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 600px;
	}
`;

PostComments.propTypes = {
	postId: PropTypes.string,
	comments: PropTypes.arrayOf(PropTypes.object),
};
