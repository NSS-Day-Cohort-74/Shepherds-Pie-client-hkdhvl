export const getEmployeeById = (id) => {
    return fetch(`http://localhost:8088/employees?id=${id}`).then(res => res.json())
}

export const updateEmployee = (employee) => {
    return fetch(`http://localhost:8088/employees/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
}

export const getAvailableEmployees = async () => {
    const response = await fetch("http://localhost:8088/employees?isAvailable=true")
    const data = await response.json()
    return data
}

export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/employees?_expand=role`).then(res => res.json())
}