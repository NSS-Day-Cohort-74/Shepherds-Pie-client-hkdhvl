import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { NewOrder } from "../components/NewOrder/NewOrder";
import { OrderDetails } from "../components/OrderDetails/OrderDetails";
import { OrderList } from "../components/OrderList/OrderList";
import { AddNewPizza } from "../components/AddNewPizza/AddNewPizza";
import { EmployeeDetails } from "../components/Employees/EmployeeDetails";
import { SalesReport } from "../components/SalesReport/SalesReport";
import { EmployeeList } from "../components/Employees/EmployeeList";
import { Home } from "../components/Home/Home";


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
              <Route index element={<Home />} />
               <Route path="newOrder" element={<NewOrder />} />
                <Route path="OrderList">
                    <Route index element={<OrderList />} />
                </Route>
                <Route path="order">
                    <Route path=":orderId" element={<OrderDetails />} />
                </Route>
                <Route path="newPizza">
                    <Route index element={<AddNewPizza />} />
                </Route>
                <Route path="employeeList" element={<EmployeeList />} />
                <Route path="employee" >
                    <Route path=":employeeId" element={<EmployeeDetails />} />
                </Route>
                <Route path="home">
                    <Route index element={<Home />} />
                </Route>
                <Route path="salesReport" element={<SalesReport />} />
              </Route>
        </Routes>
    );
};
