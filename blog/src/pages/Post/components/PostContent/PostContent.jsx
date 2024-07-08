import PropTypes from 'prop-types';
import { Title } from '../../../../components';
import { MetaBlock } from '../MetaBlock/MetaBlock';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PostContentContainer = ({
	className,
	id,
	title,
	imageUrl,
	content,
	publishedAt,
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img className="postImage" src={imageUrl} alt={title} />
			<Title level="2" margin="0 0 16px 0">
				{title}
			</Title>
			<MetaBlock id={id} publishedAt={publishedAt} onEditSave={() => navigate('edit')} />
			<div className="postContent">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& .postImage {
		float: left;
		margin: 0 20px 20px 0;
		border-radius: 8px;
		width: 375px;
		height: 206px;
		background-size: contain;
	}

	& .metaBlock {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		font-size: 18px;
	}

	& .dateBlock,
	.actionsBlock {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	& .postContent {
		text-align: justify;
		font-size: 18px;
		white-space: break-spaces;
	}
`;

PostContent.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	imgUrl: PropTypes.string,
	content: PropTypes.string,
	pubDate: PropTypes.string,
};
