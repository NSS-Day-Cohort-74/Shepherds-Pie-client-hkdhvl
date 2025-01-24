export const getSizes = () => {
    return fetch(`http://localhost:8088/sizes`).then((res) => 
    res.json()
)
}

export const getCheeses = () => {
    return fetch(`http://localhost:8088/cheeses`).then((res) => 
        res.json()
    )  
}

export const getSauces = () => {
    return fetch(`http://localhost:8088/sauces`).then((res) => 
        res.json()
    )  
}

export const getToppings = () => {
    return fetch(`http://localhost:8088/toppings`).then((res) => 
        res.json()
    )  
}
export const createNewPizza = async (pizzaData) => {
    return fetch(`http://localhost:8088/pizzas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pizzaData)
    }).then((res) => res.json())
}
export const createToppingsForPizza = async (toppingsData) => {
    return fetch(`http://localhost:8088/pizzaToppings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(toppingsData),
    }).then((res) => res.json())
}
