import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const AdminHome: React.FC<any> = () => {

    const defaultUrl = localStorage.getItem('defaultUrl');
    const navigate = useNavigate();

    useEffect(() => {
        const url = defaultUrl === null ? '/' : defaultUrl;
        navigate(url);
    }, [defaultUrl, navigate])

    return null;
}

export default AdminHome;
