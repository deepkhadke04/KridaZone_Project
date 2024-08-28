import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from './AdminHeader';
import ProductList from './Products';
import AdminProducts from './AdminProducts';

function AdminPage() 
{

    const username = localStorage.getItem('userName');

    return(<div>
        <AdminHeader/>
    <div className="container mt-5 mb-5">
        <h1>Welcome, {username}</h1>
        <AdminProducts/>
    </div>
        
        

    </div>)
}

export default AdminPage;