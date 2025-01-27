import { useEffect, useState } from "react"
import "./EmployeeDetails.css"
import { useNavigate, useParams } from "react-router-dom"
import { getEmployeeById, updateEmployee } from "../../services/employeeService"

export const EmployeeDetails = () => {
    const [employee, setEmployee] = useState([])

    const { employeeId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getEmployeeById(employeeId).then(data => {
            const employeeObj = data[0]
            setEmployee(employeeObj)
        })
    }, [employeeId])

    const handleInputChange = (event) => {
        const employeeCopy = {...employee}
        employeeCopy[event.target.name] = event.target.value
        setEmployee(employeeCopy)
    }

    const handleSaveChanges = (event) => {
        event.preventDefault()
        const editedEmployee = {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            address: employee.address,
            phone: employee.phone,
            isAvailable: employee.isAvailable,
            roleId: employee.roleId
        }

        updateEmployee(editedEmployee).then(() => {
            navigate(`/employeeList`)
        })
    }

    return (
        <form className="employee-form">
            <h2>Update {employee.name}'s Details</h2>
            <fieldset className="employee-info">
                <div>
                    <label>Email: </label>
                    <input 
                        type="text"
                        name="email"
                        value={employee.email ? employee.email : ''}
                        onChange={handleInputChange}
                        required />
                </div>
            </fieldset>
            <fieldset className="employee-info">
                <div>
                    <label>Address: </label>
                    <input 
                        type="text"
                        name="address"
                        value={employee.address ? employee.address : ''}
                        onChange={handleInputChange}
                        required />
                </div>
            </fieldset>
            <fieldset className="employee-info">
                <div>
                    <label>Phone: </label>
                    <input 
                        type="text"
                        name="phone"
                        value={employee.phone ? employee.phone : ''}
                        onChange={handleInputChange}
                        required />
                </div>
            </fieldset>
            <button type="submit" className="btn" onClick={handleSaveChanges} >Save Changes</button>
        </form>
    )
}