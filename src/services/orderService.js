export const getOrderById = async (orderId) => {
    const response = await fetch(`http://localhost:8088/orders/${orderId}`)
    const data = await response.json()
    return data
}