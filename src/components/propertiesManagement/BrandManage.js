
import { useState, useEffect } from 'react';
import { Modal } from 'bootstrap'

function BrandManage() {

    const [listBrand, setlistBrand] = useState([]);
    const [formData, setFormData] = useState({
        ma: "",
        ten: ""
    });

    const [formDataUpdate, setFormDataUpdate] = useState({
        ma: "",
        ten: ""
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5050/admin/api/v1/thuong-hieu/show-all",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                setlistBrand(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    const refreshlistBrand = () => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5050/admin/api/v1/thuong-hieu/show-all",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                setlistBrand(data);
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

            const response = await fetch("http://localhost:5050/admin/api/v1/thuong-hieu/new-thuong-hieu", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();
            setlistBrand([...listBrand, data]);
            // Close the modal after successful submission
            const modalElement = document.getElementById('modalAdd');
            if (modalElement) {
                const modalInstance = Modal.getInstance(modalElement); // Access global `bootstrap` object
                if (modalInstance) {
                    modalInstance.hide(); // Close the modal
                    setFormData({
                        ma: "",
                        ten: ""
                    });
                }
            }
        }
        submitData();
    }


    const deleteBrand = (id) => {
        const delBrand = async () => {
            try {
                const response = await fetch(`http://localhost:5050/admin/api/v1/thuong-hieu/delete-thuong-hieu/${id}`, {
                    method: "DELETE",
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                console.log(data);

                refreshlistBrand();

            } catch (error) {
                console.error(error);
            }
        }
        delBrand();

    }

    const updateBrand = (e, id) => {
        e.preventDefault();
        const updateData = async () => {
            try {
                const response = await fetch(`http://localhost:5050/admin/api/v1/thuong-hieu/update-thuong-hieu/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(formDataUpdate),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                const data = await response.json();
                console.log("Update successful:", data);
                refreshlistBrand();

            } catch (error) {
                console.error(error);
            }
        }
        updateData();
        let modalE = document.getElementById(`exampleModal-${id}`);
        Modal.getInstance(modalE).hide();

    }
    return (
        <>
            <h1> Brand Management</h1>
            <br></br>
            <br></br>
            {/* <!-- Button trigger modal --> */}
            <button
                className="btn btn-success"
                style={{ width: "140px", height: "60px", fontBrand: "20px", marginRight: "1600px" }}
                data-bs-toggle="modal"
                data-bs-target="#modalAdd"
            >New Brand</button>

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
                                    <label htmlFor="exampleMaBrand" className="form-label">Mã Brand</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ma'
                                        id="exampleMaBrand"
                                        value={formData.ma}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
                                        required
                                    ></input>
                                </div>
                                <br></br>
                                <div className="mb-3">
                                    <label htmlFor="exampleTenBrand" className="form-label">Tên Brand</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ten'
                                        id="exampleTenBrand"
                                        value={formData.ten}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
                                        required
                                    ></input>
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
                        <th scope="col">Tên Brand</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listBrand.map((Brand, index) => {
                        return (
                            <tr key={Brand.id}>
                                <th scope="row">{index}</th>
                                <td>{Brand.ma}</td>
                                <td>{Brand.ten}</td>
                                <td>

                                    <a
                                        className='btn btn-warning'
                                        data-bs-toggle="modal"
                                        data-bs-target={`#exampleModal-${Brand.id}`}
                                        onClick={() => {
                                            setFormDataUpdate(Brand);
                                        }}
                                    >Update</a>
                                    {/* modal update */}
                                    <div className="modal fade" id={`exampleModal-${Brand.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={(e) => {
                                                        // e.preventDefault();
                                                        updateBrand(e, Brand.id);
                                                    }}>
                                                        <div className='mb-3'>

                                                            <h1>ID: {Brand.id}</h1>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleMaBrand" className="form-label">Mã Brand</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='ma'
                                                                id="exampleMaBrand"
                                                                value={formDataUpdate.ma}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
                                                                required
                                                            ></input>
                                                        </div>
                                                        <br></br>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleTenBrand" className="form-label">Tên Brand</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='ten'
                                                                id="exampleTenBrand"
                                                                value={formDataUpdate.ten}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
                                                                required
                                                            ></input>
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

export default BrandManage;