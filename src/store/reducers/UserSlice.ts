import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import { addUser, fetchUsers, removeUserById } from './ActionCreators';

interface UserState {
	users: IUser[];
	isLoading: boolean;
	error: any;
}

const initialState: UserState = {
	users: [],
	isLoading: false,
	error: '',
};

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
				state.isLoading = false;
				state.error = '';
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(addUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addUser.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.isLoading = false;
				state.error = '';
				state.users.push(action.payload);
			})
			.addCase(addUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(removeUserById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeUserById.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.isLoading = false;
				state.error = '';
				state.users = state.users.filter(user => user.id !== action.payload.id); 
			})			
			.addCase(removeUserById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
	}
});

export default UserSlice.reducer;
