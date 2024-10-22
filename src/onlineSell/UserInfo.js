import React, { useState } from 'react';
import { toastSuccess } from '../components/toastMessage/ToastMessage';

function UserInfo() {
    // User information state from localStorage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {
        email: "",
        fullName: "",
        gender: 1, // Assuming 1 is Male and 0 is Female
        phoneNumber: "",
        address: ""
    });

    // State to track if form is shown
    const [isEditing, setIsEditing] = useState(false);

    // Form state for editable fields
    const [editUser, setEditUser] = useState(user);

    // Handle input change in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser({
            ...editUser,
            [name]: value,
        });
    };

    // Handle save button click
    const handleSave = () => {
        const idUser = user.id; // Assuming user ID is stored in localStorage user object

        // Send updated data to backend via PUT request
        fetch(`http://localhost:5050/user/api/v1/update-infomation/${idUser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`  // Optional if JWT is being used
            },
            body: JSON.stringify(editUser)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
                setUser(editUser); // Save the updated data in local state
                localStorage.setItem("user", JSON.stringify(editUser)); // Update localStorage
                setIsEditing(false); // Hide form
                toastSuccess("Success !", "update infomation successfully ")
            })
            .catch((error) => {
                console.error("Error:", error);
                alert('Failed to update user information.');
            });
    };


    return (<>
                   <div id="toast-root"></div>
        <div className="container mt-5" style={{ maxWidth: "700px", boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)", padding: "30px", borderRadius: "10px" }}>
            <h2 className="text-center mb-4" style={{ fontFamily: "Arial, sans-serif", color: "#343a40" }}>
                User Information
            </h2>

            {!isEditing ? (
                // Display user info
                <div>
                    <div style={{ marginBottom: "15px" }}>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Họ Tên:</strong> {user.fullName}</p>
                        <p><strong>Giới Tính:</strong> {user.gender === 1 ? "Nam" : "Nữ"}</p>
                        <p><strong>Số Điện Thoại:</strong> {user.phoneNumber}</p>
                        <p><strong>Địa Chỉ:</strong> {user.address}</p>
                    </div>

                    <div className="text-center">
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)}
                            style={{ padding: "10px 20px", fontWeight: "bold" }}
                        >
                            Update Information
                        </button>
                    </div>
                </div>
            ) : (
                // Show form to update info
                <div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={editUser.email}
                            onChange={handleInputChange}
                            style={{ padding: "10px", borderRadius: "5px" }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Họ Tên</label>
                        <input
                            type="text"
                            name="fullName"
                            className="form-control"
                            value={editUser.fullName}
                            onChange={handleInputChange}
                            style={{ padding: "10px", borderRadius: "5px" }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Giới Tính</label>
                        <select
                            name="gender"
                            className="form-select"
                            value={editUser.gender}
                            onChange={handleInputChange}
                            style={{ padding: "10px", borderRadius: "5px" }}
                        >
                            <option value={1}>Nam</option>
                            <option value={0}>Nữ</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Số Điện Thoại</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            className="form-control"
                            value={editUser.phoneNumber}
                            onChange={handleInputChange}
                            style={{ padding: "10px", borderRadius: "5px" }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Địa Chỉ</label>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            value={editUser.address}
                            onChange={handleInputChange}
                            style={{ padding: "10px", borderRadius: "5px" }}
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-success"
                            onClick={handleSave}
                            style={{ padding: "10px 20px", fontWeight: "bold" }}
                        >
                            Save Changes
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsEditing(false)}
                            style={{ padding: "10px 20px", fontWeight: "bold" }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    </>

    );
}

export default UserInfo;
