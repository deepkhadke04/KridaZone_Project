import React from 'react';
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import home1 from './images/home1.jpg'
import home2 from './images/home2.jpg'
import home3 from './images/hpme3.jpg'
import { useNavigate } from 'react-router-dom';

import './CSS/style.css';
import ProductList from './Products';

function HomePage() {

    const navigate = useNavigate();

    const handleAboutUsClick = () => {
      navigate('/aboutus');
    }; 
    
    return (
        <div>
            {/* Hero Carousel */}
            <Header/>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        //src="https://via.placeholder.com/1200x400?text=Sportify+Latest+Gear"
                        src={home3}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3 style={{color:"black"}}>Latest Sports Gear</h3>
                        <p style={{color:"black"}}><b>Gear up for the new season with the latest equipment.</b></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        //src="https://via.placeholder.com/1200x400?text=Exclusive+Deals"
                        src={home2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3 style={{color:"black"}}>Exclusive Deals</h3>
                        <p style={{color:"black"}}><b>Don't miss out on our special offers and discounts.</b></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={home1}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3 style={{color:"black"}}>New Arrivals</h3>
                        <p style={{color:"black"}}><b>Discover the latest trends in sportswear.</b></p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* Featured Products */}
            <Container className="my-5">
                <h2 className="text-center mb-4">Featured Products</h2>
                <ProductList/>
            </Container>

            {/* Promo Section */}
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

export default HomePage;