import { useEffect, useState } from "react"
import { deleteEmployee, getAllEmployees } from "../../services/employeeService"
import { Link } from "react-router-dom"

export const EmployeeList = () => {
    const [allEmployees, setAllEmployees] = useState([])

    const getAndSetAllEmployees = () => {
        getAllEmployees().then(employeeArray => { setAllEmployees(employeeArray) })
    }
    useEffect(() => {
        getAndSetAllEmployees()
    }, [])

    return (
        <div>
            <h2>All Employees</h2>
            <div className="employees">{allEmployees.map((employee) => {
                return (
                    <section className="employee-info-box" key={employee.id}>
                    <Link to={`/employee/${employee.id}`} className="employee" >
                    <div>Name: {employee.name}</div>
                    <div>Role: {employee.role.name}</div>
                    <div>Email: {employee.email}</div>
                    <div>Address: {employee.address}</div>
                    <div>Phone: {employee.phone}</div>
                    </Link>
                    <button className="btn" onClick={() => {deleteEmployee(employee.id).then(getAndSetAllEmployees)}}>Delete</button>
                    </section>
                )
            })}</div>
        </div>
    )
}