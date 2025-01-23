import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { useEffect, useState } from "react";
import { getOrderById } from "../../services/orderService";
import { PizzaDetail } from "./PizzaDetail";

export const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [orderData, setOrderData] = useState({});
    const [pizzaCost, setPizzaCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const resetPizzas = () => {
        getOrderById(orderId).then((data) => setOrderData(data));
    };

    useEffect(() => {
        resetPizzas();
    }, []);

    useEffect(() => {
        let copyCost = totalCost ? totalCost : 0;
        copyCost += pizzaCost;
        setTotalCost(copyCost);
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
                        resetPizzas={resetPizzas}
                    />
                ))}
            </div>
            <div>Total Cost: {totalCost}</div>
            <div>
                <button
                    onClick={() => {
                        navigate("/newPizza");
                    }}
                >
                    Add Pizza
                </button>
            </div>
        </section>
    );
};
