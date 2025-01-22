import { useParams } from "react-router-dom";
import "./OrderDetails.css";

export const OrderDetails = () => {
    const { orderId } = useParams();

    return <div>{orderId}</div>;
};
