import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { OrderDetails } from "../components/OrderDetails/OrderDetails";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<>HELLOWORLD</>} />
                <Route path="order">
                    <Route path=":orderId" element={<OrderDetails />} />
                </Route>
            </Route>
        </Routes>
    );
};
