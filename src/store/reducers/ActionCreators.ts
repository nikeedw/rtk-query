import axios from "axios";
import { IUser } from "../../models/IUser";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching())
//         const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
//         dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//     } catch (e) {
//         dispatch(userSlice.actions.usersFetchingError(e.message))
//     }
// }

export const fetchUsers = createAsyncThunk(
	'user/fetchAll',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get<IUser[]>('http://localhost:3500/users')
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
		}
	}
)

export const addUser = createAsyncThunk(
	'user/addUser',
	async (user: IUser, thunkAPI) => {
		try {
			const response = await axios.post('http://localhost:3500/users', user);
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue("Не удалось добавить пользователя");
		}
	}
);

export const removeUserById = createAsyncThunk(
	'user/removeUserById',
	async (user: IUser, thunkAPI) => {
		try {
			const response = await axios.delete(`http://localhost:3500/users/${user.id}`);
			return user;
		} catch (error) {
			return thunkAPI.rejectWithValue("Не удалось удалить пользователя")
		}
	}
)

