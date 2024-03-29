import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers, addUser, removeUserById } from "./store/reducers/ActionCreators";
import { IUser } from "./models/IUser";

function App() {
	const dispatch = useAppDispatch();
	const {users, isLoading, error} = useAppSelector(state => state.userReducer)

	useEffect(() => {
		dispatch(fetchUsers());
	}, [])

	const handleAddUser = () => {
		const name = prompt();
		dispatch(addUser({name, email: name} as IUser));
	}

	const handleDeleteUser = (user: IUser) => {
		dispatch(removeUserById(user))
	}

	if(isLoading) {
		return <h1>Loading...</h1>
	}

	if(error) {
		return <h1>{error}</h1>
	}

	return (
		<div className="Application">
			<button onClick={handleAddUser}>Add User</button>
			{users.map(user =>
				<div key={user.id} className="item">
					{user.id} - {user.name}
					<button onClick={() => handleDeleteUser(user)}>Delete</button>
				</div>	
			)}
		</div>
	);
}

export default App;
