import React, { useEffect, useState, useContext } from "react";
import AuthContext from '../services/AuthContext' // Import the AuthContext
import axios from "axios";

const ProtectedData = () => {
    const { authTokens, logoutUser } = useContext(AuthContext); // Access authTokens from context
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            // Make an API request with the access token in the Authorization header
            const response = await axios.get("/user/protected/", {
                headers: {
                    Authorization: `Bearer ${authTokens?.access}`,
                },
            });
            setData(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // If unauthorized, log out the user
                logoutUser();
            } else {
                console.error("Error fetching protected data:", error.response ? error.response.data : error);
            }
        }
    };

    useEffect(() => {
        if (authTokens) {
            fetchData(); // Fetch protected data only if authTokens are available
        }
    }, [authTokens]);

    return (
        <div>
            {data ? (
                <div>
                    <h3>Protected Data:</h3>
                    <p>{JSON.stringify(data)}</p>
                </div>
            ) : (
                <p>{authTokens ? "Loading..." : "Please log in to view protected data."}</p>
            )}
        </div>
    );
};

export default ProtectedData;
