import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/style.css';

function SellerRegister() {
    const init = {   
        SellerName: "",
        Email: "",
        Contact: "",
        Address: "",
        GSTNO: "",
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

    const [formData, dispatch] = useReducer(reducer, init);
    const [errors, setErrors] = useState({});
    const [passwordType, setPasswordType] = useState('password');
    const navigate = useNavigate();

    const togglePassword = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "SellerName":
                if (!value) error = "Seller name is required";
                else if (value.length < 2) error = "Seller name must be at least 2 characters";
                else if(!/^[A-Z][a-zA-Z ]{2,}$/.test(value)) error = "First letter should be capital";
                break;
            case "Email":
                if (!value) error = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) error = "Email address is invalid";
                break;
            case "Contact":
                if (!value) error = "Contact is required";
                else if (!/^\d{10}$/.test(value)) error = "Contact must be exactly 10 digits";
                break;
            case "Address":
                if (!value) error = "Address is required";
                else if (value.length < 7) error = "Enter your full address";
                break;
            case "GSTNO":
                if (!value) error = "GST number is required";
                else if (!/^\d{15}$/.test(value)) error = "GST number must be exactly 15 digits";
                break;
            case "UserName":
                if (!value) error = "Username is required";
                else if (value.length < 2) error = "Username must be at least 2 characters";
                break;
            case "Password":
                if (!value) {
                    error = "Password is required";
                } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
                    error = "Password must be atleast 8 characters long and contain at least one capital letter, one small letter, and '@'and one number";
                }
                break;
            case "ConfirmPassword":
                if (!value) error = "Confirm password is required";
                else if (value !== formData.Password) error = "Passwords do not match";
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        return error === "";
    };

    const validateForm = () => {
        const fieldsToValidate = ["SellerName", "Email", "Contact", "Address", "GSTNO", "UserName", "Password", "ConfirmPassword"];
        const allValid = fieldsToValidate.every(field => validateField(field, formData[field]));
        return allValid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'update', fld: name, val: value });
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log("Form Data:", formData);

        const dataToSend = {
            SellerName: formData.SellerName,
            Email: formData.Email,
            Contact: formData.Contact,
            Address: formData.Address,
            GSTNO: formData.GSTNO,
            user: {
                UserName: formData.UserName,
                Password: formData.Password,
                roleId: 2,
                ActiveStatus: 1
            }
        };

        //alert(JSON.stringify(dataToSend));

        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };
        fetch('https://localhost:7072/api/SellerManagement/SaveSeller', reqdata)
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
                alert("Registration failed: username or email or contact or GST number already exsists!");
                console.error('Error:', error);
            });
    };

    return (
        <div id="sell" className="d-flex align-items-center justify-content-center vh-200">
            <div className="card shadow p-4 w-50 mt-4 mb-4">
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-4">Seller Registration</h2>

                    <div className="form-group mb-3">
                        <label htmlFor="SellerName">Seller Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="SellerName"
                            name="SellerName" 
                            value={formData.SellerName}
                            onChange={handleInputChange}
                        />
                        {errors.SellerName && <div className='text-danger'>{errors.SellerName}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="Email">Email</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="Email"
                            name="Email" 
                            value={formData.Email}
                            onChange={handleInputChange}
                        />
                        {errors.Email && <div className='text-danger'>{errors.Email}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="Contact">Contact</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="Contact"
                            name="Contact" 
                            value={formData.Contact}
                            onChange={handleInputChange}
                        />
                        {errors.Contact && <div className='text-danger'>{errors.Contact}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="Address">Address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="Address"
                            name="Address" 
                            value={formData.Address}
                            onChange={handleInputChange}
                        />
                        {errors.Address && <div className='text-danger'>{errors.Address}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="GSTNO">GST Number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="GSTNO"
                            name="GSTNO" 
                            value={formData.GSTNO}
                            onChange={handleInputChange}
                        />
                        {errors.GSTNO && <div className='text-danger'>{errors.GSTNO}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="UserName">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="UserName"
                            name="UserName"
                            value={formData.UserName}
                            onChange={handleInputChange}
                        />
                        {errors.UserName && <div className='text-danger'>{errors.UserName}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="Password">Password</label>
                        <input 
                            type={passwordType} 
                            className="form-control" 
                            id="Password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleInputChange}
                        />
                        {errors.Password && <div className='text-danger'>{errors.Password}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input 
                            type={passwordType} 
                            className="form-control" 
                            id="ConfirmPassword"
                            name="ConfirmPassword"
                            value={formData.ConfirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.ConfirmPassword && <div className='text-danger'>{errors.ConfirmPassword}</div>}
                    </div>

                    <div className="form-check mb-3">
                        <input 
                            type='checkbox' 
                            className="form-check-input"
                            id="showPasswordCheckbox"
                            checked={passwordType !== 'password'} 
                            onChange={togglePassword} 
                        />
                        <label className='form-check-label' htmlFor="showPasswordCheckbox">Show Password</label>
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    );
}

export default SellerRegister;