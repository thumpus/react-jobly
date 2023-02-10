import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import UserContext from "./auth/UserContext";
import Alert from "./auth/Alert";
import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
    const { currentUser } = useContext(UserContext);
    const history = useNavigate();

    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await JoblyApi.editUser(currentUser.username, formData);
        console.log("HEY!!!")
        console.log(result.status)
        if (!result.status) {
            window.location.reload();
        } else {
            alert("Profile edit error.")
            setFormErrors(result.errors);
            
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({...data, [name]: value}))
    }

    return (
        <div>
            <h1>{currentUser.firstName} {currentUser.lastName}</h1>
            <h2>Edit Profile Info</h2>
            <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <label>Last Name </label>
            <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
            <label>Email</label>
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
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

export default Profile;