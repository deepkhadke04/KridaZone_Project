import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../components/CSS/style.css';


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setError] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState('password');

    const togglePassword = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    };

    const validate = () => {
        let tempErr = {};
        if (!username) tempErr.username = "Username is required";
        if (!password) tempErr.password = "Password is required";
        setError(tempErr);
        return Object.keys(tempErr).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});
        setSuccessMessage('');

        if (validate()) {
            console.log('Username:', username);
            console.log('Password:', password);

            try {
                const response = await fetch('https://localhost:7072/api/UserManagement/CheckLogin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userName: username, password: password }),
                });

                const data = await response.json();
                console.log('Response data:', data);

                if (response.ok) {
                    setSuccessMessage('Login successful! Redirecting...');
                    localStorage.setItem("LoggedUser",JSON.stringify(data));
                    localStorage.setItem('userName', data.userName);
                    localStorage.setItem('userId',data.userId);
                    console.log("data : ",JSON.stringify(data));
                    setTimeout(() => {
                        switch (data.roleId) {
                            case 1:
                                navigate('/adminhome');
                                break;
                            case 2:
                                navigate('/sellerhome');
                                break;
                            case 3:
                                navigate('/customerhome');
                                break;
                            default:
                                setError({ general: data.message || 'Login failed' });
                                break;
                        }
                    }, 2000);
                } else {
                    setError({ general: data.message || 'Login failed' });
                }
            } catch (error) {
                console.error('Error:', error);
                setError({ general: "Server not responding please try again later" });
            } finally {
                setUsername('');
                setPassword('');
            }
        }
    };

    return (
        <div id='login' className="d-flex align-items-center justify-content-center vh-100">
            <div className="card shadow p-4 w-25">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                            <input
                                type="text"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                placeholder="Enter your username"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                            <input
                                type={passwordType}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter your password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="input-group-text">
                                {passwordType === 'password' ? (
                                    <FaEye onClick={togglePassword} />
                                ) : (
                                    <FaEyeSlash onClick={togglePassword} />
                                )}
                            </span>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                    </div>

                    {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                {/*<div className="text-center mt-3">
                    <Link to="/forgot-password" className="text-muted">Forgot Password?</Link>
                </div>*/}
                <div className="text-center mt-3">
                    <Link to="/registercustomer" className="text-muted">Doesn't have a account? Create New</Link>
                </div>
                <div className="text-center mt-3">
                    <Link to="/registerseller" className="text-muted">Want to sell products? Click here</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;