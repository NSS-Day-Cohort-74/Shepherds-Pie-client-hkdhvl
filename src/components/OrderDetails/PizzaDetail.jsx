import { useEffect, useState } from "react";
import { getPizzaById } from "../../services/orderService";

export const PizzaDetail = ({ pizzaId, setPizzaCost }) => {
    const [pizzaData, setPizzaData] = useState({});

    useEffect(() => {
        getPizzaById(pizzaId).then((pizzaData) => setPizzaData(pizzaData));
    }, []);

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
            </div>
            <div>
                Pizza Cost: ${pizzaData.size?.cost} + Toppings Cost:{" "}
                {pizzaData.pizzaToppings?.length * 0.5}
            </div>
        </article>
    );
};
