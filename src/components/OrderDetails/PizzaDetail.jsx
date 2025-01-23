import { useEffect, useState } from "react";
import {
    deletePizzaById,
    getPizzaById,
    getToppingByPizzaId,
} from "../../services/orderService";
import { ConfirmDelete } from "../modal/ConfirmDelete";

export const PizzaDetail = ({
    pizzaId,
    resetPizzas,
    setPizzaCost,
    subtractFromTotal,
}) => {
    const [pizzaData, setPizzaData] = useState({});
    const [toppingData, setToppingData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [localCost, setLocalCost] = useState(0.0);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleRemovePizza = () => {
        setShowModal(false);
        subtractFromTotal(localCost);
        deletePizzaById(pizzaData.id).then(resetPizzas());
    };

    useEffect(() => {
        getPizzaById(pizzaId).then((pizzaData) => setPizzaData(pizzaData));
    }, []);

    useEffect(() => {
        getToppingByPizzaId(pizzaData.id).then((pizzaToppingObject) =>
            setToppingData(pizzaToppingObject)
        );
    }, [pizzaData]);

    useEffect(() => {
        setPizzaCost(
            pizzaData.size
                ? pizzaData.size?.cost + pizzaData.pizzaToppings?.length * 0.5
                : 0
        );
        setLocalCost(
            pizzaData.size
                ? pizzaData.size?.cost + pizzaData.pizzaToppings?.length * 0.5
                : 0
        );
    }, [pizzaData.size?.cost]);

    return (
        <article>
            <div>Pizza #{pizzaData.id}</div>
            <div>
                {pizzaData.size?.name}
                {"  "}
                {pizzaData.cheese?.name}
                {"  "}
                {pizzaData.sauce?.name}
                <div>
                    Pizza Toppings:
                    {toppingData.map(
                        (toppingObject) => " " + toppingObject.topping?.name
                    )}
                </div>
            </div>
            <div>
                Pizza Cost: ${pizzaData.size?.cost} + Toppings Cost: $
                {pizzaData.pizzaToppings?.length * 0.5}
            </div>
            <div>
                <button onClick={handleOpenModal}>remove pizza</button>
                <ConfirmDelete
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    onConfirm={handleRemovePizza}
                >
                    <h2>Are you sure you want to remove a pizza?</h2>
                </ConfirmDelete>
            </div>
        </article>
    );
};
