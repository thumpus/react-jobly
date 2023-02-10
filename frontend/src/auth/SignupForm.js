import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert"
import { Button } from "reactstrap";

function SignupForm({ signup }) {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            history("/companies");
        } else {
            setFormErrors(result.errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({...data, [name]: value }));
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label>Password</label>
                <input 
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label>First Name</label>
                <input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label>Last Name</label>
                <input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label>Email</label>
                <input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }   

                <Button
                    type="submit"
                    onSubmit={handleSubmit}
                >
                  Submit
                </Button>
            </form>
        </div>
    )
}

export default SignupForm;