export const createNewOrder = async (orderId) => {
     const response = await fetch("http://localhost:8088/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderId)
    })
    const data = await response.json()
    return data 
}

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

// delete pizzas
export const deletePizzaById = async (pizzaId) => {
    const pizzaDeleteResponse = await fetch(`http://localhost:8088/pizzas/${pizzaId}`, {
        method: "DELETE"
    })

}

export const deleteOrderById = async (orderId) => {
    const deleteOrder = await fetch(`http://localhost:8088/orders/${orderId}`, {
        method: "DELETE"
    })
}

//  Delivery Assignment Fetches

export const newOrderEmployee = async (submissionObject) => {
    const response = await fetch(`http://localhost:8088/orderEmployees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = await response.json()

    return data
}

export const updateEmployeeAvailable = async (employeeId, submissionObject) => {
    const response = await fetch(`http://localhost:8088/employees/${employeeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = await response.json()
    return data
}

export const updateOrderStatus = async (orderId, submissionObject) => {
    const response = await fetch(`http://localhost:8088/orders/${orderId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionObject)
    })
    const data = await response.json()
    return data
}