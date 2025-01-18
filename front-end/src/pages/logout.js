import React from "react";

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        alert("Logged out successfully!");
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
