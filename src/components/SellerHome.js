import { useState, useEffect } from "react";
import SellerHeader from "./SellerHeader";
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/style.css';
import SellerProducts from "./SellerProducts";
import ErrorBoundary from "./ErrorBoundry";
import { useNavigate } from "react-router-dom";


function SellerHome() {
   // const [sellerDetails, setSellerDetails] = useState(null);
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

  const handleAboutUsClick = () => {
    navigate('/aboutus');
  };    

    useEffect(() => {
        // Retrieve the userId from localStorage
        const userId = localStorage.getItem('userId');
        //alert(userId);
        const storedUsername = localStorage.getItem('userName');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        


        if (userId) {
            // Fetch seller details from the backend
            fetch(`https://localhost:7072/api/SellerManagement/GetSellerDetails/seller/details/${userId}`)
                .then(response => {
                  //alert("hi")
                    console.log('Response:', response);
                    return response.json();
                })
                .then(data => {
                    //alert("hello")
                    console.log('Parsed JSON:', data);
                    //setSellerDetails(data);
                    localStorage.setItem('sellerDetails', JSON.stringify(data));
                    localStorage.setItem("sellerId",data.sellerId);
                    //alert(`Seller Details: ${JSON.stringify(data)}`);
                })
                .catch(error => console.error('Error fetching seller details:', error));
        }
    }, []);

    return (
        <div>
            <SellerHeader />
            <Container className="my-5">
                <h1>Welcome, {username}</h1>
                <h2 className="text-center mb-4">My Products</h2>
                
             
                    <SellerProducts/>
                
                

            </Container>

            <Container fluid className="bg-dark text-white py-5">
                <Container>
                    <Row>
                        <Col md={8}>
                            <h2><i className='bi bi-google'></i><i className='bi bi-instagram'></i><i className='bi bi-facebook'></i></h2>
                            <p style={{color:"white"}}>Stay updated with the latest news and exclusive offers.</p>
                        </Col>
                        <Col md={4} className="d-flex align-items-center">
                            <Button variant="outline-light" size="lg" block onClick={handleAboutUsClick}>About Us</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
}

export default SellerHome;