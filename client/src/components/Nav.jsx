import { Link } from "react-router-dom";
const Nav = () => {
	return (
		<div className="navbar bg-base-100 z-50	items-center">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu items-center menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<Link to="/" className="no-underline text-amber-500">
								{" "}
								Home
							</Link>
						</li>
						<li>
							<Link className="no-underline text-amber-500" to="/archived">
								Archived
							</Link>
						</li>
					
					</ul>
				</div>
				<Link
					to="/"
					className="btn btn-ghost text-xl gochi-hand-regular text-teal-500 font-semibold"
				>
					Blue-Task
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 gochi-hand-regular ">
					<li>
						<Link to="/" className="no-underline text-amber-500">
							{" "}
							Home
						</Link>
					</li>
					<li>
						<Link className="no-underline text-amber-500" to="/archived">
							Archived
						</Link>
					</li>
					
				</ul>
			</div>
		</div>
	);
};
export default Nav;
