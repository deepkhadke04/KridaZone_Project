import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/cr.css';

function CustomerRegistration() {
    const init = {
        CustomerFname: "",
        CustomerLname: "",
        Address: "",
        Contact: "",
        Email: "",
        Adhaar: "",
        UserName: "",
        Password: "",
        ConfirmPassword: ""
    };

    const initErrors = {
        CustomerFname: "",
        CustomerLname: "",
        Address: "",
        Contact: "",
        Email: "",
        Adhaar: "",
        UserName: "",
        Password: "",
        ConfirmPassword: ""
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val };
            case 'init':
                return init;
            default:
                return state;
        }
    };

    const errorReducer = (state, action) => {
        switch (action.type) {
            case 'setError':
                return { ...state, [action.field]: action.error };
            case 'reset':
                return initErrors;
            default:
                return state;
        }
    };

    const [formData, dispatch] = useReducer(reducer, init);
    const [formErrors, dispatchError] = useReducer(errorReducer, initErrors);
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState('password');
    const [passwordTypeConfirm, setPasswordTypeConfirm] = useState('password');

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "CustomerFname":
                if (!value) error = "First Name is required";
                else if (value.length < 2) error = "First name must be at least 2 characters";
                else if(!/^[A-Z]{1}[a-z]{1,}$/.test(value)) error = "First letter should be capital";
                break;
            case "CustomerLname":
                if (!value) error = "Last Name is required";
                else if (value.length < 2) error = "Last name must be at least 2 characters";
                else if(!/^[A-Z]{1}[a-z]{1,}$/.test(value)) error = "First letter should be capital";
                break;
            case "Address":
                if (!value) error = "Address is required";
                else if (value.length < 7) error = "Enter Your Full Address";
                break;
            case "Contact":
                if (!value) error = "Contact is required";
                else if (!/^\d{10}$/.test(value)) error = "Contact must be exactly 10 digits";
                break;
            case "Email":
                if (!value) error = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) error = "Email address is invalid";
                break;
            case "Adhaar":
                if (!value) error = "Adhaar number is required";
                else if (!(value.length === 12)) error = "Please enter a valid Adhaar number";
                break;
            case "UserName":
                if (!value) error = "Username is required";
                else if (value.length < 2) error = "Username must be at least 2 characters long";
                break;
            case "Password":
                if (!value) {
                    error = "Password is required";
                } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
                    error = "Password must be atleast 8 characters long and contain at least one capital letter, one small letter, and '@' and one number";
                }
                break;
            case "ConfirmPassword":
                if (!value) error = "Confirm Password is required";
                else if (value !== formData.Password) error = "Passwords do not match";
                break;
            default:
                break;
        }

        dispatchError({ type: 'setError', field: name, error });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let hasErrors = false;
        Object.keys(formData).forEach(field => {
            validateField(field, formData[field]);
            if (formErrors[field]) {
                hasErrors = true;
            }
        });
    
        // Check if any form field is empty or has errors
        for (const field in formData) {
            if (!formData[field] || formErrors[field]) {
                hasErrors = true;
                break;
            }
        }
    
        if (hasErrors) {
            alert("Please fill all fields correctly before submitting");
            return;
        }
    
        // Construct dataToSend only if there are no errors
        const dataToSend = {
            CustomerFname: formData.CustomerFname,
            CustomerLname: formData.CustomerLname,
            Address: formData.Address,
            Contact: formData.Contact,
            Email: formData.Email,
            Adhaar: formData.Adhaar,
            user: {
                UserName: formData.UserName,
                Password: formData.Password,
                roleId: 3,
                ActiveStatus: 1
            }
        };
    
        //alert(JSON.stringify(dataToSend));
    
        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };
    
        fetch('https://localhost:7072/api/CustomerManagement/SaveCustomer', reqdata)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(JSON.stringify(error.error));
                    });
                }
                return response.json();
            })
            .then(data => {
                alert("Registration Successful");
                console.log('Success:', data);
                navigate("/login");
            })
            .catch(error => {
                alert("Registration failed: username or email or contact or aadhar number already exists!")
                //alert("Registration failed:" + error.message);
                console.error('Error:', error);
            });
    };

    const togglePassword = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
        setPasswordTypeConfirm(passwordType === 'password' ? 'text' : 'password');
    };

    return (
        <div id='cust' className="d-flex align-items-center justify-content-center vh-200">
            <div className="card shadow p-4 w-50 mt-4 mb-4">
                <form className="container" onSubmit={handleSubmit}>
                    <h2 className="mt-4">Register Customer</h2>
                    <div className="mb-3">
                        <label htmlFor="CustomerFname" className="form-label">First Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="CustomerFname" 
                            name="CustomerFname"
                            value={formData.CustomerFname}
                            onChange={(e) => {
                                dispatch({ type: 'update', fld: 'CustomerFname', val: e.target.value });
                                validateField('CustomerFname', e.target.value);
                            }}
                        />
                        {formErrors.CustomerFname && <small className="text-danger">{formErrors.CustomerFname}</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="CustomerLname" className="form-label">Last Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="CustomerLname" 
                            name="CustomerLname"
                            value={formData.CustomerLname}
                            onChange={(e) => {
                                dispatch({ type: 'update', fld: 'CustomerLname', val: e.target.value });
                                validateField('CustomerLname', e.target.value);
                            }}
                        />
                        {formErrors.CustomerLname && <small className="text-danger">{formErrors.CustomerLname}</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Address" className="form-label">Address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="Address" 
                            name="Address"
                            value={formData.Address}
                            onChange={(e) => {
                                dispatch({ type: 'update', fld: 'Address', val: e.target.value });
                                validateField('Address', e.target.value);
                            }}
                        />
                        {formErrors.Address && <small className="text-danger">{formErrors.Address}</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Contact" className="form-label">Contact</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="Contact" 
                            name="Contact"
                            value={formData.Contact}
                            onChange={(e) => {
                                dispatch({ type: 'update', fld: 'Contact', val: e.target.value });
                                validateField('Contact', e.target.value);
                            }}
                        />
                        {formErrors.Contact && <small className="text-danger">{formErrors.Contact}</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="Email" 
                            name="Email"
                            value={formData.Email}
                            onChange={(e) => {
                                dispatch({ type: 'update', fld: 'Email', val: e.target.value });
                                validateField('Email', e.target.value);
                            }}
                        />
                        {formErrors.Email && <small className="text-danger">{formErrors.Email}</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Adhaar" className="form-label">Aadhar Number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="Adhaar" 
                            name="Adhaar"
                            value={formData.Adhaar}
                            onChange={(e) => {
                                dispatch({ type: 'update', fld: 'Adhaar', val: e.target.value });
                                validateField('Adhaar', e.target.value);
                            }}
                        />
                        {formErrors.Adhaar && <small className="text-danger">{formErrors.Adhaar}</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="UserName" className="form-label">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="UserName" 
                            name="UserName"
                            value={formData.UserName}
                            onChange={(e) => {
                                dispatch({ type: 'update', fld: 'UserName', val: e.target.value });
                                validateField('UserName', e.target.value);
                            }}
                        />
                        {formErrors.UserName && <small className="text-danger">{formErrors.UserName}</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input 
                            type={passwordType} 
                            className="form-control" 
                            id="Password" 
                            name="Password"
                            value={formData.Password}
                            onChange={(e) => {
                                dispatch({ type: 'update', fld: 'Password', val: e.target.value });
                                validateField('Password', e.target.value);
                            }}
                        />
                        {formErrors.Password && <small className="text-danger">{formErrors.Password}</small>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
                        <input 
                            type={passwordTypeConfirm} 
                            className="form-control" 
                            id="ConfirmPassword" 
                            name="ConfirmPassword"
                            value={formData.ConfirmPassword}
                            onChange={(e) => {
                                dispatch({ type: 'update', fld: 'ConfirmPassword', val: e.target.value });
                                validateField('ConfirmPassword', e.target.value);
                            }}
                        />
                        {formErrors.ConfirmPassword && <small className="text-danger">{formErrors.ConfirmPassword}</small>}
                    </div>

                    <div className="mb-3 form-check">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="showPassword" 
                            checked={passwordType === 'text'}
                            onChange={togglePassword}
                        />
                        <label className="form-check-label" htmlFor="showPassword">Show Password</label>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Register</button>
                </form>
            </div>
        </div>
    );
}

export default CustomerRegistration;