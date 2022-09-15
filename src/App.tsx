import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/antd.min.css";

import HomePage from "./pages/HomePage/HomePage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";
import EditUserPage from "./pages/EditUserPage/EditUserPage";
import Page404 from "./pages/Page404/Page404";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />

					<Route path="/home">
						<Redirect to="/" />
					</Route>

					<Route path="/homepage">
						<Redirect to="/" />
					</Route>

					<Route exact path="/users" component={UsersPage} />

					<Route exact path="/users/:userId" component={UserPage} />

					<Route
						exact
						path="/users/:userId/edit"
						component={EditUserPage}
					/>

					<Route path="*" component={Page404} />
				</Switch>
			</Router>
		</QueryClientProvider>
	);
};

export default App;
