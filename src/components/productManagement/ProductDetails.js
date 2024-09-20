
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap'

function ProductDetails() {

    const [listProductDetail, setlistProductDetail] = useState([]);



    const [listColor, setListColor] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [listStyle, setListStyle] = useState([]);
    const [listSize, setListSize] = useState([]);
    const [listMaterial, setListMaterial] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [listManuefacturer, setListManuefacturer] = useState([]);


    const [formData, setFormData] = useState({
        giaBan: 0,
        soLuong: 0,
        idSanPham: 1,
        idKichCo: 1,
        idKieuDang: 1,
        idMauSac: 1,
        idNsx: 1,
        idThuongHieu: 1,
        trangThai: 1,
        idChatLieu: 1,
    });

    // console.log(formDataUpdate);


    const [imageAdd, setImageAdd] = useState(null);
    // console.log(formData);

    const [imageUpdate, setImageUpdate] = useState(null);

    const imageAddRef = useRef(null);
    const imageUpdateRef = useRef(null);


    const [formDataUpdate, setFormDataUpdate] = useState({
        giaBan: 0,
        soLuong: 0,
        idSanPham: 1,
        idKichCo: 1,
        idKieuDang: 1,
        idMauSac: 1,
        idNsx: 1,
        idThuongHieu: 1,
        trangThai: 1,
        idChatLieu: 1
    });


    // console.log(listProductDetail);

    // console.log(formDataUpdate);

    const [errorValidateMessage, setErrorValidateMessage] = useState({
        isImageAddValid: false,
        imageValid: "",
        soLuongValid: "",
        giaBanValid: "",
        isValidSoLuong: false,
        isValidGiaBan: false
    })

    const [errorValidateUpdateMessage, setErrorValidateUpdateMessage] = useState({
        isImageUpdateValid: false,
        imageValid: "",
        soLuongValid: "",
        giaBanValid: "",
        isValidSoLuong: false,
        isValidGiaBan: false
    })
    // console.log(formDataUpdate);

    console.log(listProductDetail);
    

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


        //fetch data list Chat Lieu

        const fetchDataMaterial = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/chat-lieu/show-all");
                const data = await response.json();
                setListMaterial(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchDataMaterial();


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

        // Local validation flags
        let isValidGiaBan = true;
        let isValidSoLuong = true;
        let isImageAddValid = true;
        let giaBanValid = "";
        let soLuongValid = "";
        let imageValid = '';

        // Convert form inputs to numbers before validating
        const giaBan = Number(formData.giaBan);
        const soLuong = Number(formData.soLuong);


        //validate image
        if (imageAdd == null) {
            isImageAddValid = false;
            imageValid = "Image can not be null";
        }

        // Validate giaBan
        if (giaBan <= 0 || isNaN(giaBan)) {
            giaBanValid = "Gia Ban is invalid";
            isValidGiaBan = false;
        }

        // Validate soLuong
        if (soLuong <= 0 || isNaN(soLuong)) {
            soLuongValid = "So Luong is invalid";
            isValidSoLuong = false;
        }

        // Update error messages state
        setErrorValidateMessage({
            giaBanValid,
            soLuongValid,
            isValidGiaBan,
            isValidSoLuong,
            isImageAddValid,
            imageValid
        });

        console.log(isValidGiaBan, isValidSoLuong, isImageAddValid);

        // If both are valid, proceed with form submission
        if (isValidGiaBan && isValidSoLuong && isImageAddValid) {
            const submitData = async () => {
                const formDataObj = new FormData();

                // Append form data and image
                formDataObj.append("details", JSON.stringify(formData));

                /*
                giaBan: 0,
        soLuong: 0,
        idSanPham: 1,
        idKichCo: 1,
        idKieuDang: 1,
        idMauSac: 1,
        idNsx: 1,
        idThuongHieu: 1,
        trangThai: 1,
        idChatLieu: 1
                */
                if (imageAdd) {
                    console.log(imageAdd);
                    
                    formDataObj.append("idSanPham", formData.idSanPham);
                    formDataObj.append("idKichCo", formData.idKichCo);
                    formDataObj.append("idKieuDang", formData.idKieuDang);
                    formDataObj.append("idMauSac", formData.idMauSac);
                    formDataObj.append("idNsx", formData.idNsx);
                    formDataObj.append("idThuongHieu", formData.idThuongHieu);
                    formDataObj.append("trangThai", formData.trangThai);
                    formDataObj.append("idChatLieu", formData.idChatLieu);
                    formDataObj.append("soLuong", formData.soLuong);
                    formDataObj.append("hinhAnh", imageAdd);
                    formDataObj.append("giaBan",formData.giaBan);
                }

                try {
                    const response = await fetch("http://localhost:5050/api/v1/chi-tiet-san-pham/new-chi-tiet-san-pham", {
                        method: "POST",
                        body: formDataObj,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setlistProductDetail([...listProductDetail, data]);
                    } else {
                        const errorMessage = await response.text();
                        console.log(errorMessage);  // Log or show the error message
                    }

                    // Close the modal if form submission is successful
                    const modalElement = document.getElementById('modalAdd');
                    if (modalElement) {
                        const modalInstance = Modal.getInstance(modalElement);
                        if (modalInstance) {
                            modalInstance.hide();
                            // Reset form after submission
                            setFormData({
                                giaBan: 0,
                                soLuong: 0,
                                idSanPham: 1,
                                idKichCo: 1,
                                idKieuDang: 1,
                                idMauSac: 1,
                                idNsx: 1,
                                idThuongHieu: 1,
                                idChatLieu: 1,
                                trangThai: 1,

                            });
                            setImageAdd(null);
                        }
                    }
                } catch (error) {
                    console.error("Submission error:", error);
                }
            };

            submitData();
        }
    };


// console.log(formData);
// console.log(imageAdd);


    const updateProductDetail = (e, id) => {
        e.preventDefault();

        // Local validation flags
        let isValidGiaBan = true;
        let isValidSoLuong = true;
        let isImageAddValid = errorValidateUpdateMessage.isImageUpdateValid;
        let giaBanValid = "";
        let soLuongValid = "";
        let imageValid = errorValidateUpdateMessage.imageValid;

        // Convert form inputs to numbers before validating
        const giaBan = Number(formDataUpdate.giaBan);
        const soLuong = Number(formDataUpdate.soLuong);


        //validate image
        if (imageUpdate == null) {
            console.log(imageUpdate);

            isImageAddValid = false;
            imageValid = "Image can not be null";
        } else {
            imageValid = "OK";
            isImageAddValid = true;


        }

        // Validate giaBan
        if (giaBan <= 0 || isNaN(giaBan)) {
            giaBanValid = "Gia Ban is invalid";
            isValidGiaBan = false;
        }

        // Validate soLuong
        if (soLuong <= 0 || isNaN(soLuong)) {
            soLuongValid = "So Luong is invalid";
            isValidSoLuong = false;
        }

        // Update error messages state
        setErrorValidateUpdateMessage({
            giaBanValid,
            soLuongValid,
            isValidGiaBan,
            isValidSoLuong,
            isImageAddValid,
            imageValid
        });


        // If both are valid, proceed with form submission
        if (isValidGiaBan && isValidSoLuong && isImageAddValid) {
            const updateData = async () => {
                const formDataObj = new FormData();

                // Append form data and image
                formDataObj.append("details", JSON.stringify(formDataUpdate));
                if (imageUpdate) {
                    formDataObj.append("image", imageUpdate);
                }

                try {
                    const response = await fetch(`http://localhost:5050/api/v1/chi-tiet-san-pham/update-chi-tiet-san-pham/${id}`, {
                        method: "PUT",
                        body: formDataObj,

                    });

                    if (response.ok) {
                        const data = await response.json();
                        setlistProductDetail([...listProductDetail, data]);
                        refreshlistProductDetail();
                    } else {
                        const errorMessage = await response.text();
                        console.log(errorMessage);  // Log or show the error message
                    }

                    // Close the modal if form submission is successful
                    const modalElement = document.getElementById(`exampleModal-${id}`);
                    if (modalElement) {
                        const modalInstance = Modal.getInstance(modalElement);
                        if (modalInstance) {
                            modalInstance.hide();
                            // Reset form after submission
                            setFormDataUpdate({
                                giaBan: 0,
                                soLuong: 0,
                                idSanPham: 1,
                                idKichCo: 1,
                                idKieuDang: 1,
                                idMauSac: 1,
                                idNsx: 1,
                                idThuongHieu: 1,
                                idChatLieu: 1,
                                trangThai: 1,
                            });
                            setImageUpdate(null);
                        }
                    }
                } catch (error) {
                    console.error("Update error:", error);
                }
            };

            updateData();
        }
        // let modalE = document.getElementById(`exampleModal-${id}`);
        // Modal.getInstance(modalE).hide();

    }

    const handleImageChange = () => {
        let file = imageAddRef.current.files[0];
        setImageAdd(file);
        if (file !== null && file !== undefined) {
            let fileName = file.name;
            let fileType = fileName.substr(fileName.lastIndexOf('.') + 1);
            let messageError = "";
            if (fileType.toLowerCase() !== "jpg" && fileType.toLowerCase() !== "png") {
                messageError = "file type is not valid !";
            }
            setErrorValidateMessage({
                ...errorValidateMessage,
                isImageAddValid: false,
                imageValid: messageError
            });
        }

    }
    // console.log(imageUpdate);
    // console.log(imageAdd);


    const handleImageUpdateChange = (e) => {
        let file = e.target.files[0];

        console.log(file);

        setImageUpdate(file);

        if (file !== null && file !== undefined) {
            let fileName = file.name;
            let fileType = fileName.substr(fileName.lastIndexOf('.') + 1);
            let messageError = "";
            if (fileType.toLowerCase() !== "jpg" && fileType.toLowerCase() !== "png") {
                messageError = "file type is not valid !";
            } else {
            }
            setErrorValidateUpdateMessage({
                ...errorValidateUpdateMessage,
                isImageUpdateValid: false,
                imageValid: messageError
            });
        }

    }


    const handleSetFormDataUpdate = (productDetail) => {
        const { giaBan, soLuong, idSanPham, idKichCo, idKieuDang, idMauSac, idNsx, idThuongHieu, idChatLieu, trangThai } = productDetail;
        setFormDataUpdate({
            giaBan,
            soLuong,
            idSanPham,
            idKichCo,
            idKieuDang,
            idMauSac,
            idNsx,
            idThuongHieu,
            idChatLieu,
            trangThai
        })
        if (giaBan <= 0 || isNaN(giaBan)) {
            errorValidateUpdateMessage.giaBanValid = "Gia Ban is invalid";
            errorValidateUpdateMessage.isValidGiaBan = false;
        } else {
            errorValidateUpdateMessage.giaBanValid = "";
            errorValidateUpdateMessage.isValidGiaBan = true;
        }

        if (soLuong <= 0 || isNaN(soLuong)) {
            errorValidateUpdateMessage.soLuongValid = "So Luong is invalid";
            errorValidateUpdateMessage.isValidSoLuong = false;
        } else {
            errorValidateUpdateMessage.soLuongValid = "";
            errorValidateUpdateMessage.isValidSoLuong = true;
        }
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

                                    <div className='mb-2 col-3'>
                                        <label className='form-label'> Chọn Chất Liệu</label>
                                        <select className="form-select" aria-label="Default select example"
                                            name='idChatLieu'
                                            onChange={(e) => {
                                                handleInputChange(e);
                                            }}
                                        >
                                            {listMaterial.map((material) => {
                                                return (
                                                    <option
                                                        key={material.id}
                                                        value={material.id}
                                                    >{material.ten}</option>
                                                )
                                            })}
                                        </select>
                                    </div>


                                </div>

                                <br></br>

                                <div className="mb-3 col-3">
                                    <label htmlFor="exampleMaProductDetail" className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name='giaBan'
                                        id="exampleMaProductDetail"
                                        value={formData.giaBan}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
                                    // required

                                    ></input>
                                    <span className='text-danger'>{errorValidateMessage.giaBanValid}</span>
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
                                        }}
                                    // required
                                    ></input>
                                    <span className='text-danger'>{errorValidateMessage.soLuongValid}</span>
                                </div>


                                <br></br>
                                <div className='row'>
                                    <div className='mb-3 col-5'>
                                        <label className='form-label'>Chọn Ảnh</label>
                                        <br></br>
                                        <input type='file'
                                            ref={imageAddRef}
                                            onChange={(e) => {
                                                handleImageChange(e);
                                            }}
                                        ></input>
                                    </div>
                                    <span className='text-danger'>{errorValidateMessage.imageValid}</span>

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
                        <th scope="col">Action</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {listProductDetail.map((ProductDetail, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{ProductDetail.id}</th>
                                <td>{ProductDetail.tenSanPham}</td>
                                <td><img 
                                style={{width:"60px",height:"60px"}}
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
                                            handleSetFormDataUpdate(ProductDetail);
                                        }}
                                    >Update</a>
                                    {/* modal update */}
                                    <div className="modal fade" id={`exampleModal-${ProductDetail.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" style={{ width: "100%", margin: "30px 300px" }}>
                                            <div className="modal-content" style={{ width: "1000px" }}>
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body" >
                                                    <form method='PUT' onSubmit={(e) => {
                                                        updateProductDetail(e, ProductDetail.id);
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
                                                                        handleInputUpdateChange(e);
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
                                                                        handleInputUpdateChange(e);
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
                                                                        handleInputUpdateChange(e);
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
                                                                        handleInputUpdateChange(e);
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
                                                                        handleInputUpdateChange(e);
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
                                                                        handleInputUpdateChange(e);
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

                                                            <div className='mb-2 col-3'>
                                                                <label className='form-label'> Chọn Chất Liệu</label>
                                                                <select className="form-select" aria-label="Default select example"
                                                                    name='idChatLieu'
                                                                    onChange={(e) => {
                                                                        handleInputUpdateChange(e);
                                                                    }}
                                                                >
                                                                    {listMaterial.map((material) => {
                                                                        return (
                                                                            <option
                                                                                key={material.id}
                                                                                value={material.id}
                                                                            >{material.ten}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>


                                                        </div>

                                                        <br></br>

                                                        <div className="mb-3 col-3">
                                                            <label htmlFor="exampleMaProductDetail" className="form-label">Price</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name='giaBan'
                                                                id="exampleMaProductDetail"
                                                                value={formDataUpdate.giaBan}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
                                                            // required

                                                            ></input>
                                                            <span className='text-danger'>{errorValidateUpdateMessage.giaBanValid}</span>
                                                        </div>
                                                        <br></br>
                                                        <div className="mb-3 col-3">
                                                            <label htmlFor="exampleTenProductDetail" className="form-label">Quantity</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name='soLuong'
                                                                id="exampleTenProductDetail"
                                                                value={formDataUpdate.soLuong}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                    console.log(e.target.value);

                                                                }}
                                                            // required
                                                            ></input>
                                                            <span className='text-danger'>{errorValidateUpdateMessage.soLuongValid}</span>
                                                        </div>


                                                        <br></br>
                                                        <div className='row'>
                                                            <div className='mb-3 col-5'>
                                                                <label className='form-label'>Chọn Ảnh</label>
                                                                <br></br>
                                                                <input type='file'
                                                                    name='inputImageUpdate'
                                                                    ref={imageUpdateRef}
                                                                    onChange={(e) => {
                                                                        console.log(e.target.files);

                                                                        handleImageUpdateChange(e);
                                                                    }}
                                                                ></input>
                                                            </div>
                                                            <span className='text-danger'>{errorValidateUpdateMessage.imageValid}</span>

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
                                                                        handleInputUpdateChange(e);
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
                                                                        handleInputUpdateChange(e);
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