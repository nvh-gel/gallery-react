import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import User from "../../../interface/User";
import { Urls } from "../../../utils/Urls";

const OAuth2CallBackPage: React.FC<any> = (props) => {

    const { setCurrentUser } = props;
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        const url = Urls.BASE + Urls.USER + '/me';
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).catch((e: Error) => {
        }).then((response) => {
            const data = response?.data.data;
            if (token && data) {
                const user: User = {
                    username: data.username,
                    token: data.token,
                    level: data.level,
                    defaultUrl: data.defaultUrl,
                }
                setCurrentUser(user);
                localStorage.setItem('username', user.username);
                localStorage.setItem('token', user.token);
                localStorage.setItem('level', data.level.toString());
                localStorage.setItem('defaultUrl', data.defaultUrl);
            }
        }).finally(() => {
            navigate(-2);
        });
    }, [token, navigate, setCurrentUser])

    return (<>{token}</>);
}

export default OAuth2CallBackPage;
