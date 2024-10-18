import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toastWarning } from "../components/toastMessage/ToastMessage";
function CartInfo(props) {

    const [quantityUpdate, setQuantityUpdate] = useState({});
    const [selectedHdctId, setSelectedHdctId] = useState(null); // To track which hdct is being updated
    const [listHDCT, setListHDCT] = useState([]);
    const [listCartItem, setListCartItem] = useState([]);
    // Retrieve the JSON string from localStorage
    const userJson = localStorage.getItem("user");

    // Convert the JSON string to a JavaScript object
    const userObject = JSON.parse(userJson);


    useEffect(() => {
        if (userJson != null) {
            console.log(userObject);

            const getListCardItem = async () => {
                const res = await fetch(`http://localhost:5050/user/api/v1/cart/show-all/${userObject.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const data = await res.json();
                setListCartItem(data);
            }
            getListCardItem();

        }
    }, [])
    return (
        <>
            <div id="toast-root"></div>
            <div>
                <h1>
                    Your cart
                </h1>
                <button
                    style={{ width: "140px", height: "50px", border: "none", borderRadius: "10px", position: "absolute", left: "20px", top: "140px", backgroundColor: "var(--bs-info)" }}
                    onClick={() => {
                        props.setCurrentScreen("sellOnlineHomePage");
                    }}
                > <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Back</button>


                <FontAwesomeIcon icon="check-square" />
                Your <FontAwesomeIcon icon="coffee" /> is hot and ready!

            </div>

            <br />
            <div className="row"
                style={{ justifyContent: "center" }}
            >
                <div className="cart col-7"
                    style={{
                        height: "800px",
                        backgroundColor: "var(--bs-info-bg-subtle)",
                        marginRight: "30px",
                        overflowY: "auto",  // Add scroll when overflowing
                        padding: "20px"
                    }}
                >
                    <div className="row">
                        <h3 className="col-12">Cart</h3>
                    </div>
                    {listCartItem.map((item) => {
                        return (
                            <div key={item.id} style={{ width: "97%", height: "200px", marginLeft: "20px", marginTop: "60px" }} className="product-cart bg-light row"
                            >
                                <div className="col-1">
                                    <input
                                        type="checkbox"
                                        name={item.id}
                                        style={{ height: "50%", width: "50%", marginTop: "40px" }}
                                    />

                                </div>
                                <div className="col-2">
                                    <img style={{ width: "80px", height: "80px", marginTop: "50px" }} src={item.chiTietSanPham.hinhAnh.path} alt="anh san pham" />
                                </div>
                                <div className="col-1">
                                    <h5>{item.chiTietSanPham.sanPham.ten}</h5>
                                </div>
                                <div className="col-2">
                                    <span>Màu:{item.chiTietSanPham.mauSac.ten}</span>
                                    <br />
                                    <span>Size:{item.chiTietSanPham.kichCo.ten}</span>
                                    <br />
                                    <span>Style:{item.chiTietSanPham.kieuDang.ten}</span>
                                    <br />
                                    <span>NSX:{item.chiTietSanPham.nsx.ten}</span>
                                    <br />
                                    <span>{item.chiTietSanPham.chatLieu.ten}</span>
                                    <br />
                                    <span>TH:{item.chiTietSanPham.thuongHieu.ten}</span>

                                </div>

                                <div className="col-2">
                                    <h6>Đơn Giá</h6>
                                    <span>{item.price}Vnd</span>
                                    <br /><br /><br />
                                    <h6>Số Lượng</h6>
                                    <span>{item.quantity}</span>

                                </div>

                                <div className="col-2">
                                    <h6>Tổng Tiền</h6>
                                    <span>{item.price * item.quantity}vnd</span>
                                </div>


                                <div className="col-2">
                                    <br />
                                    <button
                                        className="btn btn-warning"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalUpdateQuantity"
                                        onClick={() => setSelectedHdctId(item.id)} // Set the selected hdct ID
                                    >
                                        Update số lượng
                                    </button>

                                    <br />

                                    {/* Modal update product quantity */}
                                    <div className="modal fade" id="modalUpdateQuantity" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ width: "100%" }}>
                                        <div className="modal-dialog" style={{ width: "100%" }}>
                                            <div className="modal-content" style={{ width: "400px" }}>
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Product Quantity</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <input
                                                        type="number"
                                                        value={quantityUpdate[selectedHdctId] || listHDCT.find(h => h.id === selectedHdctId)?.soLuong || 1}
                                                        // onChange={(e) => onProductQuantityUpdateChange(e, selectedHdctId)}
                                                    />
                                                    <br />
                                                    <br />
                                                    <button
                                                        className="btn btn-outline-warning"
                                                        onClick={() => {
                                                            // Handle update logic for the selected item
                                                            // updateProductQuantity(selectedHdctId, quantityUpdate[selectedHdctId] == undefined ? listHDCT.find(h => h.id === selectedHdctId)?.soLuong : quantityUpdate[selectedHdctId]);
                                                            // console.log("Updated quantity for ID:", selectedHdctId, "with value:", quantityUpdate[selectedHdctId] || listHDCT.find(h => h.id === selectedHdctId)?.soLuong || 1);
                                                        }}
                                                    >Update</button>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    <br />
                                    <button className="btn btn-danger"
                                        onClick={() => {
                                            let isConfirm = window.confirm("are you sure to delete this product from invoice !");
                                            if (isConfirm) {
                                                // deleteProductFromInvoice(hdct.chiTietSanPham.id, idInvoice);
                                            }
                                        }}
                                    >Xóa khỏi đơn hàng</button>
                                </div>


                            </div>
                        )
                    })}





                    <hr />

                </div>

                <div className="invoiceInfomation col-4"
                    style={{ height: "600px", backgroundColor: "var(	--bs-success-bg-subtle)", marginLeft: "50px" }}
                >
                    <h3>Payment</h3>


                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Tổng Tiền : </label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>100d</label>

                    </div>
                    <br />
                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Giảm giá voucher(nếu có) : </label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}></label>
                        <button
                            className="col-3 btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddVoucher"
                            onClick={() => {

                            }}

                        >Detail Voucher</button>
                    </div>


                    <hr />

                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Số Tiền Thanh toán : </label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>1000d </label>
                    </div>
                    <hr />

                    <br />

                    <div className="row">
                        <label className="col-4" htmlFor="note" style={{ fontSize: "18px", fontWeight: "bold" }}>Hình thức thanh toán</label>
                        <br />
                        <select
                            style={{ width: "250px" }}
                            className="form-select col-7"
                            name="hinhThucThanhToan"
                            defaultValue=""
                            onChange={(e) => {
                                if (e.target.value === "chuyenKhoan") {
                                    toastWarning("Maintenance", "Hệ thống thanh toán online đang bảo trì");
                                }
                            }}
                        >
                            <option value="">Thanh Toán Khi Nhận Hàng</option>
                            <option value="chuyenKhoan">Chuyển Khoản</option>
                        </select>
                    </div>

                    <br />
                    <br />
                    <button style={{ width: "180px", height: "60px" }} className="btn btn-primary">Thanh Toan</button>

                </div>


            </div>

        </>
    )
}
export default CartInfo;