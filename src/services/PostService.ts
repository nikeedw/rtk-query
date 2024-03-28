import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../models/IPost';

export const postAPI = createApi({
	reducerPath: 'postAPI',
	baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
	tagTypes: ['Post'],
	endpoints: (build) => ({
		fetchAllPosts: build.query<IPost[], number>({
			query: (limit: number = 5) => ({
				method: 'GET',
				url: '/posts',
				params: {_limit: limit}
			}),
			providesTags: result => ['Post'] // делает рефетч
		}),
		createPost: build.mutation<IPost, IPost>({
			query: (post) => ({
				method: 'POST',
				url: '/posts',
				body: post
			}),
			invalidatesTags: ['Post'] // при создании поста, указываем, что данные неактуальны
		}),
		updatePost: build.mutation<IPost, IPost>({
			query: (post) => ({
				method: 'PUT',
				url: `/posts/${post.id}`,
				body: post
			}),
			invalidatesTags: ['Post'] // при создании поста, указываем, что данные неактуальны
		}),
		deletePost: build.mutation<IPost, IPost>({
			query: (post) => ({
				method: 'DELETE',
				url: `/posts/${post.id}`
			}),
			invalidatesTags: ['Post'] // при создании поста, указываем, что данные неактуальны
		}),
	})
})