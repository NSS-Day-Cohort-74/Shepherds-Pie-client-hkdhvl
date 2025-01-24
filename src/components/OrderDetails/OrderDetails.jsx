import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { useEffect, useState } from "react";
import { deleteOrderById, getOrderById } from "../../services/orderService";
import { PizzaDetail } from "./PizzaDetail";
import { ConfirmDelete } from "../modal/ConfirmDelete";

export const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [orderData, setOrderData] = useState({});
    const [pizzaCost, setPizzaCost] = useState(0.0);
    const [totalCost, setTotalCost] = useState(0.0);

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const resetPizzas = () => {
        getOrderById(orderId).then((data) => setOrderData(data));
    };

    const addToTotal = (cost) => {
        let copyTotalCost = totalCost ? totalCost : 0;
        copyTotalCost += cost;
        setTotalCost(copyTotalCost);
    };

    const subtractFromTotal = (cost) => {
        let copyTotalCost = totalCost ? totalCost : 0.0;
        copyTotalCost -= cost;
        setTotalCost(copyTotalCost);
    };

    const generatePizzaList = () => {
        return orderData.pizzas?.map((pizzaObject) => (
            <PizzaDetail
                key={pizzaObject.id}
                pizzaId={pizzaObject.id}
                setPizzaCost={setPizzaCost}
                subtractFromTotal={subtractFromTotal}
                resetPizzas={resetPizzas}
            />
        ));
    };

    const handleCancelOrder = () => {
        deleteOrderById(orderData.id).then(() => {
            navigate("/OrderList");
        });
    };

    useEffect(() => {
        resetPizzas();
    }, []);

    useEffect(() => {
        addToTotal(pizzaCost);
    }, [pizzaCost]);

    useEffect(() => {
        generatePizzaList();
    }, [orderData]);

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
                {generatePizzaList()}
            </div>
            <div>Total Cost: ${totalCost.toFixed(2)}</div>
            <div>
                <button
                    onClick={() => {
                        navigate("/newPizza", { state: { orderId: orderId } });
                    }}
                >
                    Add Pizza
                </button>
            </div>
            <div>
                <button onClick={handleOpenModal}>Cancel Order</button>
                <ConfirmDelete
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    onConfirm={handleCancelOrder}
                >
                    <h2>Are you sure you want to cancel the order?</h2>
                </ConfirmDelete>
            </div>
        </section>
    );
};
