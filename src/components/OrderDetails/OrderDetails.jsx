import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { useEffect, useState } from "react";
import { deleteOrderById, getOrderById } from "../../services/orderService";
import { PizzaDetail } from "./PizzaDetail";
import { ConfirmDelete } from "../modal/ConfirmDelete";
import { AssignEmployee } from "../modal/AssignDelivery";

export const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [orderData, setOrderData] = useState({});
    const [pizzaCost, setPizzaCost] = useState(0.0);
    const [totalCost, setTotalCost] = useState(0.0);
    const [deliveryDriver, setDriver] = useState("");

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [showAssignModal, setShowAssignModal] = useState(false);
    const handleOpenAssignModal = () => setShowAssignModal(true);
    const handleCloseAssignModal = () => setShowAssignModal(false);

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
    }, [orderData, location]);

    return (
        <section className="order-info-container">
            <article className="order-info">
                <div className="order-info-data">
                    <h2>Order #{orderData.id}:</h2>
                    <div>Order DateTime: {orderData.dateTime}</div>
                    <div>Order Status: {orderData.status}</div>
                </div>
                {orderData.status === "Out for Delivery" ? (
                    <div>Driver: {deliveryDriver}</div>
                ) : (
                    ""
                )}
                <div className="order-info-deliverydriver">
                    {orderData?.isDelivery &&
                    orderData?.status !== "Delivered" &&
                    orderData?.status !== "Out for Delivery" ? (
                        <>
                            <button
                                onClick={handleOpenAssignModal}
                                className="order-info-btn"
                            >
                                Assign Delivery
                            </button>
                            <AssignEmployee
                                isOpen={showAssignModal}
                                onClose={handleCloseAssignModal}
                                currentOrderId={orderId}
                                orderData={orderData}
                                resetPizzas={resetPizzas}
                                setDriver={setDriver}
                            ></AssignEmployee>
                        </>
                    ) : (
                        ""
                    )}
                </div>

                <div className="order-info-customer">
                    <div>Customer Name: {orderData.customer?.name}</div>
                    <div>Customer Email: {orderData.customer?.email}</div>
                    <div>Customer phone: {orderData.customer?.phone}</div>
                    <div>Customer address: {orderData.customer?.address}</div>
                </div>
                <div>
                    <h3>Pizza List:</h3>
                    {generatePizzaList()}
                </div>
                <h4>Total Cost: ${totalCost.toFixed(2)}</h4>
                <div className="btn-container">
                    <button
                        onClick={() => {
                            navigate("/newPizza", {
                                state: { orderId: orderId },
                            });
                        }}
                    >
                        Add Pizza
                    </button>
                    <button onClick={handleOpenModal}>Cancel Order</button>
                    <ConfirmDelete
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        onConfirm={handleCancelOrder}
                    >
                        <h2>Are you sure you want to cancel the order?</h2>
                    </ConfirmDelete>
                </div>
            </article>
        </section>
    );
};
