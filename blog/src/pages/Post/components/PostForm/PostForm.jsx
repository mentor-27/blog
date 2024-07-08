import PropTypes from 'prop-types';
import { useRef } from 'react';
import { ContentError, Input } from '../../../../components';
import { MetaBlock } from '../MetaBlock/MetaBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePostAsync } from '../../../../redux/actions';
import { sanitize } from '../../../../utils';
import { selectUserRole } from '../../../../redux/selectors';
import { ERROR, ROLE } from '../../../../constants';
import styled from 'styled-components';

const PostFormContainer = ({ className, id, title, imageUrl, content, publishedAt }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const userRole = useSelector(selectUserRole);

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = contentRef.current.innerHTML;

		dispatch(
			savePostAsync(id, {
				imageUrl: newImageUrl,
				title: newTitle,
				content: sanitize(
					newContent,
					[/<\/?div.*>/, '<br>', /<\/?span.*>/, / {2,}/, /\n\s+\n/],
					['\n', '', '', ' ', '\n\n'],
				),
			}),
		).then(({ id }) => navigate(`/posts/${id}`));
	};

	return (
		<div className={className}>
			<ContentError error={userRole !== ROLE.ADMIN ? ERROR.ACCESS_DENIED : ''}>
				<Input
					ref={imageRef}
					defaultValue={imageUrl}
					placeholder="Ссылка на изображение..."
					margin="0 0 10px 0"
					required
				/>
				<Input
					ref={titleRef}
					defaultValue={title}
					placeholder="Заголовок статьи..."
					margin="0 0 10px 0"
					required
				/>
				<MetaBlock
					id={id}
					publishedAt={publishedAt}
					isEditing={true}
					onEditSave={onSave}
				/>
				<div
					ref={contentRef}
					contentEditable={true}
					suppressContentEditableWarning={true}
					className="postContent"
				>
					{content}
				</div>
			</ContentError>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& .postContent {
		text-align: justify;
		font-size: 18px;
	}

	& .postContent:read-write {
		padding: 8px;
		border: solid 1px #000;
		border-radius: 8px;
		white-space: break-spaces;
		font-family: sans-serif;
	}
`;

PostForm.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	imageUrl: PropTypes.string,
	content: PropTypes.string,
	publishedAt: PropTypes.string,
};
