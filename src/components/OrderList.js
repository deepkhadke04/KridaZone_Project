import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustHeader from './CustHeader';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [productNames, setProductNames] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const customerId = localStorage.getItem('customerId');
      if (!customerId) {
        setError('Customer ID not found in local storage.');
        return;
      }

      try {
        const response = await fetch(`https://localhost:7072/api/Order/GetOrdersByCustomerId/GetOrdersByCustomerId/${customerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders.');
        }
        const data = await response.json();
        setOrders(data);

        // Fetch product names for each order detail
        data.forEach(order => {
          order.orderDetails.forEach(async detail => {
            const productId = detail.sellerProduct.productId;
            if (!productNames[productId]) {
              const productName = await fetchProductName(productId);
              setProductNames(prev => ({ ...prev, [productId]: productName }));
            }
          });
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders();
  }, []);

  const fetchProductName = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/products/getproductbyid/${productId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product name. Status: ${response.status}`);
      }
      const data = await response.json();
      return data.product_name;
    } catch (err) {
      setError(err.message);
      return 'Unknown Product';
    }
  };

  const handleMakePayment = async () => {
    if (orders.length === 0) {
      alert('No orders placed');
      return;
    }

    try {
      // Simulate a successful payment process
      alert('Payment Successful!');

      // Delete all orders after payment success
      const deletePromises = orders.map(order =>
        fetch(`https://localhost:7072/api/Order/DeleteOrder/DeleteOrder/${order.orderId}`, {
          method: 'DELETE',
        })
      );

      await Promise.all(deletePromises);
      setOrders([]); // Clear the orders after deletion
    } catch (err) {
      alert('Failed to delete orders after payment.');
    }
  };

  return (
    <div>
      <CustHeader />
      <Container className='mt-2'>
        <h1>My Orders</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          {orders.length > 0 ? (
            orders.map(order => (
              <Col key={order.orderId} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Text>
                      <strong>Amount:</strong> Rs.{order.amount}
                      <br />
                      <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                      <br />
                    </Card.Text>
                    <strong>Order Details:</strong>
                    <ul>
                      {order.orderDetails.map(detail => (
                        <li key={detail.sellerProductId}>
                          <strong>Product Name:</strong> {productNames[detail.sellerProduct.productId] || 'Fetching...'}
                          <br />
                          <strong>Price:</strong> Rs.{detail.amount}
                          <br />
                          <strong>Quantity:</strong> {detail.quantity}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Alert variant="info">No orders placed.</Alert>
          )}
        </Row>
        {orders.length > 0 && (
          <Button onClick={handleMakePayment} variant="success">
            Make Payment
          </Button>
        )}
      </Container>
    </div>
  );
};

export default OrderList;
