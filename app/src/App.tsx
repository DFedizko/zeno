import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./auth";
import { router } from "./router";

const queryClient = new QueryClient();

const InnerApp = () => {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
};

const App = () => (
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<InnerApp />
		</AuthProvider>
	</QueryClientProvider>
);

export default App;
