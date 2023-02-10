import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert"
import { Button } from "reactstrap";


function LoginForm({ login }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            navigate("/companies");
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
            <h1>Login</h1>
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

                {formErrors.length ? <Alert type="danger" messages={formErrors} />
                : null}
                
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

export default LoginForm;