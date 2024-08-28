//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginPage from './components/LoginPage';
import CustomerRegistration from './components/CustomerRegistration';
import CustomerHome from './components/CustomerHome';
import SellerRegister from './components/SellerRegistration';
import SellerHome from './components/SellerHome';
import HomePage from './components/HomePage';
import AddProducts from './components/AddProducts';
import AdminPage from './components/AdminPage';
import AdminProfile from './components/AdminProfile';
import CustomerProfile from './components/CustomerProfile';
import SellerProfile from './components/SellerProfile';
import CartComponent from './components/CartComponent';
import AboutUs from './components/AboutUs';
import OrderList from './components/OrderList';


function App() {
  return (
    
    <div className=''>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/registercustomer" element={<CustomerRegistration/>} />
          <Route path="/registerseller" element={<SellerRegister/>} />
          <Route path="/customerhome" element={<CustomerHome/>} />
          <Route path="/sellerhome" element={<SellerHome/>} />
          <Route path="/adminhome" element={<AdminPage/>}/>
          <Route path="/addproducts" element={<AddProducts/>}/>
          <Route path="/adminprofile" element={<AdminProfile/>}/>
          <Route path="/custprofile" element={<CustomerProfile/>}/>
          <Route path="/sellerprofile" element={<SellerProfile/>}/>
          <Route path="/cart" element={<CartComponent/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/orders" element={<OrderList/>}/>
        </Routes>
    </div>
  );
}

export default App;
