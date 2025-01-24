import { useEffect, useState } from "react";
import "./Modal.css";
import {
    getAvailableEmployees,
    getEmployeeById,
} from "../../services/employeeService";
import { useParams } from "react-router-dom";
import {
    newOrderEmployee,
    updateEmployeeAvailable,
    updateOrderStatus,
} from "../../services/orderService";

export const AssignEmployee = ({
    isOpen,
    onClose,
    children,
    currentOrderId,
    orderData,
    resetPizzas,
    setDriver,
}) => {
    const [employeeArray, setEmployeeArray] = useState([]);
    const [assignedEmployeeId, setAssignedEmployeeId] = useState(0);
    const [assignedEmployeeObject, setAssignedEmployeeObject] = useState({});

    useEffect(() => {
        getAvailableEmployees().then((data) => setEmployeeArray(data));
    }, []);

    useEffect(() => {
        getEmployeeById(assignedEmployeeId).then((data) =>
            setAssignedEmployeeObject(data[0])
        );
    }, [assignedEmployeeId]);

    const handleAssignment = () => {
        if (assignedEmployeeObject) {
            const orderEmployeeObject = {
                orderId: parseInt(currentOrderId),
                employeeId: parseInt(assignedEmployeeId),
            };
            // POST NEW orderEmployees Object
            newOrderEmployee(orderEmployeeObject);

            //PUT to selected employee, changing isAvailble to false
            const employeeObjectCopy = { ...assignedEmployeeObject };
            employeeObjectCopy.isAvailable = false;
            employeeObjectCopy.roleId = 3;
            updateEmployeeAvailable(assignedEmployeeId, employeeObjectCopy);

            //PUT to current order, changing status to "Out for Delivery"
            const orderDataCopy = {
                id: orderData.id,
                dateTime: orderData.dateTime,
                status: "Out for Delivery",
                customerId: orderData.customerId,
                tip: orderData.tip,
                isDelivery: orderData.isDelivery,
            };
            updateOrderStatus(currentOrderId, orderDataCopy);

            setDriver(assignedEmployeeObject.name);

            resetPizzas();
        } else {
            window.alert("!!choose a driver");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay-delivery">
            <div className="modal-content">
                <select
                    onChange={(event) =>
                        setAssignedEmployeeId(parseInt(event.target.value))
                    }
                >
                    <option>Choose a Driver</option>
                    {employeeArray.map((employeeObject) => {
                        return (
                            <option
                                key={`employee-key-${employeeObject.id}`}
                                value={employeeObject.id}
                            >
                                {employeeObject.name}
                            </option>
                        );
                    })}
                </select>
                <button onClick={handleAssignment}>Assign</button>
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};
