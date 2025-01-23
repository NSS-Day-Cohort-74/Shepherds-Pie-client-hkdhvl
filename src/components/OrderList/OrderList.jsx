import { useEffect, useState } from "react"
import { getOrders } from "../../services/orderService"
import { getCustomers } from "../../services/customerService"
import "./OrderList.css"
import { Link } from "react-router-dom"


export const OrderList = () => {
    const [allOrders, setAllOrders] = useState([])
    const [allCustomers, setAllCustomers] = useState([])
    const [ordersWithCustomers, setOrdersWithCustomers] = useState([])
    const [selectedActiveId, setSelectedActiveId] = useState("all")
    const [filteredOrders, setFilteredOrders] = useState([])

    const fetchAllCustomerOrders = async () => {
        try {
            const ordersArray = await getOrders()
            setAllOrders(ordersArray)

            const customersArray = await getCustomers()
            setAllCustomers(customersArray)

            const customerOrders = ordersArray.map(order => {
                const customer = customersArray.find(
                    customer => customer.id === order.customerId
                )
                return {
                    ...order,
                    customerName: customer ? customer.name : "Unknown"
                }
            })
            setOrdersWithCustomers(customerOrders)
            
        } catch (error) {
            console.error("Error fetching", error)
        }
        
    }

    const handleActiveChange = (event) => {
        setSelectedActiveId(event.target.value)
    }

    useEffect(() => {
        fetchAllCustomerOrders()
    }, [])

    useEffect(() => {
        if (selectedActiveId === "all") {
            setFilteredOrders(ordersWithCustomers)
        } else {
            const isActive = selectedActiveId === "active"
            const inActive = ordersWithCustomers.filter(order => {
                return isActive ? order.status === "Pending" : order.status === "Delivered"
            })
            setFilteredOrders(inActive)
        }
    }, [selectedActiveId, ordersWithCustomers])

    return (
        <div className="orders-container">
            <h2>All Orders</h2>
         
            <div className="active-dropdown">
                <select
                id="active"
                value={selectedActiveId}
                onChange={handleActiveChange}
                >
                    <option value="all">All Orders</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            <div className="orders-grid">

                {filteredOrders.map((order) => (
                    <div key={order.id} className="order-ticket">
                        <Link to={`/order/${order.id}`} key={order.id}>
                        <p>Order_Id: {order.id}</p>
                        </Link>
                        <p>Customer: {order.customerName}</p>
                        <p>Status: {order.status}</p>
                        <p>Date: {order.dateTime}</p>
                    </div>
                    
                ))}
            </div>
        </div>
    )
}