import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'
import { fetchUsers } from './ActionCreators'

interface UserState {
	users: IUser[],
	isLoading: boolean
	error: any
}

const initialState: UserState = {
	users: [],
	isLoading: false,
	error: '',
}

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// usersFetching(state) {
		// 	state.isLoading = true;
		// },
		// usersFetcingSucces(state, action: PayloadAction<IUser[]>) {
		// 	state.isLoading = false;
		// 	state.error = '';
		// 	state.users = action.payload;
		// },
		// usersFetcingError(state, action: PayloadAction<string>) {
		// 	state.isLoading = false;
		// 	state.error = action.payload;
		// }
	},
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
		  });
	}
})

export default UserSlice.reducer;