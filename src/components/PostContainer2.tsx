import { FC } from 'react'
import { postAPI } from '../services/PostService'
import PostItem from './PostItem';
import { IPost } from '../models/IPost';

const PostContainer2: FC = () => {
	const {data: posts, isLoading, error} = postAPI.useFetchAllPostsQuery(100);
	const [deletePost] = postAPI.useDeletePostMutation();
	const [updatePost] = postAPI.useUpdatePostMutation();

	const handleRemove = async (post: IPost) => {
		deletePost(post);
	}

	const handleUpdate = async (post: IPost) => {
		updatePost(post);
	}

	return (
		<div className='posts'>
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
	)
}

export default PostContainer2
