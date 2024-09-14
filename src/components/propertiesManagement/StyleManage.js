
import { useState, useEffect } from 'react';
import { Modal } from 'bootstrap'

function StyleManage() {

    const [listStyle, setlistStyle] = useState([]);
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
                const response = await fetch("http://localhost:5050/api/v1/kieu-dang/show-all");
                const data = await response.json();
                setlistStyle(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    const refreshlistStyle = () => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/kieu-dang/show-all");
                const data = await response.json();
                setlistStyle(data);
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

            const response = await fetch("http://localhost:5050/api/v1/kieu-dang/new-kieu-dang", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();
            setlistStyle([...listStyle, data]);
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


    const deleteStyle = (id) => {
        const delStyle = async () => {
            try {
                const response = await fetch(`http://localhost:5050/api/v1/kieu-dang/delete-kieu-dang/${id}`, {
                    method: "DELETE",
                });
                const data = await response.json();
                console.log(data);

                refreshlistStyle();

            } catch (error) {
                console.error(error);
            }
        }
        delStyle();

    }

    const updateStyle = (e,id) => {
        e.preventDefault();
        const updateData = async () => {
            try {
                const response = await fetch(`http://localhost:5050/api/v1/kieu-dang/update-kieu-dang/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(formDataUpdate),
                    headers: {
                        "Content-Type": "application/json"
                   },
                })
                
                const data = await response.json();
                console.log("Update successful:", data);
                refreshlistStyle();
                
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
       <h1> Style Management</h1>
            <br></br>
            <br></br>
            {/* <!-- Button trigger modal --> */}
            <button
                className="btn btn-success"
                style={{ width: "140px", height: "60px", fontStyle: "20px", marginRight: "1600px" }}
                data-bs-toggle="modal"
                data-bs-target="#modalAdd"
            >New Style</button>

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
                                    <label htmlFor="exampleMaStyle" className="form-label">Mã Style</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ma'
                                        id="exampleMaStyle"
                                        value={formData.ma}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
                                        required
                                    ></input>
                                </div>
                                <br></br>
                                <div className="mb-3">
                                    <label htmlFor="exampleTenStyle" className="form-label">Tên Style</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ten'
                                        id="exampleTenStyle"
                                        value={formData.ten}
                                        required
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
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
                        <th scope="col">Tên Style</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listStyle.map((Style, index) => {
                        return (
                            <tr key={Style.id}>
                                <th scope="row">{index}</th>
                                <td>{Style.ma}</td>
                                <td>{Style.ten}</td>
                                <td>
                                    
                                    <a
                                        className='btn btn-warning'
                                        data-bs-toggle="modal"
                                        data-bs-target={`#exampleModal-${Style.id}`}
                                        onClick={() => {
                                            setFormDataUpdate(Style);
                                        }}
                                    >Update</a>
                                    {/* modal update */}
                                    <div className="modal fade" id={`exampleModal-${Style.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={(e) => {
                                                        // e.preventDefault();
                                                        updateStyle(e,Style.id);
                                                    }}>
                                                       <div className='mb-3'>

                                                        <h1>ID: {Style.id}</h1>
                                                       </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleMaStyle" className="form-label">Mã Style</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='ma'
                                                                id="exampleMaStyle"
                                                                value={formDataUpdate.ma}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
                                                            ></input>
                                                        </div>
                                                        <br></br>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleTenStyle" className="form-label">Tên Style</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='ten'
                                                                id="exampleTenStyle"
                                                                value={formDataUpdate.ten}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
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

export default StyleManage;