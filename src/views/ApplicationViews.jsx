import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { OrderDetails } from "../components/OrderDetails/OrderDetails";
import { OrderList } from "../components/OrderList/OrderList";
import { SalesReport } from "../components/SalesReport/SalesReport";
import { AddNewPizza } from "../components/AddNewPizza/AddNewPizza";

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
                <Route path="OrderList">
                    <Route index element={<OrderList />} />
                </Route>   
                <Route path="Sales-Report">
                    <Route index element={<SalesReport />} />
                </Route> 
                <Route path="order">
                    <Route path=":orderId" element={<OrderDetails />} />
                </Route>
                <Route path="newPizza">
                    <Route index element={<AddNewPizza />} />
                </Route>
            </Route>
        </Routes>
    );
};
