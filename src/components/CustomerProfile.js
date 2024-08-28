import React, { useState, useEffect } from "react";
import CustHeader from "./CustHeader";
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerProfile() {
    const [customer, setCustomer] = useState({
        customerFname: '',
        customerLname: '',
        address: '',
        contact: '',
        email: '',
        adhaar: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Fetch customer data using customerId
    useEffect(() => {
        const fetchCustomerData = async () => {
            //const userId = localStorage.getItem('userId');
            const CustomerId = localStorage.getItem('customerId');

            if (CustomerId) {
                try {
                    const response = await fetch(`https://localhost:7072/api/CustomerManagement/GetCustomerById/customer/details/${CustomerId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch customer data');
                    }
                    const data = await response.json();
                    setCustomer({
                        customerFname: data.customerFname,
                        customerLname: data.customerLname,
                        address: data.address,
                        contact: data.contact,
                        email: data.email,
                        adhaar: data.adhaar
                    });
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchCustomerData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const validate = () => {
        const newErrors = {};

        if (!customer.customerFname) {
            newErrors.customerFname = "First name is required";
        }
        if (!customer.customerLname) {
            newErrors.customerLname = "Last name is required";
        }
        if (!customer.address) {
            newErrors.address = "Address is required";
        }
        if (!customer.contact || !/^\d{10}$/.test(customer.contact)) {
            newErrors.contact = "Valid contact number is required";
        }
        if (!customer.email || !/\S+@\S+\.\S+/.test(customer.email)) {
            newErrors.email = "Valid email is required";
        }
        if (!customer.adhaar || !/^\d{12}$/.test(customer.adhaar)) {
            newErrors.adhaar = "Valid Aadhaar number is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            //const userId = localStorage.getItem('userId');
            const CustomerId = localStorage.getItem('customerId');
            if (CustomerId) {
                try {
                    const response = await fetch(`https://localhost:7072/api/CustomerManagement/UpdateCustomer/update/profile/${CustomerId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(customer)
                    });

                    if (!response.ok) {
                        alert('Failed to update customer');
                        throw new Error('Failed to update customer');
                    }

                    alert('Customer updated successfully');
                } catch (error) {
                    console.error('Error updating customer:', error);
                }
            }
        }
    };

    if (isLoading) {
        return <div className="container mt-5">Loading...</div>;
    }

    return (
        <div>
            <CustHeader />
            <div className="container mt-5">
                <h2>Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="customerFname" className="form-label">First Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.customerFname ? 'is-invalid' : ''}`}
                            id="customerFname"
                            name="customerFname"
                            value={customer.customerFname}
                            onChange={handleChange}
                        />
                        {errors.customerFname && <div className="invalid-feedback">{errors.customerFname}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerLname" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.customerLname ? 'is-invalid' : ''}`}
                            id="customerLname"
                            name="customerLname"
                            value={customer.customerLname}
                            onChange={handleChange}
                        />
                        {errors.customerLname && <div className="invalid-feedback">{errors.customerLname}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            id="address"
                            name="address"
                            value={customer.address}
                            onChange={handleChange}
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact" className="form-label">Contact</label>
                        <input
                            type="text"
                            className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                            id="contact"
                            name="contact"
                            value={customer.contact}
                            onChange={handleChange}
                        />
                        {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={customer.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="adhaar" className="form-label">Aadhaar</label>
                        <input
                            type="text"
                            className={`form-control ${errors.adhaar ? 'is-invalid' : ''}`}
                            id="adhaar"
                            name="adhaar"
                            value={customer.adhaar}
                            onChange={handleChange}
                        />
                        {errors.adhaar && <div className="invalid-feedback">{errors.adhaar}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary mb-5">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default CustomerProfile;