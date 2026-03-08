import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="p-8">
			<h1 className="text-xl font-semibold">Home</h1>
			<p className="mt-2 text-gray-600">
				Páginas públicas e protegidas para testar a autenticação.
			</p>
			<nav className="mt-4 flex gap-4">
				<Link to="/login" className="text-blue-600 underline">
					Login
				</Link>
				<Link to="/dashboard" className="text-blue-600 underline">
					Dashboard (protegido)
				</Link>
				<Link to="/about" className="text-blue-600 underline">
					About
				</Link>
			</nav>
		</div>
	);
}
