import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/reducers/ActionCreators";

function App() {
	const dispatch = useAppDispatch();
	const {users, isLoading, error} = useAppSelector(state => state.userReducer)

	useEffect(() => {
		dispatch(fetchUsers());
	}, [])

	if(isLoading) {
		return <h1>Loading...</h1>
	}

	if(error) {
		return <h1>{error}</h1>
	}

	return (
		<div className="App">
			{/* {JSON.stringify(users, null, 2)} */}
			{users.map(user =>
				<div key={user.id} className="item">
					{user.id} - {user.name}
				</div>	
			)}
		</div>
	);
}

export default App;
