export const getCustomers = () => {
    return fetch(`http://localhost:8088/customers`).then((res) => 
    res.json()
)
}