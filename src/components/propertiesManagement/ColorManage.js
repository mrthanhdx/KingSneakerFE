import { useState, useEffect } from 'react';
import {Modal} from 'bootstrap'

function ColorManage() {

    const [listColor, setListColor] = useState([]);
    const [formData, setFormData] = useState({
        ma: "",
        ten: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5050/api/v1/mau-sac/show-all");
                const data = await response.json();
                setListColor(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    function handleInputChange(e) {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const submitForm = (e) => {

        e.preventDefault();
        const submitData = async () => {
            console.log(123);

            const response = await fetch("http://localhost:5050/api/v1/mau-sac/new-mau-sac", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();
            setListColor([...listColor, data]);
            // Close the modal after successful submission
            const modalElement = document.getElementById('exampleModal');
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
    return (
        <>
            <br></br>
            <br></br>
            {/* <!-- Button trigger modal --> */}
            <button
                className="btn btn-success"
                style={{ width: "140px", height: "60px", fontSize: "20px", marginRight: "1600px" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >New Color</button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <div className="mb-3">
                                    <label htmlFor="exampleMaMau" className="form-label">Mã màu</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ma'
                                        id="exampleMaMau"
                                        value={formData.ma}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                        }}
                                    ></input>
                                </div>
                                <br></br>
                                <div className="mb-3">
                                    <label htmlFor="exampleTenMau" className="form-label">Tên màu</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='ten'
                                        id="exampleTenMau"
                                        value={formData.ten}
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
                        <th scope="col">Tên Màu</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listColor.map((color, index) => {
                        return (
                            <tr key={color.id}>
                                <th scope="row">{index}</th>
                                <td>{color.ma}</td>
                                <td>{color.ten}</td>
                                <td>
                                    <a className='btn btn-danger col' style={{ marginRight: "20px" }}>Delete</a>
                                    <a className='btn btn-warning'>Update</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>


    )
}

export default ColorManage;