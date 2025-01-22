export const getOrderById = async (orderId) => {
    const response = await fetch(`http://localhost:8088/orders/${orderId}?_embed=pizzas&_expand=customer`)
    const data = await response.json()
    return data
}

export const getPizzaById = async (pizzaId) => {
    const response = await fetch(`http://localhost:8088/pizzas/${pizzaId}?_expand=sauce&_expand=cheese&_expand=size&_embed=pizzaToppings`) 
    const data = await response.json()
    return data
}

export const getOrders = () => {
    return fetch(`http://localhost:8088/orders`).then((res) => res.json())
}

export const getToppingByPizzaId = async (pizzaId) => {
    const response = await fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}&_expand=topping`)
    const data = await response.json()
    return data
}