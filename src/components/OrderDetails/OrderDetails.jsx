import { useParams } from "react-router-dom";
import "./OrderDetails.css";
import { useEffect, useState } from "react";
import { getOrderById, getPizzaById } from "../../services/orderService";
import { PizzaDetail } from "./PizzaDetail";

export const OrderDetails = () => {
    const { orderId } = useParams();

    const [orderData, setOrderData] = useState({});
    const [pizzaCost, setPizzaCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        getOrderById(orderId).then((data) => setOrderData(data));
    }, []);

    useEffect(() => {
        let totalCostCopy = parseInt(totalCost);
        totalCostCopy += parseInt(pizzaCost);
        setTotalCost(parseInt(totalCostCopy));
    }, [pizzaCost]);

    return (
        <section>
            <div>OrderId: {orderData.id}</div>
            <div>Order DateTime: {orderData.dateTime}</div>
            <div>Order Status: {orderData.status}</div>
            <div>
                <h3>Customer Name: {orderData.customer?.name}</h3>
                <p>Customer Email: {orderData.customer?.email}</p>
                <p>Customer phone: {orderData.customer?.phone}</p>
                <p>Customer address: {orderData.customer?.address}</p>
            </div>
            <div>
                Pizza List:
                {orderData.pizzas?.map((pizzaObject) => (
                    <PizzaDetail
                        key={pizzaObject.id}
                        pizzaId={pizzaObject.id}
                        setPizzaCost={setPizzaCost}
                    />
                ))}
            </div>
            <div>Total Cost: {totalCost}</div>
        </section>
    );
};
