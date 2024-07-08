import PropTypes from 'prop-types';
import { Icon } from '../../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { removeCommentAsync, showModal } from '../../../../../../redux/actions';
import { selectUserRole } from '../../../../../../redux/selectors';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../constants';
import styled from 'styled-components';

const CommentContainer = ({ className, id, author, content, publishedAt, postId }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const canDelete = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole);

	const onCommentRemove = () => {
		dispatch(
			showModal({
				title: 'Удалить комментарий?',
				onConfirm: () => dispatch(removeCommentAsync(postId, id)),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="mainPart">
				<div className="infoBlock">
					<div className="authorBlock">
						<Icon id="fa-user-circle-o" size="20px" margin="0 0 2px 0" />
						<div className="authorLogin">{author}</div>
					</div>
					<div className="dateBlock">
						<Icon id="fa-calendar-o" size="18px" margin="0 0 2px 0" />
						<div>{new Date(publishedAt).toLocaleString()}</div>
					</div>
				</div>
				<div className="commentBlock">{content}</div>
			</div>
			{canDelete && (
				<Icon
					id="fa-trash-o"
					cursor="pointer"
					color="red"
					margin="4px 0 0 0"
					onClick={onCommentRemove}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	justify-content: space-between;

	& .mainPart {
		display: flex;
		flex-direction: column;
		gap: 8px;
		border: 2px solid #ccc;
		margin-right: 12px;
		padding: 8px;
		border-radius: 4px;
		width: 100%;
	}

	& .infoBlock {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	& .authorBlock,
	.dateBlock {
		display: flex;
		align-items: center;
		gap: 8px;
	}
`;

Comment.propTypes = {
	id: PropTypes.string,
	postId: PropTypes.string,
};
