import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import CustHeader from './CustHeader';

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [customerId, setCustomerId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCustomerId = localStorage.getItem('customerId');
    if (storedCustomerId) {
      setCustomerId(parseInt(storedCustomerId, 10));
    }
  }, []);

  useEffect(() => {
    if (customerId) {
      fetchCartItems();
    }
  }, [customerId]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`https://localhost:7072/api/Cart/getbycustomer/${customerId}`);
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const checkDuplicateProduct = (productId) => {
    return cartItems.some(item => item.sellerProduct?.product?.product_id === productId);
  };

  const handleQuantityChange = (cartId, value) => {
    const newQuantity = parseInt(value, 10);
    if (newQuantity > 0) {
      setQuantity(prev => ({ ...prev, [cartId]: newQuantity }));
    } else {
      alert("Quantity cannot be 0 or negative.");
    }
  };

  const updateCartQuantity = async (cartId) => {
    try {
      await fetch(`https://localhost:7072/api/Cart/updatequantity/${cartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quantity[cartId]),
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await fetch(`https://localhost:7072/api/Cart/${cartId}`, { method: 'DELETE' });
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await fetch(`https://localhost:7072/api/Cart/deletebycustomer/${customerId}`, { method: 'DELETE' });
      fetchCartItems();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!customerId) {
      setError('Customer ID not found in local storage.');
      setMessage('');
      return;
    }

    try {
      const response = await fetch('https://localhost:7072/api/Order/PlaceOrder/PlaceOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: parseInt(customerId, 10) }),
      });

      if (!response.ok) {
        throw new Error('Cart is Empty');
      }

      const data = await response.json();
      setMessage(data.Message);
      alert("Order Placed Successfully");
      window.location.reload();
      fetchCartItems(); // Refresh cart items after placing order
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div>
      <CustHeader />
      <Container className='mt-2'>
        <h1>My Cart</h1>
        <Row>
          {cartItems.map(item => (
            <Col key={item.cartId} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                {item.sellerProduct?.image1 && (
                  <Card.Img
                    variant="top"
                    src={`data:image/jpeg;base64,${item.sellerProduct.image1}`}
                    alt="Product Image"
                    style={{ maxWidth: '100%', height: '300px' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{item.sellerProduct?.product?.product_name || 'Product Name'}</Card.Title>
                  <Card.Text>Price: Rs.{item.sellerProduct?.price * item.quantity}</Card.Text>
                  <Form.Group controlId={`quantity-${item.cartId}`}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      value={quantity[item.cartId] || item.quantity}
                      onChange={(e) => handleQuantityChange(item.cartId, e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" className='mt-2' onClick={() => updateCartQuantity(item.cartId)}>Update Quantity</Button>
                  <Button variant="danger" onClick={() => removeFromCart(item.cartId)} className="ms-2 mt-2">Remove</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Button variant="danger" onClick={clearCart} className="mt-3 mb-3">Clear Cart</Button>
        <Button variant="primary" onClick={handlePlaceOrder} className="mt-3 mb-3 ms-3">Place Order</Button>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
    </div>
  );
};

export default CartComponent;