export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/employees?email=${email}`).then((res) =>
      res.json()
    )
  }

  export const createUser = (employee) => {
    return fetch("http://localhost:8088/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json())
  }