
import { useState, useEffect } from 'react';
import { Modal } from 'bootstrap'

function ProductManage() {

    const [listProduct, setlistProduct] = useState([]);
    const [formData, setFormData] = useState({
        ma: "",
        ten: "",
        moTa: "",
        trangThai: 1
    });
    console.log(formData);


    const [formDataUpdate, setFormDataUpdate] = useState({
        ma: "",
        ten: "",
        moTa: "",
        trangThai: 1
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5050/admin/api/v1/san-pham/show-all",{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                setlistProduct(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    const refreshlistProduct = () => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5050/admin/api/v1/san-pham/show-all",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                setlistProduct(data);
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

            const response = await fetch("http://localhost:5050/admin/api/v1/san-pham/them-san-pham", {
                method: "POST",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();
            setlistProduct([...listProduct, data]);
            // Close the modal after successful submission
            const modalElement = document.getElementById('modalAdd');
            if (modalElement) {
                const modalInstance = Modal.getInstance(modalElement); // Access global `bootstrap` object
                if (modalInstance) {
                    modalInstance.hide(); // Close the modal
                    setFormData({
                        ma: "",
                        ten: "",
                        moTa: "",
                        trangThai: 1
                    });
                }
            }
        }
        submitData();
    }


    // const deleteProduct = (id) => {
    //     const delProduct = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:5050/api/v1/san-pham/delete-san-pham/${id}`, {
    //                 method: "DELETE",
    //             });
    //             const data = await response.json();
    //             console.log(data);

    //             refreshlistProduct();

    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     delProduct();

    // }

    const updateProduct = (e, id) => {
        e.preventDefault();
        const updateData = async () => {
            try {
                const response = await fetch(`http://localhost:5050/admin/api/v1/san-pham/update-san-pham/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(formDataUpdate),
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    },
                })

                const data = await response.json();
                console.log("Update successful:", data);
                refreshlistProduct();

            } catch (error) {
                console.error(error);
            }
        }
        updateData();
        let modalE = document.getElementById(`exampleModal-${id}`);
        Modal.getInstance(modalE).hide();

    }
    const toggleProductStatus = (idProduct, status) => {
        const updateStatus = async () => {
            const url = `http://localhost:5050/admin/api/v1/san-pham/update-trang-thai/${idProduct}?status=${status}`;
            console.log(url);

            const response = await fetch(url, {
                method: "PUT",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            const statusResult = response.status;
            console.log(statusResult);
            refreshlistProduct();

        }
        updateStatus();

    }
    return (
        <>
            <h1> Product Management</h1>
            <br></br>
            <br></br>
            {/* <!-- Button trigger modal --> */}
            <button
                className="btn btn-success"
                style={{ width: "140px", height: "60px", fontProduct: "20px", marginRight: "1600px" }}
                data-bs-toggle="modal"
                data-bs-target="#modalAdd"
            >New Product</button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="modalAdd" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={(e) => {
                                // e.preventDefault();
                                submitForm(e);
                            }}>
                                <br></br>
                                <div className="mb-3">
                                    <label htmlFor="exampleMaProduct" className="form-label">Mã Product</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ma'
                                        id="exampleMaProduct"
                                        value={formData.ma}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
                                        required
                                        
                                    ></input>
                                </div>
                                <br></br>
                                <div className="mb-3">
                                    <label htmlFor="exampleTenProduct" className="form-label">Tên Product</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ten'
                                        id="exampleTenProduct"
                                        value={formData.ten}
                                        required
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
                                        // oninvalid={this.setCustomValidity('Enter Product Name Here')}
                                        // oninput={this.setCustomValidity('')}
                                    ></input>
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label'>Mô tả</label>
                                    <textarea
                                        name='moTa'
                                        style={{ width: "460px", height: "100px" }}
                                        value={formData.moTa}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
                                    >
                                    </textarea>

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





            <br></br>
            <br></br>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Ma</th>
                        <th scope="col">Tên Product</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct.map((Product, index) => {
                        return (
                            <tr key={Product.id}>
                                <th scope="row">{index}</th>
                                <td>{Product.ma}</td>
                                <td>{Product.ten}</td>
                                <td
                                    className={Product.trangThai == 1 ? "text-success" : "text-danger"}
                                    style={{ fontSize: "18px", fontWeight: "bold" }}
                                >{Product.trangThai == 1 ? "Sẵn Hàng" : "Ngừng Bán"}</td>
                                <td>{Product.moTa}</td>

                                <td>
                                    <a className={Product.trangThai == 1 ? 'btn btn-danger col' : 'btn btn-primary col'}
                                        style={{ marginRight: "20px" }}
                                        onClick={() => {
                                            toggleProductStatus(Product.id, Product.trangThai == 1 ? 0 : 1)
                                        }}
                                    >{Product.trangThai == 1 ? "Disable" : "Enable"}</a>
                                    <a
                                        className='btn btn-warning'
                                        data-bs-toggle="modal"
                                        data-bs-target={`#exampleModal-${Product.id}`}
                                        onClick={() => {
                                            setFormDataUpdate(Product);
                                        }}
                                    >Update</a>
                                    {/* modal update */}
                                    <div className="modal fade" id={`exampleModal-${Product.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={(e) => {
                                                        // e.preventDefault();
                                                        updateProduct(e, Product.id);
                                                    }}>
                                                        <div className='mb-3'>

                                                            <h1>ID: {Product.id}</h1>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleMaProduct" className="form-label">Mã Product</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='ma'
                                                                id="exampleMaProduct"
                                                                value={formDataUpdate.ma}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
                                                                required
                                                            ></input>
                                                        </div>
                                                        <br></br>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleTenProduct" className="form-label">Tên Product</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='ten'
                                                                id="exampleTenProduct"
                                                                value={formDataUpdate.ten}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
                                                                required
                                                            ></input>
                                                        </div>

                                                        <div className='mb-3'>
                                                            <label className='form-label'>Mô tả</label>
                                                            <textarea
                                                                name='moTa'
                                                                style={{ width: "460px", height: "100px" }}
                                                                value={formDataUpdate.moTa}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
                                                            >
                                                            </textarea>

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
                                                                        handleInputUpdateChange(e);
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

export default ProductManage;