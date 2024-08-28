import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

 

  useEffect(() => {
    // Fetch all brands from the API
    fetch('http://localhost:8080/brands/getallbrands')
      .then(response => response.json())
      .then(data => setBrands(data))
      .catch(error => console.error('Error fetching brands:', error));
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      // Fetch products by selected brand

      fetch(`http://localhost:8080/brands/getbrand/${selectedBrand}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error fetching products by brand:', error));



      fetch(`http://localhost:8080/products/getbybrand/${selectedBrand}`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products by brand:', error));
    } else {
      // Fetch all seller products if no brand is selected
      fetch('http://localhost:8080/sellerproduct/getallsellerproducts')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching all products:', error));
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedProduct) {
      // Fetch seller products by selected product ID
      fetch(`http://localhost:8080/sellerproduct/getbysellerproduct/${selectedProduct}`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching seller products by product ID:', error));
    }
  }, [selectedProduct]);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedProduct(''); // Reset product selection when brand changes
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const addToCart = async (productId, price) => {
    const customerId = localStorage.getItem('customerId'); // Get customer ID from local storage
    if (!customerId) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      const response = await fetch('https://localhost:7072/api/Cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId,
          sellerProductId: productId,
          quantity: 1, 
          amount: price * 1 // Default quantity
        }),
      });

      if (response.ok) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error adding product to cart.');
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col sm={6}>
          <Form.Group controlId="brandSelect">
            <Form.Label>Select Brand</Form.Label>
            <Form.Control 
              as="select" 
              value={selectedBrand} 
              onChange={handleBrandChange}
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand.brand_id} value={brand.brand_id}>
                  {brand.brand_name}
                </option>
                
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group controlId="productSelect">
            <Form.Label>Select Product</Form.Label>
            <Form.Control 
              as="select" 
              value={selectedProduct} 
              onChange={handleProductChange}
              //disabled={!selectedBrand} // Disable if no brand is selected
            >
              <option value="">All Products</option>
              {products.map(product => (
                <option key={product.product_id} value={product.product_id}>
                  {product.product_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {products.map(product => (
          <Col key={product.sellerProductId} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              {product.image1 && (
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${product.image1}`} 
                  alt="Product Image"
                  style={{ maxWidth: '100%', height: '300px' }} 
                />
              )}
              <Card.Body>
                <Card.Title>
                  {product.product?.name || product.product_name || 'Product Name'}
                </Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <Card.Text>
                  Price: Rs.{product.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminProducts;