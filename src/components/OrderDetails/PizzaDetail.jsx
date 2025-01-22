import { useEffect, useState } from "react";
import { getPizzaById, getToppingByPizzaId } from "../../services/orderService";
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";

export const PizzaDetail = ({ pizzaId, setPizzaCost }) => {
    const [pizzaData, setPizzaData] = useState({});
    const [toppingData, setToppingData] = useState([]);

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
                ? parseInt(
                      pizzaData.size?.cost +
                          pizzaData.pizzaToppings?.length * 0.5
                  )
                : 0
        );
    }, [pizzaData]);

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
                Pizza Cost: ${pizzaData.size?.cost} + Toppings Cost:{" "}
                {pizzaData.pizzaToppings?.length * 0.5}
            </div>
        </article>
    );
};
