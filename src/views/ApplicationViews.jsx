import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { NewOrder } from "../components/NewOrder/NewOrder";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element= {
            <>
                <NavBar />
                <Outlet />
            </>

            }>
                <Route index element={<>HELLOWORLD</>} />
                <Route path="newOrder" element={<NewOrder />} />
            </Route>
        </Routes>
    );
};
