import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import CustHeader from './CustHeader';
import ProductList from './Products';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CustomerHome() {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    navigate('/aboutus');
  }; 

  useEffect(() => {

    const userId = localStorage.getItem('userId');
    //alert(userId);
    const storedUsername = localStorage.getItem('userName');
    if (storedUsername) {
        setUsername(storedUsername);
    }

    if (userId) {
      // Fetch customer details from the backend
      fetch(`https://localhost:7072/api/CustomerManagement/GetCustomerDetails/customer/details/${userId}`)
        .then(response => response.json())
        .then(data => {
          // Save fetched customer details to localStorage
          localStorage.setItem('customerId', data.customerId);
          localStorage.setItem('customerFname', data.customerFname);
          localStorage.setItem('userId', data.userId);
          
          // Update the username state
          setUsername(data.customerFname);
        })
        .catch(error => console.error('Error fetching customer details:', error));
    } else {
      // Handle case when userId is not available in localStorage
      console.error('UserId not found in localStorage');
    }
  },[]);

  return (
    <div>
      <CustHeader />
      <Container className="my-5">
        <h1>Welcome, {username}</h1>
        <h2 className="text-center mb-4">Featured Products</h2>
        <ProductList />
      </Container>

      <Container fluid className="bg-dark text-white py-5">
        <Container>
          <Row>
            <Col md={8}>
              <h2><i className='bi bi-google'></i><i className='bi bi-instagram'></i><i className='bi bi-facebook'></i></h2>
              <p style={{ color: "white" }}>Stay updated with the latest news and exclusive offers.</p>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <Button variant="outline-light" size="lg" block onClick={handleAboutUsClick} >About Us</Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default CustomerHome;