import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { NewOrder } from "../components/NewOrder/NewOrder";
import { OrderDetails } from "../components/OrderDetails/OrderDetails";
import { OrderList } from "../components/OrderList/OrderList";

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
               <Route path="newOrder" element={<NewOrder />} />
                <Route path="OrderList">
                    <Route index element={<OrderList />} />
                </Route>   
                <Route path="order">
                    <Route path=":orderId" element={<OrderDetails />} />
                </Route>
            </Route>
        </Routes>
    );
};
