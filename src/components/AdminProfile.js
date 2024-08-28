import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from './AdminHeader';

function AdminProfile() {
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [newBrandName, setNewBrandName] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newProductBrand, setNewProductBrand] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch the username from local storage
        const storedUsername = localStorage.getItem('userName');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        // Fetch brands, products, and users when the component loads
        fetch('http://localhost:8080/brands/getallbrands')
            .then(response => response.json())
            .then(data => setBrands(data))
            .catch(error => console.error('Error fetching brands:', error));

        fetch('http://localhost:8080/products/getallproducts')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));

        fetch('https://localhost:7072/api/UserManagement/GetUsers')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleAddBrand = () => {
        if (newBrandName.trim() === '') {
            alert('Brand name cannot be empty.');
            return;
        }

        fetch('http://localhost:8080/brands/savebrand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                brand_name: newBrandName,
                active_status: 1,
                brand_status: 1 // Default active status
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Brand added successfully');
                setNewBrandName('');
                return fetch('http://localhost:8080/brands/getallbrands')
                    .then(response => response.json())
                    .then(data => setBrands(data));
            } else {
                alert('Failed to add brand');
            }
        })
        .catch(error => console.error('Error adding brand:', error));
    };

    const handleAddProduct = () => {
        if (newProductName.trim() === '' || newProductBrand === '') {
            alert('Product name and brand must be selected.');
            return;
        }

        fetch('http://localhost:8080/products/saveproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_name: newProductName,
                brand_id: newProductBrand,
                active_status: 1 // Default active status
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Product added successfully');
                setNewProductName('');
                setNewProductBrand('');
                return fetch('http://localhost:8080/products/getallproducts')
                    .then(response => response.json())
                    .then(data => setProducts(data));
            } else {
                alert('Failed to add product');
            }
        })
        .catch(error => console.error('Error adding product:', error));
    };

    const handleDeactivateUser = (userId) => {
        fetch(`https://localhost:7072/api/UserManagement/DeactivateUser/deactivate/${userId}`, {
            method: 'PUT'
        })
        .then(response => {
            if (response.ok) {
                alert('User deactivated successfully');
                return fetch('https://localhost:7072/api/UserManagement/GetUsers')
                    .then(response => response.json())
                    .then(data => setUsers(data));
            } else {
                alert('Failed to deactivate user');
            }
        })
        .catch(error => console.error('Error deactivating user:', error));
    };

    const handleActivateUser = (userId) => {
        fetch(`https://localhost:7072/api/UserManagement/ActivateUser/activate/${userId}`, {
            method: 'PUT'
        })
        .then(response => {
            if (response.ok) {
                alert('User activated successfully');
                return fetch('https://localhost:7072/api/UserManagement/GetUsers')
                    .then(response => response.json())
                    .then(data => setUsers(data));
            } else {
                alert('Failed to activate user');
            }
        })
        .catch(error => console.error('Error activating user:', error));
    };

    return (
        <div>
            <AdminHeader />
            <div className="container mt-5 mb-5">
                <h1>Welcome {username}</h1>
                
                <div className="card mt-3">
                    <div className="card-body">
                        <h2>Add Brand</h2>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Brand Name"
                                value={newBrandName}
                                onChange={(e) => setNewBrandName(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={handleAddBrand}>Add Brand</button>
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-body">
                        <h2>Add Product</h2>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Product Name"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                            />
                            <select
                                className="form-control"
                                value={newProductBrand}
                                onChange={(e) => setNewProductBrand(e.target.value)}
                            >
                                <option value="">Select Brand</option>
                                {brands.map(brand => (
                                    <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                                ))}
                            </select>
                            <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-body">
                        <h2>Deactivate User</h2>
                        <ul className="list-group">
                            {users.map(user => (
                                <li key={user.userId} className="list-group-item d-flex justify-content-between align-items-center">
                                    {user.userName} - {user.activeStatus ? 'Active' : 'Inactive'}
                                    <div>
                                        {user.activeStatus ? (
                                            <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeactivateUser(user.userId)}>Deactivate</button>
                                        ) : (
                                            <button className="btn btn-success btn-sm" onClick={() => handleActivateUser(user.userId)}>Activate</button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminProfile;