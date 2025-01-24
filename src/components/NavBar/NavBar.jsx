import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
    return (
        <ul>
            <li>
                <Link to="/home" className="navbar-link">Home</Link>
            </li>
            <li>
                <Link to="/newOrder" className="navbar-link">New Order</Link>
            </li>
            <li>
                <Link className="navbar-link" to="/OrderList">Order List</Link>
            </li>
            <li>
                <Link className="navbar-link">Employee List</Link>
            </li>
            <li>
                <Link to="/salesReport" className="navbar-link">Sales Report</Link>
            </li>
            {localStorage.getItem("employee_user") ? (
                <li>
                    <Link
                        className="navbar-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("employee_user");
                            navigate("/login", { replace: true });
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    );
};
