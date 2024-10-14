import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
function CartInfo(props) {

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
                <div className="cart col-6"
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
                                <div className="col-2">
                                    <img style={{ width: "80px", height: "80px" }} src={item.chiTietSanPham.hinhAnh.path} alt="anh san pham" />
                                </div>
                                <div className="col-2">
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
                            </div>
                        )
                    })}





                    <hr />

                </div>

                <div className="invoiceInfomation col-5"
                    style={{ height: "800px", backgroundColor: "var(	--bs-success-bg-subtle)", marginLeft: "50px" }}
                >
                    <h3>Payment</h3>
                    <hr />
                    <div className="row">
                        <label className="col-6" style={{ fontSize: "18px", fontWeight: "bold" }}>-ID Hoá đơn: </label>
                        <label className="col-6" style={{ fontSize: "18px", fontWeight: "bold" }}>-Mã Hoá đơn: </label>
                    </div>
                    <br />
                    <div className="row">
                        <label className="col-7" style={{ fontSize: "18px", fontWeight: "bold" }}>-Nhân Viên Tạo : hi</label>
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            -Ngày Tạo :

                        </label>

                    </div>
                    <br />
                    <div className="row">
                        <label className="col-7" style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            -Khách Hàng :
                        </label>
                        <button className="col-4 btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddCustomer"
                        >Thông Tin Khách Hàng</button>
                    </div>


                    <hr />

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
                    <br />
                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Tiền Khách Trả : </label>
                        <input />
                        <span>hh</span>
                    </div>
                    <br />
                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Tiền Thừa : </label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>111d</label>
                    </div>
                    <br />

                    <label htmlFor="note" style={{ fontSize: "18px", fontWeight: "bold" }}>Ghi Chú</label>
                    <br />
                    <textarea id="note"
                        style={{ width: "400px", height: "80px" }}

                        readOnly>

                    </textarea>
                    <br />
                    <br />


                </div>


            </div>

        </>
    )
}
export default CartInfo;