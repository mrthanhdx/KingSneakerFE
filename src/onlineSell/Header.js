import React, { useContext, useState } from 'react';
import logo from "../image/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GContext2 } from './Context2';

function Header({ setStateForm }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const {setCurrentScreen} = useContext(GContext2);
    const navItems = [
        { id: 1, text: "Trang Chủ", icon: "fa-solid fa-house",screen:"sellOnlineHomePage" },
        { id: 2, text: "Giỏ Hàng", icon: "fa-solid fa-cart-shopping",screen:"cartInfoPage"},
        { id: 3, text: "Tài Khoản", icon: "fa-solid fa-circle-user",screen:"accountPage" }
    ];

    const userName = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : "";

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img
                        src={logo}
                        style={{ width: "100px", marginLeft: "20px" }}
                    />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" style={{ height: "87.66px", display: "flex", alignItems: "center" }}>
                        {navItems.map((item, index) => (
                            <li
                                key={item.id}
                                className="nav-item"
                                style={{
                                    marginLeft: "30px",
                                    marginRight: "30px",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    backgroundColor: hoveredIndex === index ? "#f0f0f0" : "transparent",
                                    transition: "background-color 0.3s ease",
                                    cursor: "pointer"
                                }}
                                onClick={()=>{
                                    setCurrentScreen(item.screen);
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={item.icon} /> {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center ms-auto" style={{ gap: "15px", marginRight: "20px" }}>
                        {localStorage.getItem("token") ? (
                            <>
                                <span>Hello, {userName}!</span>
                                <button onClick={() => {
                                    localStorage.clear();
                                    setStateForm("login");
                                }} className="btn btn-dark">Logout</button>
                            </>
                        ) : (
                            <button onClick={() => {
                                setStateForm("login");
                            }} className="btn btn-primary">Login</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
