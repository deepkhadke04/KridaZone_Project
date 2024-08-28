import React, { useState, useEffect } from "react";
import SellerHeader from "./SellerHeader";
import 'bootstrap/dist/css/bootstrap.min.css';

function SellerProfile() {
    const [seller, setSeller] = useState({
        sellerName: '',
        email: '',
        contact: '',
        address: '',
        gstNo: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch seller data using seller ID from localStorage
        const sellerId = localStorage.getItem('sellerId');
        if (sellerId) {
            fetch(`https://localhost:7072/api/SellerManagement/GetSellerDetailsBySellerId/seller/details/${sellerId}`)
                .then(response => response.json())
                .then(data => {
                    setSeller({
                        sellerName: data.sellerName,
                        email: data.email,
                        contact: data.contact,
                        address: data.address,
                        gstNo: data.gstNo
                    });
                })
                .catch(error => console.error('Error fetching seller details:', error));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeller({ ...seller, [name]: value });
    };

    const validate = () => {
        const newErrors = {};

        if (!seller.sellerName) {
            newErrors.sellerName = "Seller name is required";
        }
        if (!seller.email || !/\S+@\S+\.\S+/.test(seller.email)) {
            newErrors.email = "Valid email is required";
        }
        if (!seller.contact || !/^\d{10}$/.test(seller.contact)) {
            newErrors.contact = "Valid contact number is required";
        }
        if (!seller.address) {
            newErrors.address = "Address is required";
        }
        if (!seller.gstNo) {
            newErrors.gstNo = "GST number is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const sellerId = localStorage.getItem('sellerId');
                const response = await fetch(`https://localhost:7072/api/SellerManagement/UpdateSeller/update/seller/profile/${sellerId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(seller)
                });

                if (!response.ok) {
                    alert('Failed to update seller');
                    throw new Error('Failed to update seller');
                }

                alert('Seller updated successfully');
            } catch (error) {
                console.error('Error updating seller:', error);
            }
        }
    };

    return (
        <div>
            <SellerHeader />
            <div className="container mt-5">
                <h2>Update Seller Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="sellerName" className="form-label">Seller Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.sellerName ? 'is-invalid' : ''}`}
                            id="sellerName"
                            name="sellerName"
                            value={seller.sellerName}
                            onChange={handleChange}
                        />
                        {errors.sellerName && <div className="invalid-feedback">{errors.sellerName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={seller.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact" className="form-label">Contact</label>
                        <input
                            type="text"
                            className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                            id="contact"
                            name="contact"
                            value={seller.contact}
                            onChange={handleChange}
                        />
                        {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            id="address"
                            name="address"
                            value={seller.address}
                            onChange={handleChange}
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gstNo" className="form-label">GST Number</label>
                        <input
                            type="text"
                            className={`form-control ${errors.gstNo ? 'is-invalid' : ''}`}
                            id="gstNo"
                            name="gstNo"
                            value={seller.gstNo}
                            onChange={handleChange}
                        />
                        {errors.gstNo && <div className="invalid-feedback">{errors.gstNo}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default SellerProfile;