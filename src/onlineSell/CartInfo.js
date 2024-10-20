import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toastError, toastSuccess, toastWarning } from "../components/toastMessage/ToastMessage";
import { Modal } from "bootstrap";
function CartInfo(props) {

    const [quantityUpdate, setQuantityUpdate] = useState({});
    const [selectedHdctId, setSelectedHdctId] = useState(null); // To track which hdct is being updated
    const [listHDCT, setListHDCT] = useState([]);
    const [listCartItem, setListCartItem] = useState([]);
    const [listCartItemSelected, setListCartItemSelected] = useState([]);
    // Retrieve the JSON string from localStorage
    const userJson = localStorage.getItem("user");

    // Convert the JSON string to a JavaScript object
    const userObject = JSON.parse(userJson);
    const [totalMoney, setTotalMoney] = useState(0);

console.log(listCartItemSelected);


console.log(listCartItemSelected);


    useEffect(() => {
        if (userJson != null) {
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
            // updateTotalMoney(listCartItemSelected);
        }


    }, [])
    const refreshApp = () => {
        if (userJson != null) {
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
        // updateTotalMoney(listCartItemSelected);

    }

    const onProductQuantityUpdateChange = (e, idHdct) => {
        setQuantityUpdate(prevQuantityUpdate => ({
            ...prevQuantityUpdate,
            [idHdct]: e.target.value
        }))
    }


    const updateProductQuantity = async (idCartItem, quantityUpdate) => {
        const dataUpdateObj = new FormData();
        dataUpdateObj.append("idCartItem", idCartItem);
        dataUpdateObj.append("quantityUpdate", quantityUpdate);

        try {
            const response = await fetch("http://localhost:5050/user/api/v1/cart/update-quantity", {
                method: "PUT",
                body: dataUpdateObj,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const contentType = response.headers.get("content-type");
            let data;

            if (contentType.includes("application/json")) {
                data = await response.json(); // Parse as JSON
            } else if (contentType.includes("text/plain")) {
                data = await response.text(); // Parse as text
            } else {
                data = await response.blob(); // For other types like binary data
            }

            if (response.status == 400) {
                toastError("Thất bại", data);
            } else {
                toastSuccess("Thành Công", data);

                // Update quantity in listCartItem
                const updatedCartItems = listCartItem.map((item) => {
                    if (item.id === idCartItem) {
                        return { ...item, quantity: quantityUpdate };
                    }
                    return item;
                });
                setListCartItem(updatedCartItems);

                // Update the selected cart items only after updating the listCartItem
                const updatedSelectedItems = listCartItemSelected.map((item) => {
                    if (item.id === idCartItem) {
                        return { ...item, quantity: Number(quantityUpdate) };

                    }
                    return item;
                });
                refreshApp();
                setListCartItemSelected(updatedSelectedItems);
            }

            // Close modal after success
            const modalElement = document.getElementById('modalUpdateQuantity');
            if (modalElement) {
                const modalInstance = Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                    setQuantityUpdate({ selectedHdctId: 1 });
                }
            }

        } catch (error) {
            toastError("Thất bại", error);
        }
    };



    const handleCheckboxChange = (item) => {
        setListCartItemSelected((prev) => {
            let updatedList;
            if (prev.some((selectedItem) => selectedItem.id === item.id)) {
                // Item is already selected, so remove it
                updatedList = prev.filter((selectedItem) => selectedItem.id !== item.id);
            } else {
                // Item is not selected, so add it
                updatedList = [...prev, item];
            }
            // updateTotalMoney(updatedList);
            return updatedList;
        });
    };


    useEffect(() => {
        let ttm = 0;
        listCartItemSelected.forEach((e) => {
            ttm += e.price * e.quantity;
        });
        setTotalMoney(ttm);
    }, [listCartItemSelected]);

    const deleteCartItem = (idCartItem) => {
        try {
            const deleteHdct = async () => {
                const response = await fetch(`http://localhost:5050/user/api/v1/cart/delete-cart-item/${idCartItem}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.text();
    
                if (response.status === 200) {
                    toastSuccess("Thành công", data);
    
                    // Remove the deleted item from listCartItem
                    setListCartItem((prevList) => prevList.filter(item => item.id !== idCartItem));
    
                    // Also remove the deleted item from listCartItemSelected
                    setListCartItemSelected((prevSelectedList) =>
                        prevSelectedList.filter(item => item.id !== idCartItem)
                    );
                } else {
                    toastError("Thất bại", data);
                }
                refreshApp();
            };
            deleteHdct();
        } catch (err) {
            console.error(err);
        }
    };
    

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
                                        onChange={() => {
                                            handleCheckboxChange(item);

                                        }}
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
                                                        value={quantityUpdate[selectedHdctId] || listCartItem.find(h => h.id === selectedHdctId)?.quantity || 1}
                                                        onChange={(e) => onProductQuantityUpdateChange(e, selectedHdctId)}
                                                    />
                                                    <br />
                                                    <br />
                                                    <button
                                                        className="btn btn-outline-warning"
                                                        onClick={() => {
                                                            // Handle update logic for the selected item
                                                            // updateProductQuantity(selectedHdctId, quantityUpdate[selectedHdctId] == undefined ? listHDCT.find(h => h.id === selectedHdctId)?.soLuong : quantityUpdate[selectedHdctId]);
                                                            // console.log("Updated quantity for ID:", selectedHdctId, "with value:", quantityUpdate[selectedHdctId] || listHDCT.find(h => h.id === selectedHdctId)?.soLuong || 1);
                                                            updateProductQuantity(selectedHdctId, quantityUpdate[selectedHdctId]);
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
                                            let isConfirm = window.confirm("are you sure to delete this product from cart !");
                                            if (isConfirm) {
                                                deleteCartItem(item.id);
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
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Tổng Tiền :</label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney)}
                        </label>
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
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney)}
                        </label>
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
                            onChange={(e) => {
                                if (e.target.value === "chuyenKhoan") {
                                    toastWarning("Maintenance", "Hệ thống thanh toán online đang bảo trì");
                                    e.target.value = "";
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