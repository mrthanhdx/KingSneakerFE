
import { useState, useEffect } from 'react';
import { Modal } from 'bootstrap'

function Merterial() {

    const [listMerterial, setlistMerterial] = useState([]);
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
                const response = await fetch("http://localhost:5050/admin/api/v1/chat-lieu/show-all",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                setlistMerterial(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    const refreshlistMerterial = () => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5050/admin/api/v1/chat-lieu/show-all",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = await response.json();
                setlistMerterial(data);
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

            const response = await fetch("http://localhost:5050/admin/api/v1/chat-lieu/new-chat-lieu", {
                method: "POST",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();
            setlistMerterial([...listMerterial, data]);
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


    const deleteMerterial = (id) => {
        const delMerterial = async () => {
            try {
                const response = await fetch(`http://localhost:5050/admin/api/v1/chat-lieu/delete-chat-lieu/${id}`, {
                    method: "DELETE",
                });
                const data = await response.json();
                console.log(data);

                refreshlistMerterial();

            } catch (error) {
                console.error(error);
            }
        }
        delMerterial();

    }

    const updateMerterial = (e,id) => {
        e.preventDefault();
        const updateData = async () => {
            try {
                const response = await fetch(`http://localhost:5050/admin/api/v1/chat-lieu/update-chat-lieu/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(formDataUpdate),
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    },
                })
                
                const data = await response.json();
                console.log("Update successful:", data);
                refreshlistMerterial();
                
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
       <h1> Merterial Management</h1>
            <br></br>
            <br></br>
            {/* <!-- Button trigger modal --> */}
            <button
                className="btn btn-success"
                style={{ width: "140px", height: "60px", fontMerterial: "20px", marginRight: "1600px" }}
                data-bs-toggle="modal"
                data-bs-target="#modalAdd"
            >New Merterial</button>

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
                                    <label htmlFor="exampleMaMerterial" className="form-label">Mã Merterial</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ma'
                                        id="exampleMaMerterial"
                                        value={formData.ma}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
                                        required
                                    ></input>
                                </div>
                                <br></br>
                                <div className="mb-3">
                                    <label htmlFor="exampleTenMerterial" className="form-label">Tên Merterial</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ten'
                                        id="exampleTenMerterial"
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
                        <th scope="col">Tên Merterial</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listMerterial.map((Merterial, index) => {
                        return (
                            <tr key={Merterial.id}>
                                <th scope="row">{index}</th>
                                <td>{Merterial.ma}</td>
                                <td>{Merterial.ten}</td>
                                <td>
                                   
                                    <a
                                        className='btn btn-warning'
                                        data-bs-toggle="modal"
                                        data-bs-target={`#exampleModal-${Merterial.id}`}
                                        onClick={() => {
                                            setFormDataUpdate(Merterial);
                                        }}
                                    >Update</a>
                                    {/* modal update */}
                                    <div className="modal fade" id={`exampleModal-${Merterial.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={(e) => {
                                                        // e.preventDefault();
                                                        updateMerterial(e,Merterial.id);
                                                    }}>
                                                       <div className='mb-3'>

                                                        <h1>ID: {Merterial.id}</h1>
                                                       </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleMaMerterial" className="form-label">Mã Merterial</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='ma'
                                                                id="exampleMaMerterial"
                                                                value={formDataUpdate.ma}
                                                                onChange={(e) => {
                                                                    handleInputUpdateChange(e);
                                                                }}
                                                                required
                                                            ></input>
                                                        </div>
                                                        <br></br>
                                                        <div className="mb-3">
                                                            <label htmlFor="exampleTenMerterial" className="form-label">Tên Merterial</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name='ten'
                                                                id="exampleTenMerterial"
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

export default Merterial;