import { useContext, useEffect, useState } from "react";
import { GContext2 } from "./Context2";
import SearchBar from "./SearchBar";

function ListProduct() {
    const [listProduct, setListProduct] = useState([]);
    const { setCurrentScreen, showProductDetail } = useContext(GContext2);

    useEffect(() => {
        const apiGetListProduct = async () => {
            const res = await fetch("http://localhost:5050/api/v1/chi-tiet-san-pham/show-all");
            const data = await res.json();
            setListProduct(data);
        };
        apiGetListProduct();
    }, []);

    return (
        <>
            <SearchBar />
            <br /><br /><br /><br />
            {listProduct.length === 0 ? (
                <h3>Giỏ hàng trống</h3>
            ) : (
                <div className="container">
                    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {listProduct.map((product) => (
                            <div
                                key={product.id}
                                className="col"
                                style={{
                                    flex: '1 1 calc(20% - 20px)',
                                    maxWidth: '20%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    textAlign: 'center',
                                    backgroundColor: '#fff',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => showProductDetail(product.id)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <img
                                    src={product.pathHinhAnh}
                                    alt={product.tenSanPham}
                                    style={{ width: '100%', height: 'auto', borderRadius: '5px', marginBottom: '10px' }}
                                />
                                <h5>{product.tenSanPham}</h5>
                                <p><strong>Brand:</strong> {product.thuongHieu}</p>
                                <p><strong>Style:</strong> {product.kieuDang}</p>
                                <p><strong>Size:</strong> {product.kichCo}</p>
                                <p><strong>Color:</strong> {product.mauSac}</p>
                                <p><strong>Price:</strong> {product.giaBan.toLocaleString()} VND</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default ListProduct;
