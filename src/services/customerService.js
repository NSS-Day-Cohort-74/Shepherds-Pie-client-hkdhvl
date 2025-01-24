export const createNewCustomer = (customerId) => {
    return fetch("http://localhost:8088/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customerId)
    })
}

export const getCustomerByEmail = (email) => {
    return fetch(`http://localhost:8088/customers?email=${email}`).then((res) => res.json())

}
export const getCustomers = () => {
    return fetch(`http://localhost:8088/customers`).then((res) => 
    res.json()
)
}