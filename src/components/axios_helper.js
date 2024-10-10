export const callApi = async (endpoint, method = 'POST', params = {}, body = null, useFormData = false,role  = "customer") => {
    const url = new URL(`http://localhost:5050${role=="admin"?"/admin":""}/api/v1/${endpoint}`);

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json', // Set content type to JSON
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    };

    if (body) {
        if (useFormData) {
            delete options.headers['Content-Type']; // Do not set Content-Type for FormData
            options.body = body; // Directly assign FormData
        } else {
            options.body = JSON.stringify(body); // Convert the body to JSON string
        }
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response; // Return response for checking status in handleLogin
    } catch (error) {
        console.error("API call error: ", error);
        return null;
    }
};
