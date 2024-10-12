import React, { useState } from 'react';

function ProductDetail({ product }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: ''
    });

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

    const handleSubmitOrder = () => {
        console.log("Order submitted with details:", form);
        // Here, you can implement the logic to submit the order
        setIsModalOpen(false); // Close the modal after submission
    };

    return (
        <>
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', maxWidth: '500px', margin: 'auto' }}>
                <img src={product.pathHinhAnh} alt={product.tenSanPham} style={{ width: '100%', borderRadius: '5px' }} />
                <h2>{product.tenSanPham}</h2>
                <p><strong>Brand:</strong> {product.thuongHieu}</p>
                <p><strong>Style:</strong> {product.kieuDang}</p>
                <p><strong>Size:</strong> {product.kichCo}</p>
                <p><strong>Color:</strong> {product.mauSac}</p>
                <p><strong>Material:</strong> {product.chatLieu}</p>
                <p><strong>Origin:</strong> {product.nsx}</p>
                <p><strong>Price:</strong> {product.giaBan.toLocaleString()} VND</p>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button className="btn btn-primary" onClick={handleBuyNow}>Mua Ngay</button>
                    <button className="btn btn-secondary">Thêm vào giỏ hàng</button>
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
