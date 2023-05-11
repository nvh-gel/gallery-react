import { ConfigProvider, Spin } from "antd";
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './App.css';
import defineTheme from "./Theme";
import User from "./interface/User";
import AdminPage from "./pages/admin-page";
import UserPage from "./pages/user-page";

function App() {

    const location = useLocation();
    const [currentTheme, setCurrentTheme]
        = useState(defineTheme("/"));
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [spinning, setSpinning] = useState(false);

    useEffect(() => {
        setCurrentTheme(defineTheme(location.pathname));

        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        const level = localStorage.getItem('level');
        const defaultUrl = localStorage.getItem('defaultUrl');
        if (username !== null && token !== null) {
            const loggedInUser: User = {
                username: username,
                token: token,
                level: level === null ? 0 : parseInt(level),
                defaultUrl: defaultUrl === null ? '/' : defaultUrl,
            }
            setCurrentUser(loggedInUser);
        }
    }, [location]);

    function isAdminPage() {
        return location.pathname.startsWith("/admin");
    }

    return (
        <div>
            <ConfigProvider theme={currentTheme}>
                <Spin tip="loading"
                    spinning={spinning}
                    size="large"
                    style={{ position: 'fixed', top: '30%', zIndex: 1000 }}
                >
                    {!isAdminPage()
                        ? <UserPage currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            setSpinning={setSpinning}
                        />
                        : <AdminPage currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            setSpinning={setSpinning}
                        />
                    }
                </Spin>
            </ConfigProvider>
        </div>
    );
}

export default App;
