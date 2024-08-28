import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SellerHeader from "./SellerHeader";

function AddProducts() {
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [price, setPrice] = useState('');
    const [image1, setImage1] = useState(null);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [errors, setErrors] = useState({});

    // Fetch all brands when component mounts
    useEffect(() => {
        fetch('http://localhost:8080/brands/getallbrands')
            .then(response => response.json())
            .then(data => setBrands(data))
            .catch(error => console.error('Error fetching brands:', error));
    }, []);

    // Fetch products when a brand is selected
    useEffect(() => {
        if (selectedBrand) {
            fetch(`http://localhost:8080/products/getbybrand/${selectedBrand}`)
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
                    setSelectedProduct(''); // Reset the selected product when brand changes
                })
                .catch(error => console.error('Error fetching products:', error));
        } else {
            setProducts([]);
        }
    }, [selectedBrand]);

    const validate = () => {
        const newErrors = {};

        if (!selectedBrand) newErrors.selectedBrand = 'Brand selection is required';
        if (!selectedProduct) newErrors.selectedProduct = 'Product selection is required';
        if (!price || isNaN(price) || parseFloat(price) <= 0) newErrors.price = 'Price is required and should be a positive number';
        if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) newErrors.quantity = 'Quantity is required and should be a positive integer';
        if (!description) newErrors.description = 'Description is required';
        if (!image1) newErrors.image1 = 'Image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (field) => (e) => {
        if (!e.target.value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
            }));
        } else {
            setErrors((prevErrors) => {
                const { [field]: removedError, ...rest } = prevErrors;
                return rest;
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const sellerId = localStorage.getItem('sellerId');
                if (!sellerId) throw new Error('Seller ID not found in local storage');

                const productResponse = await fetch('http://localhost:8080/sellerproduct/savesellerproduct', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        seller_id: sellerId,
                        product_id: selectedProduct,
                        brand_id: selectedBrand,
                        price,
                        description,
                        quantity,
                        image1: '' // Initially no image URL is set in the request body
                    })
                });

                if (!productResponse.ok) throw new Error('Failed to save the seller product');
                
                const productData = await productResponse.json();
                const sellerProductId = productData.seller_product_id;

                // Upload images only if they are selected
                if (image1) await uploadImage(image1, sellerProductId, 'image1');

                alert('Product added successfully');
                setSelectedBrand('');
                setSelectedProduct('');
                setPrice('');
                setImage1(null);
                setDescription('');
                setQuantity('');
                setErrors({});

            } catch (error) {
                alert('An error occurred while adding the product');
                console.error('Error adding product:', error);
            }
        }
    };

    const uploadImage = async (file, sellerProductId, imageField) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('imageField', imageField);

        const response = await fetch(`http://localhost:8080/sellerproduct/upload/image/${sellerProductId}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            alert('Image upload failed');
            throw new Error('Image upload failed');
        }
    };

    return (
        <div>
            <SellerHeader />
            <div className="container mt-5 mb-5">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="brandSelect">Brands</label>
                                <select
                                    className="form-control"
                                    id="brandSelect"
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    onBlur={handleBlur('selectedBrand')}
                                >
                                    <option value="">Select a brand</option>
                                    {brands.map(brand => (
                                        <option key={brand.brand_id} value={brand.brand_id}>
                                            {brand.brand_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.selectedBrand && <div className="text-danger">{errors.selectedBrand}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="productSelect">Products</label>
                                <select
                                    className="form-control"
                                    id="productSelect"
                                    value={selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                    onBlur={handleBlur('selectedProduct')}
                                    disabled={!selectedBrand} // Disable the product dropdown if no brand is selected
                                >
                                    <option value="">Select a product</option>
                                    {products.map(product => (
                                        <option key={product.product_id} value={product.product_id}>
                                            {product.product_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.selectedProduct && <div className="text-danger">{errors.selectedProduct}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    onBlur={handleBlur('price')}
                                />
                                {errors.price && <div className="text-danger">{errors.price}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    onBlur={handleBlur('quantity')}
                                />
                                {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="image1">Image 1</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image1"
                                    onChange={(e) => setImage1(e.target.files[0])}
                                    onBlur={handleBlur('image1')}
                                />
                                {errors.image1 && <div className="text-danger">{errors.image1}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    onBlur={handleBlur('description')}
                                />
                                {errors.description && <div className="text-danger">{errors.description}</div>}
                            </div>

                            <button type="submit" className="btn btn-primary mt-4">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProducts;
