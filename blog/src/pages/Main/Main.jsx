import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../redux/actions';
import { selectPosts } from '../../redux/selectors';
import { Pagination, PostCard, Search } from './components';
import { Link } from 'react-router-dom';
import { Title } from '../../components';
import { PAGINATION_LIMIT } from '../../constants';
import { request } from '../../utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);
	const [page, setPage] = useState(1);
	const [last, setLast] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const debSearch = useDebounce(searchQuery, 2000);

	useEffect(() => {
		request(`/posts?search=${debSearch}&page=${page}&limit=${PAGINATION_LIMIT}`).then(
			({ data: { posts, lastPage } }) => {
				dispatch(setPosts(posts));
				setLast(lastPage);
			},
		);
	}, [dispatch, page, debSearch]);

	return (
		<>
			<Search search={searchQuery} setSearch={setSearchQuery} />
			<div className={className}>
				{posts.length ? (
					posts.map(post => (
						<Link key={post.id} className="postContainer" to={`/posts/${post.id}`}>
							<PostCard {...post} />
						</Link>
					))
				) : (
					<Title level="2">Статьи не найдены</Title>
				)}
			</div>
			{last > 1 && <Pagination setPage={setPage} {...{ current: page, last }} />}
		</>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 35px;
	width: 100%;

	& .postContainer {
		width: calc(100% / 3 - 50px);
		height: auto;
		border: solid 1px #000;
		border-radius: 4px;
		overflow: hidden;
	}

	& .postImg {
		width: 100%;
		background-size: contain;
	}

	& .postData {
		padding: 0 15px 15px;
		background-color: #f8fcff;
	}

	& .postTitle {
		font-weight: 600;
		margin-bottom: 12px;
	}

	& .postMeta,
	.postPubDate,
	.postComments {
		display: flex;
		gap: 8px;
		justify-content: space-between;
	}
`;
