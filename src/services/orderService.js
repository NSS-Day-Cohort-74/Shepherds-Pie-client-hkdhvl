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
