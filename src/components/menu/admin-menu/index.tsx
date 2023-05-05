import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function AdminMenu(props: any) {

    const { currentUser, setCurrentUser } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            key: '/admin/user',
            label: <NavLink to="/admin/user">Users</NavLink>,
        }, {
            key: '/admin/crawler',
            label: <NavLink to="/admin/crawler">Crawlers</NavLink>,
        }, {
            key: '/admin/transaction',
            label: <NavLink to="/admin/transaction">Transactions</NavLink>,
        }, {
            key: '/admin/login',
            icon: currentUser === null
                ? <LockOutlined style={{ fontSize: 20 }} />
                : <UserOutlined style={{ fontSize: 20 }} />,
            children: currentUser === null ? [] : [{
                label: currentUser.username,
                key: '/account',
            }, {
                label: 'Logout',
                key: '/logout',
            }],
        },
    ];

    function handleClick(event: any): void {
        if (event.key === '/logout') {
            setCurrentUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('level');
            localStorage.removeItem('defaultUrl');
            navigate('/admin/login');
        }
    }

    return (
        <Menu mode="horizontal"
            theme="dark"
            selectedKeys={[location.pathname]}
            items={items}
            onClick={handleClick}
        />
    );
}

export default AdminMenu;
