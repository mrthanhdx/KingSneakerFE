import { useContext, useEffect, useState } from "react";
import { GContext } from "../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { Modal } from 'bootstrap'
import {toastError,toastInfo,toastSuccess,toastWarning} from "../toastMessage/ToastMessage";



function DetailInvoice({ idInvoice }) {
    library.add(fas);
    const [listProductDetail, setlistProductDetail] = useState([]);
    const [quantityAdd, setQuantityAdd] = useState({});
    const { sellCounterScreen, setSellCounterScreen } = useContext(GContext);
    const [detailCurrentInvoice, setDetailCurrentInvoice] = useState({});
    const [listHDCT, setListHDCT] = useState([]);
    const [giaGiam, setGiaGiam] = useState(0);
    const [quantityUpdate, setQuantityUpdate] = useState({});
    const [selectedHdctId, setSelectedHdctId] = useState(null); // To track which hdct is being updated

    // console.log(detailCurrentInvoice);

    // console.log(listHDCT);


    useEffect(() => {
        const fetchDataDetailInvoice = async () => {
            const response = await fetch(`http://localhost:5050/api/v1/hoa-don/detail/${idInvoice}`);
            const data = await response.json();
            setDetailCurrentInvoice(data);
        }
        fetchDataDetailInvoice();

        const fetchListProductDetail = async () => {
            const response = await fetch(`http://localhost:5050/api/v1/hoa-don-chi-tiet/get-list-hdct/${idInvoice}`);
            const data = await response.json();
            setListHDCT(data);
        }
        fetchListProductDetail();

        const fetchDataCtsp = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/chi-tiet-san-pham/show-all");
                const data = await response.json();
                setlistProductDetail(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchDataCtsp();
    }, [])

    const refreshApp = () => {
        const fetchDataDetailInvoice = async () => {
            const response = await fetch(`http://localhost:5050/api/v1/hoa-don/detail/${idInvoice}`);
            const data = await response.json();
            setDetailCurrentInvoice(data);
        }
        fetchDataDetailInvoice();

        const fetchListProductDetail = async () => {
            const response = await fetch(`http://localhost:5050/api/v1/hoa-don-chi-tiet/get-list-hdct/${idInvoice}`);
            const data = await response.json();
            setListHDCT(data);
        }
        fetchListProductDetail();

        const fetchDataCtsp = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/chi-tiet-san-pham/show-all");
                const data = await response.json();
                setlistProductDetail(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchDataCtsp();

    }
    const onQuatityAddChange = (e, productID) => {

        setQuantityAdd(prevQuantity => (
            {
                ...prevQuantity,
                [productID]: e.target.value
            }
        ));
    }


    const deleteProductFromInvoice = (idCTSP, idHD) => {
        const HDCTDeleteObj = new FormData();
        HDCTDeleteObj.append("idCtsp", idCTSP);
        HDCTDeleteObj.append("idHd", idHD);
        try {
            const deleteHdct = async () => {
                const response = await fetch("http://localhost:5050/api/v1/hoa-don-chi-tiet/delete-hdct", {
                    method: "DELETE",
                    body: HDCTDeleteObj
                })
                const data = await response.text();
               
                if(response.status==200) {
                    toastSuccess("thành công",data);
                } else {
                    toastError("thất bại",data);
                }
                refreshApp();

            }
            deleteHdct();
        } catch (err) {
            console.error(err);
        }

    }


    const onProductQuantityUpdateChange = (e, idHdct) => {
        setQuantityUpdate(prevQuantityUpdate => ({
            ...prevQuantityUpdate,
            [idHdct]: e.target.value
        }))
    }

    const updateProductQuantity = (idHDCT, soLuongUpdate) => {
        const dataUpdateObj = new FormData();
        dataUpdateObj.append("idHDCT", idHDCT);
        console.log(soLuongUpdate);
        dataUpdateObj.append("soLuongUpdate", soLuongUpdate);

        try {
            const updateQuantity = async () => {
                const response = await fetch("http://localhost:5050/api/v1/hoa-don-chi-tiet/update-quantity", {
                    method: "PUT", // "UPDATE" is not a valid HTTP method; you likely meant "POST" or "PUT"
                    body: dataUpdateObj
                });

                // Dynamically determine the response type
                const contentType = response.headers.get("content-type");
                let data;

                if (contentType.includes("application/json")) {
                    data = await response.json(); // Parse as JSON
                } else if (contentType.includes("text/plain")) {
                    data = await response.text(); // Parse as text
                } else {
                    data = await response.blob(); // For other types like binary data
                }

                // Do something with the returned data (whether it's text or JSON)
              if(response.status==400) {
                  toastError("Thất bại",data);
              } else {
                toastSuccess("Thành Công",data);

              }
            console.log(data);
            

                const modalElement = document.getElementById('modalUpdateQuantity');
                if (modalElement) {
                    const modalInstance = Modal.getInstance(modalElement);
                    if (modalInstance) {
                        modalInstance.hide();
                        setQuantityUpdate({ selectedHdctId: 1 });
                        setTimeout(() => {
                            refreshApp();
                        }, 200); // Give some time for modal closure
                    }

                }

            };

            updateQuantity();
        } catch (error) {
            toastError("Thất bại",error);
        }
    };

    const addNewHdct = (idCTSP, idHD, soLuong) => {
        const addHDCT = async () => {
            try {
                const hdctFormData = new FormData();
                hdctFormData.append("idCTSP", idCTSP);
                hdctFormData.append("idHD", idHD);
                hdctFormData.append("soLuong", soLuong);
                const response = await fetch("http://localhost:5050/api/v1/hoa-don-chi-tiet/new-hdct", {
                    method: "POST",
                    body: hdctFormData
                });
                const data = await response.text();
                if(response.status==200) {
                    toastSuccess("Thêm thành công",data);
                } else {
                    toastError("Thêm thất bại",data);
                }

                //close modal

                const modalElement = document.getElementById('modalAdd');
                if (modalElement) {
                    const modalInstance = Modal.getInstance(modalElement);
                    if (modalInstance) {
                        modalInstance.hide();
                        setQuantityAdd(1);
                        setTimeout(() => {
                            refreshApp();
                        }, 200); // Give some time for modal closure
                    }

                }
            } catch (error) {
                console.error(error);
            }

        }
        addHDCT();
    }
    const deleteAllHDCT = (idHD) => {
        const deleteAllHDCT1 = async()=>{
            try {
                const response = await fetch(`http://localhost:5050/api/v1/hoa-don-chi-tiet/delete-all-hdct/${idHD}`, {
                    method: "DELETE"
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
    
                // Do something with the returned data (whether it's text or JSON)
                if(response.status==200) {
                    toastSuccess("Thành công",data);
                } else {
                    toastError("Thất bại",data);
                }
                refreshApp();
            } catch (err) {
                console.error(err);
    
            }
        }
        deleteAllHDCT1();
        
    }
    return (
        <>
        <div id="toast-root"></div>
            <div>
                <h1>
                    Invoice : {detailCurrentInvoice.ma}
                </h1>
                <button
                    style={{ width: "140px", height: "50px", border: "none", borderRadius: "10px", position: "absolute", left: "20px", top: "140px", backgroundColor: "var(--bs-info)" }}
                    onClick={() => {
                        setSellCounterScreen("listInvoice")
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
                        <h3 className="col-6">Cart</h3>
                        {/* button trigger modal */}
                        <button className="col-2 btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAdd">Thêm Sản Phẩm</button>
                        <button
                            style={{ marginLeft: "20px" }}
                            onClick={() => {
                                let isConfirm = window.confirm("are you sure to delete all the product from this invoice ?");
                                if (isConfirm) {
                                    deleteAllHDCT(idInvoice);
                                }
                            }}
                            className="col-3 btn btn-danger"
                        >Xóa Hết Sản Phẩm</button>
                    </div>

                    {/* //modal */}
                    <div className="modal fade" id="modalAdd" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ width: "100%" }}>
                        <div className="modal-dialog" style={{ width: "100%", margin: "30px 300px" }}>
                            <div className="modal-content" style={{ width: "1400px" }}>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">New Product Detail</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body" >

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Tên Sản Phẩm</th>
                                                <th scope="col">Hình ảnh</th>
                                                <th scope="col">Size</th>
                                                <th scope="col">Style</th>
                                                <th scope="col">Color</th>
                                                <th scope="col">Material</th>
                                                <th scope="col">Brand</th>
                                                <th scope="col">Manuefacturer</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Số Lượng mua</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listProductDetail.map((ProductDetail, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{ProductDetail.id}</th>
                                                        <td>{ProductDetail.tenSanPham}</td>
                                                        <td><img
                                                            style={{ width: "60px", height: "60px" }}
                                                            src={
                                                                ProductDetail.pathHinhAnh} alt='anh giay sneaker'></img></td>
                                                        <td>{ProductDetail.kichCo}</td>
                                                        <td>{ProductDetail.kieuDang}</td>
                                                        <td>{ProductDetail.mauSac}</td>
                                                        <td>{ProductDetail.chatLieu}</td>
                                                        <td>{ProductDetail.thuongHieu}</td>
                                                        <td>{ProductDetail.nsx}</td>
                                                        <td>{ProductDetail.giaBan}</td>
                                                        <td>{ProductDetail.soLuong}</td>
                                                        <td
                                                            className={ProductDetail.trangThai == 1 ? "text-success" : "text-danger"}
                                                            style={{ fontSize: "18px", fontWeight: "bold" }}
                                                        ><input
                                                                value={quantityAdd[ProductDetail.id] || 1}
                                                                type="number"
                                                                onChange={(e) => {
                                                                    onQuatityAddChange(e, ProductDetail.id);
                                                                }}
                                                                required /></td>

                                                        <td>
                                                            <a
                                                                className='btn btn-primary'
                                                                onClick={() => {
                                                                    let isConfirm = window.confirm("are you sure to add this product to invoice ?");
                                                                    if (isConfirm) {
                                                                        addNewHdct(ProductDetail.id, idInvoice, quantityAdd[ProductDetail.id] == undefined ? 1 : quantityAdd[ProductDetail.id]);
                                                                    }
                                                                }}
                                                            >
                                                                Add</a>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                </div>
                            </div>
                        </div>
                    </div>



                    <hr />
                    {listHDCT.map((hdct) => {
                        return (
                            <div key={hdct.id} style={{ width: "97%", height: "200px", marginLeft: "20px", marginTop: "60px" }} className="product-cart bg-light row"
                            >
                                <div className="col-2">
                                    <img style={{ width: "80px", height: "80px" }} src={hdct.chiTietSanPham.hinhAnh.path} alt="anh san pham" />
                                </div>
                                <div className="col-2">
                                    <h5>{hdct.chiTietSanPham.sanPham.ten}</h5>
                                </div>
                                <div className="col-2">
                                    <span>Màu:{hdct.chiTietSanPham.mauSac.ten}</span>
                                    <br />
                                    <span>Size:{hdct.chiTietSanPham.kichCo.ten}</span>
                                    <br />
                                    <span>Style:{hdct.chiTietSanPham.kieuDang.ten}</span>
                                    <br />
                                    <span>NSX:{hdct.chiTietSanPham.nsx.ten}</span>
                                    <br />
                                    <span>{hdct.chiTietSanPham.chatLieu.ten}</span>
                                    <br />
                                    <span>TH:{hdct.chiTietSanPham.thuongHieu.ten}</span>

                                </div>

                                <div className="col-2">
                                    <h6>Đơn Giá</h6>
                                    <span>{hdct.donGia}Vnd</span>
                                    <br /><br /><br />
                                    <h6>Số Lượng</h6>
                                    <span>{hdct.soLuong}</span>

                                </div>

                                <div className="col-2">
                                    <h6>Tổng Tiền</h6>
                                    <span>{hdct.donGia * hdct.soLuong}vnd</span>
                                </div>

                                <div className="col-2">
                                    <br />
                                    <button
                                        className="btn btn-warning"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalUpdateQuantity"
                                        onClick={() => setSelectedHdctId(hdct.id)} // Set the selected hdct ID
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
                                                        onChange={(e) => onProductQuantityUpdateChange(e, selectedHdctId)}
                                                    />
                                                    <br />
                                                    <br />
                                                    <button
                                                        className="btn btn-outline-warning"
                                                        onClick={() => {
                                                            // Handle update logic for the selected item
                                                            updateProductQuantity(selectedHdctId, quantityUpdate[selectedHdctId]==undefined ?listHDCT.find(h => h.id === selectedHdctId)?.soLuong:quantityUpdate[selectedHdctId]);
                                                            console.log("Updated quantity for ID:", selectedHdctId, "with value:", quantityUpdate[selectedHdctId] || listHDCT.find(h => h.id === selectedHdctId)?.soLuong || 1);
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
                                                deleteProductFromInvoice(hdct.chiTietSanPham.id, idInvoice);
                                            }
                                        }}
                                    >Xóa khỏi đơn hàng</button>
                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className="invoiceInfomation col-5"
                    style={{ height: "800px", backgroundColor: "var(	--bs-success-bg-subtle)", marginLeft: "50px" }}
                >
                    <h3>Invoice Infomation</h3>
                    <hr />
                    <div className="row">
                        <label className="col-6" style={{ fontSize: "18px", fontWeight: "bold" }}>-ID Hoá đơn: {detailCurrentInvoice.id}</label>
                        <label className="col-6" style={{ fontSize: "18px", fontWeight: "bold" }}>-Mã Hoá đơn: {detailCurrentInvoice.ma}</label>
                    </div>
                    <br />
                    <div className="row">
                        <label className="col-7" style={{ fontSize: "18px", fontWeight: "bold" }}>-Nhân Viên Tạo : {detailCurrentInvoice.nhanVien == null ? "HI" : detailCurrentInvoice.nhanVien.hoTen}</label>
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            -Ngày Tạo :
                            {detailCurrentInvoice.ngayTao == undefined ? "" : (detailCurrentInvoice.ngayTao[2] + "/" + detailCurrentInvoice.ngayTao[1] + "/" + detailCurrentInvoice.ngayTao[0])}
                        </label>

                    </div>
                    <br />
                    <div className="row">
                        <label className="col-7" style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            -Khách Hàng : {detailCurrentInvoice.khachHang == null ? "chưa có" : detailCurrentInvoice.khachHang.hoTen}
                        </label>
                        <button className="col-4 btn btn-primary">Chọn Khách Hàng</button>
                    </div>
                    <hr />

                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Tổng Tiền : </label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>{detailCurrentInvoice.tongTien}</label>

                    </div>
                    <br />
                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Giảm giá voucher(nếu có) : </label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>{giaGiam}</label>
                        <button className="col-3 btn btn-primary">Chọn Voucher</button>
                    </div>
                    <hr />

                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Số Tiền Thanh toán : </label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>{detailCurrentInvoice.tongTien - giaGiam} </label>
                    </div>
                    <br />
                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Tiền Khách Trả : </label>
                        <input className="col-4" type="number" /><span></span>
                    </div>
                    <br />
                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Tiền Thừa : </label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>... </label>
                    </div>
                    <br />

                    <label htmlFor="note" style={{ fontSize: "18px", fontWeight: "bold" }}>Ghi Chú</label>
                    <br />
                    <textarea id="note" style={{ width: "400px", height: "80px" }} name=""></textarea>
                    <br />
                    <br />

                    <div className="paying">
                        <button
                            style={{ height: "50px" }}
                            onClick={()=>{
                                toastError("error","Thanh toán thành công !")
                            }}
                            className="col-4 btn btn-primary">Thanh Toán</button>
                    </div>
                </div>


            </div>

        </>
    )
}

export default DetailInvoice;