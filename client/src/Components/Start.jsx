import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Start.css'; // Add custom CSS for styling

const Start = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3000/verify')
        .then(result => {
            if (result.data.Status) {
                if (result.data.role === "admin") {
                    navigate('/dashboard');
                } else {
                    navigate('/employee_detail/' + result.data.id);
                }
            }
        }).catch(err => console.log(err));
    }, [navigate]);

    return (
        <div className="start-container">
            <div className="login-card">
                <h2 className="login-title">Login As</h2>
                <div className="button-container">
                    <button
                        type="button"
                        className="btn login-btn employee-btn"
                        onClick={() => { navigate('/employee_login') }}
                    >
                        Employee
                    </button>
                    <button
                        type="button"
                        className="btn login-btn admin-btn"
                        onClick={() => { navigate('/adminlogin') }}
                    >
                        Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Start;
