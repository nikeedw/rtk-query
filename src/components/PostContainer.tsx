import { FC, useEffect, useState } from 'react'
import { postAPI } from '../services/PostService'
import PostItem from './PostItem';
import { IPost } from '../models/IPost';

const PostContainer: FC = () => {
	const [limit, setLimit] = useState(100);
	const {data: posts, isLoading, error, refetch} = postAPI.useFetchAllPostsQuery(limit);
	// const {data: posts, isLoading, error, refetch} = postAPI.useFetchAllPostsQuery(limit, {
	// 	pollingInterval: 1000
	// });
	const [createPost, {isLoading: isPostLoading}] = postAPI.useCreatePostMutation();
	const [deletePost] = postAPI.useDeletePostMutation();
	const [updatePost] = postAPI.useUpdatePostMutation();

	useEffect(() => {
		// setTimeout(() => {
		// 	setLimit(5);
		// }, 2000);
	}, [])

	const handleCreate = async () => {
		const title = prompt();
		await createPost({title: title, body: title} as IPost); // т.к. айди генерирует сервер
	}

	const handleRemove = async (post: IPost) => {
		deletePost(post);
	}

	const handleUpdate = async (post: IPost) => {
		updatePost(post);
	}

	return (
		<>
			<div className='posts'>
				<button onClick={() => refetch()}>REFETCH</button>
				<button onClick={handleCreate}>Add new post</button>
				{isLoading && <h1>Loading...</h1>}
				{error && <h1>Произошла ошибка при загрузке</h1>}
				{posts && posts.map(post =>
					<PostItem 
						key={post.id} 
						post={post}
						remove={handleRemove}
						update={handleUpdate}
					/>
				)}
			</div>
		</>
	)
}

export default PostContainer
