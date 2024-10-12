import { useContext } from "react";
import logo from "../image/logo.png"
import { GContext } from "./Context";


function Navbar({ setStateForm }) {
    const { currentUI, setCurrentUI } = useContext(GContext);


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="http://localhost:3000">
                        <img
                            src={logo}
                            style={{ width: "130px" }}
                        ></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li
                                className="nav-item"
                            >
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                    onClick={() => {
                                        setCurrentUI("SellAtCounter");
                                    }}
                                >Bán Hàng Tại Quầy</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link"
                                    href="#"
                                    onClick={() => {
                                        setCurrentUI("ProductManage");
                                    }}
                                >Quản lí Sản Phẩm</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                    href="#"
                                    onClick={() => {
                                        setCurrentUI("ProductDetails");
                                    }}
                                >Quản lí CTSP</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản lí thuộc tính
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                setCurrentUI("StyleManagement");
                                            }}
                                        >Kiểu Dáng</a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                setCurrentUI("ColorManagement");
                                            }}>Màu Sắc</a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                setCurrentUI("MerterialManagement");
                                            }}>Chất Liệu</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                setCurrentUI("SizeManagement");
                                            }}
                                        >Kích Cỡ</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                setCurrentUI("ManuefacturerManagement");
                                            }}
                                        >Nhà Sản Xuất</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                                setCurrentUI("BrandManagement");
                                            }}
                                        >Thương Hiệu</a>
                                    </li>
                                    {/* <li><hr className="dropdown-divider"></hr></li>
                                    <li>
                                        <a className="dropdown-item"
                                         href="#"
                                         onClick={() => {
                                            setCurrentUI("ProductManagement");
                                        }}
                                         >Product Manage</a>
                                         </li> */}
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link"
                                    href="#"
                                    onClick={() => {
                                        setCurrentUI("InvoiceManagement");
                                    }}
                                >Quản Lí Hóa Đơn</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Quản Lí Doanh Thu</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                        <div className="row" style={{ width: "400px" }}>
                            <img src="" alt="avatar" style={{ width: "50px" }} />
                            <span style={{ width: "200px" }}>Hi {JSON.parse(localStorage.getItem("user")).fullName}</span>
                            <button
                                style={{ width: "100px" }}
                                className="btn btn-dark"
                                onClick={()=>{
                                    setStateForm("logout");
                                    localStorage.clear("token");
                                    localStorage.clear("user");
                                }}
                            >Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;