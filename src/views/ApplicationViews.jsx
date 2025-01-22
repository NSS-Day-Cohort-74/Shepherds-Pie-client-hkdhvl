import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { OrderList } from "../components/OrderList/OrderList";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element= {
            <>
                <NavBar />
                <Outlet />
            </>

            }>
                <Route path="OrderList">
                    <Route index element={<OrderList />} />
                </Route>
                <Route index element={<>HELLOWORLD</>} />
            </Route>
        </Routes>
    );
};
