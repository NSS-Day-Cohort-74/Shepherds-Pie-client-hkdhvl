export const createNewOrder = (orderId) => {
    return fetch("http://localhost:8088/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderId)
    })
}

export const getOrderByCustomerId = (id) => {
    return fetch(`http://localhost:8088/orders?customerId=${id}`).then(res => res.json())
}