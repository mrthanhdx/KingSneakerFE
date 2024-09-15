
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap'

function ProductDetails() {

    const [listProductDetail, setlistProductDetail] = useState([]);
    const [formData, setFormData] = useState({
        giaBan: "",
        soLuong: "",
        idSanPham: "",
        idKichCo: "",
        idKieuDang: "",
        idMauSac: "",
        idNsx: "",
        idThuongHieu: "",
        image: null

    });
    console.log(formData);

    const imageRef = useRef(null);
    const [formDataUpdate, setFormDataUpdate] = useState({
        ma: "",
        ten: ""
    });


    const [listColor, setListColor] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [listStyle, setListStyle] = useState([]);
    const [listSize, setListSize] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [listManuefacturer, setListManuefacturer] = useState([]);

    // console.log(listProductDetail);



    useEffect(() => {

        //fetch data Chi tiet san pham
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


        //fetch data list mau sac
        const fetchDataProduct = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/san-pham/show-all");
                const data = await response.json();
                setListProduct(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchDataProduct();

        //fetch data list mau sac

        const fetchDataColor = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/mau-sac/show-all");
                const data = await response.json();
                setListColor(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchDataColor();


        //fetch data list size
        const fetchDataSize = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/kich-co/show-all");
                const data = await response.json();
                setListSize(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchDataSize();


        //fetch data list Brand
        const fetchDataBrand = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/thuong-hieu/show-all");
                const data = await response.json();
                setListBrand(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchDataBrand();


        //fetch data list Manuefacturer
        const fetchDataManuefacturer = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/NSX/show-all");
                const data = await response.json();
                setListManuefacturer(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchDataManuefacturer();


        //fetch data list style
        const fetchDataStyle = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/kieu-dang/show-all");
                const data = await response.json();
                setListStyle(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchDataStyle();

    }, [])

    const refreshlistProductDetail = () => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/chi-tiet-san-pham/show-all");
                const data = await response.json();
                setlistProductDetail(data);
                console.log("refreshed");

            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }

    function handleInputChange(e) {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleInputUpdateChange(e) {
        let { name, value } = e.target;
        setFormDataUpdate({
            ...formDataUpdate,
            [name]: value
        });
    }

    const submitForm = (e) => {

        e.preventDefault();
        const submitData = async () => {
            console.log(123);

            const response = await fetch("http://localhost:5050/api/v1/chi-tiet-san-pham/new-chi-tiet-san-pham", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();
            setlistProductDetail([...listProductDetail, data]);
            // Close the modal after successful submission
            const modalElement = document.getElementById('modalAdd');
            if (modalElement) {
                const modalInstance = Modal.getInstance(modalElement); // Access global `bootstrap` object
                if (modalInstance) {
                    modalInstance.hide(); // Close the modal
                    setFormData({
                        giaBan: "",
                        soLuong: "",
                        idSanPham: "",
                        idKichCo: "",
                        idKieuDang: "",
                        idMauSac: "",
                        idNsx: "",
                        idThuongHieu: "",
                        image: null
                    });
                }
            }
        }
        submitData();
    }


    // const deleteProductDetail = (id) => {
    //     const delProductDetail = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:5050/api/v1/chi-tiet-san-pham/delete-chi-tiet-san-pham/${id}`, {
    //                 method: "DELETE",
    //             });
    //             const data = await response.json();
    //             console.log(data);

    //             refreshlistProductDetail();

    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     delProductDetail();

    // }

    const updateProductDetail = (e, id) => {
        e.preventDefault();
        const updateData = async () => {
            try {
                const response = await fetch(`http://localhost:5050/api/v1/chi-tiet-san-pham/update-chi-tiet-san-pham/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(formDataUpdate),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const data = await response.json();
                console.log("Update successful:", data);
                refreshlistProductDetail();

            } catch (error) {
                console.error(error);
            }
        }
        updateData();
        let modalE = document.getElementById(`exampleModal-${id}`);
        Modal.getInstance(modalE).hide();

    }

    const handleAddImage = () => {
        setFormData({
            ...formData,
            image: imageRef.current.files[0]
        })
    }
    return (
        <>
            <h1> ProductDetail Management</h1>
            <br></br>
            <br></br>
            {/* <!-- Button trigger modal --> */}
            <button
                className="btn btn-success"
                style={{ width: "140px", height: "60px", fontProductDetail: "20px", marginRight: "1600px" }}
                data-bs-toggle="modal"
                data-bs-target="#modalAdd"
            >New ProductDetail</button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="modalAdd" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ width: "100%" }}>
                <div className="modal-dialog" style={{ width: "100%", margin: "30px 300px" }}>
                    <div className="modal-content" style={{ width: "1000px" }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New Product Detail</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body" >
                            <form onSubmit={(e) => {
                                submitForm(e);
                            }}
                            >
                                <br></br>

                                <div className='row'>
                                    <div className='mb-2 col-4'>
                                        <label className='form-label'> Chọn Sản Phẩm</label>
                                        <select className="form-select"
                                            aria-label="Default select example"
                                            name='idSanPham'
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }
                                            }
                                        >
                                            {listProduct.map((product) => {
                                                return (
                                                    <option
                                                        key={product.id}
                                                        value={product.id}
                                                    >{product.ten}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <br></br>

                                <div className='row'>

                                    <div className='mb-2 col-3'>
                                        <label className='form-label'> Chọn Kích cỡ</label>
                                        <select className="form-select" aria-label="Default select example"
                                            name='idKichCo'
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}
                                        >
                                            {listSize.map((size) => {
                                                return (
                                                    <option
                                                        key={size.id}
                                                        value={size.id}
                                                    >{size.ten}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className='mb-2 col-3'>
                                        <label className='form-label'> Chọn Kiểu Dáng</label>
                                        <select className="form-select" aria-label="Default select example"
                                            name='idKieuDang'
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}
                                        >
                                            {listStyle.map((style) => {
                                                return (
                                                    <option
                                                        key={style.id}
                                                        value={style.id}
                                                    >{style.ten}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className='mb-2 col-3'>
                                        <label className='form-label'> Chọn Màu Sắc </label>
                                        <select className="form-select" aria-label="Default select example"
                                            name='idMauSac'
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}
                                        >
                                            {listColor.map((color) => {
                                                return (
                                                    <option
                                                        key={color.id}
                                                        value={color.id}
                                                    >{color.ten}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                </div>

                                <br></br>
                                <div className='row'>

                                    <div className='mb-2 col-3'>
                                        <label className='form-label'> Nhà Sản Xuất</label>
                                        <select className="form-select" aria-label="Default select example"
                                            name='idNsx'
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}
                                        >
                                            {listManuefacturer.map((manuefacturer) => {
                                                return (
                                                    <option
                                                        key={manuefacturer.id}
                                                        value={manuefacturer.id}
                                                    >{manuefacturer.ten}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className='mb-2 col-3'>
                                        <label className='form-label'> Chọn Thương Hiệu</label>
                                        <select className="form-select" aria-label="Default select example"
                                            name='idThuongHieu'
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}
                                        >
                                            {listBrand.map((brand) => {
                                                return (
                                                    <option
                                                        key={brand.id}
                                                        value={brand.id}
                                                    >{brand.ten}</option>
                                                )
                                            })}
                                        </select>
                                    </div>



                                </div>

                                <br></br>
                                <div className='row'>
                                    <div className="mb-3 col-3">
                                        <label htmlFor="exampleMaProductDetail" className="form-label">Price</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='giaBan'
                                            id="exampleMaProductDetail"
                                            value={formData.giaBan}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}
                                            required

                                        ></input>
                                    </div>
                                    <br></br>
                                    <div className="mb-3 col-3">
                                        <label htmlFor="exampleTenProductDetail" className="form-label">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name='soLuong'
                                            id="exampleTenProductDetail"
                                            value={formData.soLuong}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                console.log(e.target.value);

                                            }}
                                            required
                                        ></input>
                                    </div>
                                </div>

                                <br></br>
                                <div className='mb-3 col-5'>
                                    <label className='form-label'>Chọn Ảnh</label>
                                    <br></br>
                                    <input type='file'
                                        ref={imageRef}
                                        onChange={() => {
                                            handleAddImage();
                                        }}
                                    ></input>
                                </div>

                                <br></br>

                                <div className='mb-3 row col-10'
                                // style={{ justifyContent: "center" }}
                                >
                                    <div className="form-check col-2"
                                        style={{ marginLeft: "40px" }}
                                    >
                                        <input
                                            className="form-check-input"
                                            type="radio" name="trangThai"
                                            value="1" id="flexRadioDefault1"
                                            defaultChecked
                                            onClick={(e) => {
                                                handleInputChange(e);
                                            }}
                                        ></input>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Sẵn Hàng
                                        </label>
                                    </div>
                                    <div className="form-check col-2">
                                        <input
                                            className="form-check-input"
                                            type="radio" name="trangThai"
                                            value="0"
                                            id="flexRadioDefault2"
                                            onClick={(e) => {
                                                handleInputChange(e);
                                            }}
                                        ></input>
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Hết Hàng
                                        </label>
                                    </div>
                                </div>


                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>





            <br></br>
            <br></br>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên Sản Phẩm</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Size</th>
                        <th scope="col">Style</th>
                        <th scope="col">Color</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Manuefacturer</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>

                        <th scope="col">Action</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {listProductDetail.map((ProductDetail, index) => {
                        return (
                            <tr key={ProductDetail.id}>
                                <th scope="row">{index}</th>
                                <td>{ProductDetail.tenSanPham}</td>
                                <td><img src={ProductDetail.pathHinhAnh} alt='anh giay sneaker'></img></td>
                                <td>{ProductDetail.kichCo}</td>
                                <td>{ProductDetail.kieuDang}</td>
                                <td>{ProductDetail.mauSac}</td>
                                <td>{ProductDetail.thuongHieu}</td>
                                <td>{ProductDetail.nsx}</td>
                                <td>{ProductDetail.giaBan}</td>
                                <td>{ProductDetail.soLuong}</td>
                                <td
                                    className={ProductDetail.trangThai == 1 ? "text-success" : "text-danger"}
                                    style={{ fontSize: "18px", fontWeight: "bold" }}
                                >{ProductDetail.trangThai == 1 ? "Sẵn Hàng" : "Hết Hàng"}</td>

                                <td>
                                    <a className={ProductDetail.trangThai == 1 ? 'btn btn-danger col' : 'btn btn-primary col'}
                                        style={{ marginRight: "20px" }}
                                        onClick={() => {
                                            // toggleProductStatus(ProductDetail.id, ProductDetail.trangThai == 1 ? 0 : 1)
                                        }}
                                    >{ProductDetail.trangThai == 1 ? "Disable" : "Enable"}</a>

                                    <a
                                        className='btn btn-warning'
                                        data-bs-toggle="modal"
                                        data-bs-target={`#exampleModal-${ProductDetail.id}`}
                                        onClick={() => {
                                            setFormDataUpdate(ProductDetail);
                                        }}
                                    >Update</a>
                                    {/* modal update */}
                                    <div className="modal fade" id={`exampleModal-${ProductDetail.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={(e) => {
                                                        // e.preventDefault();
                                                        updateProductDetail(e, ProductDetail.id);
                                                    }}>
                                                        <div className='mb-3'>

                                                            <h1>ID: {ProductDetail.id}</h1>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleMaProductDetail" className="form-label">Mã ProductDetail</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='ma'
                                                                id="exampleMaProductDetail"
                                                                value={formDataUpdate.ma}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
                                                                required
                                                            ></input>
                                                        </div>
                                                        <br></br>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleTenProductDetail" className="form-label">Tên ProductDetail</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='ten'
                                                                id="exampleTenProductDetail"
                                                                value={formDataUpdate.ten}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
                                                                required
                                                            ></input>
                                                        </div>

                                                        <div className='mb-3 row'
                                                            style={{ justifyContent: "center" }}
                                                        >

                                                            <div className="form-check col-3">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio" name="trangThai"
                                                                    value="1" id="flexRadioDefault1"
                                                                    defaultChecked
                                                                    onClick={(e) => {
                                                                        handleInputChange(e);
                                                                    }}
                                                                ></input>
                                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                    Sẵn Hàng
                                                                </label>
                                                            </div>
                                                            <div className="form-check col-3">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio" name="trangThai"
                                                                    value="0"
                                                                    id="flexRadioDefault2"
                                                                    onClick={(e) => {
                                                                        handleInputChange(e);
                                                                    }}
                                                                ></input>
                                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                                    Hết Hàng
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <button type="submit" className="btn btn-primary">Submit</button>
                                                    </form>

                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>


    )
}

export default ProductDetails;