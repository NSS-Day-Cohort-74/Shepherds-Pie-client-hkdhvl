import { Link } from "react-router-dom"
import "./Home.css"

export const Home = () => {

    return (
        <>
        <h1>Welcome</h1>
        <div className="home-page">
        <img src="1F5CDD95-549F-4EBF-B399-796F1D9159AF.png" alt="Description" />
        <Link to="/newOrder">
        <button className="order-button">
            Place Order
        </button>
        </Link>

        </div>
        </>
    )
}