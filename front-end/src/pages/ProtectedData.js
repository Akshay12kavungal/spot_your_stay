import React, { useEffect, useState, useContext, useCallback } from "react";
import AuthContext from '../services/AuthContext';
import axios from "axios";

const ProtectedData = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    const [data, setData] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get("/user/protected/", {
                headers: {
                    Authorization: `Bearer ${authTokens?.access}`,
                },
            });
            setData(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                logoutUser();
            } else {
                console.error("Error fetching protected data:", error.response ? error.response.data : error);
            }
        }
    }, [authTokens, logoutUser]);

    useEffect(() => {
        if (authTokens) {
            fetchData();
        }
    }, [authTokens, fetchData]);

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