import PropTypes from 'prop-types';
import { Icon } from '../../../../components';

export const PostCard = ({ imageUrl, title, publishedAt, comments }) => {
	return (
		<>
			<img src={imageUrl} className="postImg" alt="" />
			<div className="postData">
				<div className="postTitle">{title}</div>
				<div className="postMeta">
					<div className="postPubDate">
						<Icon id="fa-calendar-o" cursor="pointer" size="16px" />
						{new Date(publishedAt).toLocaleString()}
					</div>
					<div className="postComments">
						<Icon id="fa-comments-o" cursor="pointer" size="16px" />
						{comments.length}
					</div>
				</div>
			</div>
		</>
	);
};

PostCard.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
};
