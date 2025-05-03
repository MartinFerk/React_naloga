import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../userContext";

function Header(props) {
    const { user } = useContext(UserContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
            <div className="container-fluid">
                <span className="navbar-brand fw-bold fs-3">Vaja 3 - react</span>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {user ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/publish">Publish</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-danger" to="/logout">Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Header;
