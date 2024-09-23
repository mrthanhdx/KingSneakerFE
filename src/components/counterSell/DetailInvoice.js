import { useContext, useEffect, useState } from "react";
import { GContext } from "../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";



function DetailInvoice({ idInvoice }) {
    library.add(fas);
    const [listProductDetail, setlistProductDetail] = useState([]);
    const [quantityAdd, setQuantityAdd] = useState(1);
    const { sellCounterScreen, setSellCounterScreen } = useContext(GContext);
    const [detailCurrentInvoice, setDetailCurrentInvoice] = useState({});
    console.log(detailCurrentInvoice);


    useEffect(() => {
        const fetchDataDetailInvoice = async () => {
            const response = await fetch(`http://localhost:5050/api/v1/hoa-don/detail/${idInvoice}`);
            const data = await response.json();
            setDetailCurrentInvoice(data);
        }
        fetchDataDetailInvoice();

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
    console.log(quantityAdd);

    const onQuatityAddChange = (e) => {
        
        setQuantityAdd(e.target.value);
    }
    return (
        <>
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
                        <button style={{ marginLeft: "20px" }} className="col-3 btn btn-danger">Xóa Hết Sản Phẩm</button>
                    </div>


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
                                                                value={quantityAdd}
                                                                type="number"
                                                                onChange={(e)=>{
                                                                    onQuatityAddChange(e);
                                                                }}
                                                                required /></td>

                                                        <td>
                                                            <a
                                                                className='btn btn-primary'
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
                    <div style={{ width: "95%", height: "180px", marginLeft: "30px", marginTop: "60px" }} className="product-cart bg-light"
                    >

                    </div>
                    <div style={{ width: "95%", height: "180px", marginLeft: "30px", marginTop: "60px" }} className="product-cart bg-light"
                    >

                    </div>

                    <div style={{ width: "95%", height: "180px", marginLeft: "30px", marginTop: "60px" }} className="product-cart bg-light"
                    >

                    </div>

                    <div style={{ width: "95%", height: "180px", marginLeft: "30px", marginTop: "60px" }} className="product-cart bg-light"
                    >

                    </div>
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
                        <label className="col-7" style={{ fontSize: "18px", fontWeight: "bold" }}>Số Lượng Sản Phẩm : </label>
                    </div>
                    <br />
                    <div className="row">
                        <label className="col-6" style={{ fontSize: "18px", fontWeight: "bold" }}>Tổng Tiền : </label>
                    </div>
                    <br />
                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Giảm giá voucher(nếu có) : </label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>... </label>
                        <button className="col-3 btn btn-primary">Chọn Voucher</button>
                    </div>
                    <hr />

                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Số Tiền Thanh toán : </label>
                        <label className="col-4" style={{ fontSize: "18px", fontWeight: "bold" }}>... </label>
                    </div>
                    <br />
                    <div className="row">
                        <label className="col-5" style={{ fontSize: "18px", fontWeight: "bold" }}>Tiền Khách Trả : </label>
                        <input className="col-4" type="text" /><span></span>
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
                            className="col-4 btn btn-primary">Thanh Toán</button>
                    </div>
                </div>


            </div>

        </>
    )
}

export default DetailInvoice;