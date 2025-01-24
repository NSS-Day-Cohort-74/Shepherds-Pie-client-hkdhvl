import { useState } from "react"
import "./NewOrder.css"
import { createNewCustomer, getCustomerByEmail } from "../../services/customerService"
import { createNewOrder } from "../../services/orderService"
import { useNavigate } from "react-router-dom"

export const NewOrder = () => {
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerAddress, setCustomerAddress] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [isDelivery, setIsDelivery] = useState(false)

    const navigate = useNavigate()

    const handleSaveOrder = (event) => {
        event.preventDefault()

        const newCustomerObj = {
            name: customerName,
            email: customerEmail,
            address: customerAddress,
            phone: customerPhone
        }

        if (customerName && customerEmail && customerAddress && customerPhone) {
            createNewCustomer(newCustomerObj)
                .then(() => getCustomerByEmail(newCustomerObj.email))
                .then((data) => {
                    const newOrderObj = {
                        dateTime: new Date(),
                        status: "Pending",
                        tip: 0,
                        isDelivery: isDelivery,
                        customerId: data[0].id
                    }
                    return createNewOrder(newOrderObj)
                })
                .then((newOrderData) => {
                    console.log(newOrderData)

                    navigate(`/order/${newOrderData.id}`)
                })
        } else {
            window.alert("Please complete form")
        }
    }


    return (
        <form className="new-customer-form">
            <h2>Customer Info</h2>
            <fieldset className="customer-info">
                <div >
                    <label>Full Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                        required />
                </div>
            </fieldset>
            <fieldset className="customer-info">
                <div >
                    <label>Email: </label>
                    <input
                        type="text"
                        name="email"
                        value={customerEmail}
                        onChange={(event) => setCustomerEmail(event.target.value)}
                        required />
                </div>
            </fieldset>
            <fieldset className="customer-info">
                <div >
                    <label>Address: </label>
                    <input
                        type="text"
                        name="address"
                        value={customerAddress}
                        onChange={(event) => setCustomerAddress(event.target.value)}
                        required />
                </div>
            </fieldset>
            <fieldset className="customer-info">
                <div >
                    <label>Phone Number: </label>
                    <input
                        type="text"
                        name="phone"
                        value={customerPhone}
                        onChange={(event) => setCustomerPhone(event.target.value)}
                        required />
                </div>
            </fieldset>
            <fieldset className="customer-info">
                <div>
                    <label>
                        <input type="radio" name="orderType" checked={!isDelivery} onChange={() => setIsDelivery(false)} />Dine In
                    </label>
                    <label>
                        <input type="radio" name="orderType" checked={isDelivery} onChange={() => setIsDelivery(true)} />Delivery
                    </label>
                </div>
            </fieldset>
            <button type="submit" onClick={handleSaveOrder} className="btn">Save Order</button>
        </form>
    )
}