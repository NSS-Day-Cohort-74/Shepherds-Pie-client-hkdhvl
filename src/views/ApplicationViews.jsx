import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";

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
            </Route>
        </Routes>
    );
};
