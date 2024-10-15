import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toastError, toastSuccess } from '../components/toastMessage/ToastMessage';
function ProductDetail({ product }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: ''
    });

    const [quantityBuy, setQuantityBuy] = useState(1);

    // Retrieve the JSON string from localStorage
    const userJson = localStorage.getItem("user");

    // Convert the JSON string to a JavaScript object
    const userObject = JSON.parse(userJson);

    const handleBuyNow = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };
    console.log(quantityBuy);

    const handleQuantityBuyChange = (e) => {
        const value = e.target.value;

        if (value === "" || isNaN(value) || Number(value) <= 0) {
            // If value is empty, not a number, or less than or equal to zero, reset to 1
            setQuantityBuy(1);
        } else {
            setQuantityBuy(Number(value));
        }
    };
    const handleSubmitOrder = () => {
        console.log("Order submitted with details:", form);
        // Here, you can implement the logic to submit the order
        setIsModalOpen(false); // Close the modal after submission
    };


    const addProductToCart = (idProduct) => {

        console.log("hello");
        

        const formDataObj = new FormData();

        formDataObj.append("idCustomer", userObject.id);


        formDataObj.append("idCtsp", idProduct);

        formDataObj.append("quantity", quantityBuy);
        console.log(132);
        

        const callApi = async () => {
            try {
                const res = await fetch("http://localhost:5050/user/api/v1/cart/new-cart-item", {
                    method: "POST",
                    body: formDataObj,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log(res);
                
                const data = res.text();
                toastSuccess("Success","Product added to cart");

            } catch (error) {
                toastError("failed to add Product to cart, check error in console.log");
            }
        }
        callApi();
    }
    return (
        <>
            <div id="toast-root"></div>

            <div className='row' style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', width: '100%', margin: "30px" }}>
                <img className='col-6' src={product.pathHinhAnh} alt={product.tenSanPham} style={{ width: '500px', height: "500px", borderRadius: '5px' }} />
                <div className='col-5'>
                    <h2>{product.tenSanPham}</h2>
                    <p><strong>Brand:</strong> {product.thuongHieu}</p>
                    <p><strong>Style:</strong> {product.kieuDang}</p>
                    <p><strong>Size:</strong> {product.kichCo}</p>
                    <p><strong>Color:</strong> {product.mauSac}</p>
                    <p><strong>Material:</strong> {product.chatLieu}</p>
                    <p><strong>Origin:</strong> {product.nsx}</p>
                    <p><strong>Remain Quantity:</strong> {product.soLuong}</p>

                    <p><strong>Price:</strong> {product.giaBan.toLocaleString()} VND</p>
                    <p><strong>Quantity Buy:</strong>
                        <input value={quantityBuy}
                            min={1}
                            onChange={(e) => {
                                handleQuantityBuyChange(e);
                            }}
                            type="number" /></p>
                    <p><strong>Total Pay: {(product.giaBan * quantityBuy).toLocaleString()} VND</strong></p>


                    <div style={{ display: 'flex', gap: '10px', marginTop: '50px' }}>
                        <button style={{ marginLeft: "200px" }} className="btn btn-primary" onClick={handleBuyNow}><FontAwesomeIcon icon="fa-solid fa-dollar-sign" /> Mua Ngay</button>
                        <button
                            style={{ marginLeft: "20px" }}
                            className="btn btn-secondary"
                            onClick={() => {
                                addProductToCart(product.id);
                            }}
                        >
                            <FontAwesomeIcon
                                icon="fa-solid fa-cart-shopping"
                            />
                            Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: '#fff', padding: '20px', borderRadius: '5px', width: '400px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)'
                    }}>
                        <h3>Order Details</h3>
                        <form>
                            <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '10px' }}>
                                <label htmlFor="address">Address</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd', resize: 'none' }}
                                    rows="3"
                                    required
                                />
                            </div>
                            <button type="button" className="btn btn-success" style={{ marginRight: '10px' }} onClick={handleSubmitOrder}>
                                Submit Order
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductDetail;
