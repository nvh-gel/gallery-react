import React, {useEffect, useState} from 'react';
import './App.css';
import {ConfigProvider, Spin} from "antd";
import {useLocation} from "react-router-dom";
import defineTheme from "./Theme";
import User from "./interface/User";
import UserPage from "./pages/userpage";
import AdminPage from "./pages/adminpage";


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
        if (username !== null && token !== null) {
            const loggedInUser: User = {
                username: username,
                token: token,
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
                <Spin tip="loading" className="spinner" spinning={spinning} size="large">
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
