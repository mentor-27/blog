import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { removePostAsync, showModal } from '../../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { selectUserRole } from '../../../../redux/selectors';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import styled from 'styled-components';

const MetaBlockContainer = ({
	className,
	id,
	publishedAt,
	isEditing = false,
	onEditSave,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	const onPostRemove = () => {
		dispatch(
			showModal({
				title: 'Удалить статью?',
				onConfirm: () => dispatch(removePostAsync(id)).then(() => navigate('/')),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="dateBlock">
				{id && <Icon id="fa-calendar-o" size="18px" />}
				{publishedAt && (
					<div className="dataBlock">{new Date(publishedAt).toLocaleString()}</div>
				)}
			</div>
			<div className="actionsBlock">
				{isAdmin && (
					<Icon
						id={isEditing ? 'fa-floppy-o' : 'fa-pencil-square-o'}
						margin={!isEditing ? '4px 0 0 0' : '0'}
						cursor="pointer"
						onClick={onEditSave}
					/>
				)}
				{isAdmin && id && (
					<Icon id="fa-trash-o" cursor="pointer" onClick={onPostRemove} />
				)}
			</div>
		</div>
	);
};

export const MetaBlock = styled(MetaBlockContainer)`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	font-size: 18px;

	& .dateBlock,
	.actionsBlock {
		display: flex;
		align-items: center;
		gap: 8px;
	}
`;

MetaBlock.propTypes = {
	id: PropTypes.string,
	pubDate: PropTypes.string,
	isEditing: PropTypes.bool,
	onEditSave: PropTypes.func,
};
