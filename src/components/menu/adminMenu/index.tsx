import React from "react";
import {Menu, MenuProps} from "antd";
import {NavLink, useLocation} from "react-router-dom";
import {LockOutlined, UserOutlined} from "@ant-design/icons";


function AdminMenu(props: any) {

    const {currentUser} = props;
    const location = useLocation();

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
            key: '/login',
            icon: currentUser === null
                ? <LockOutlined style={{fontSize: 20}}/>
                : <UserOutlined style={{fontSize: 20}}/>,
            children: currentUser === null ? [] : [{
                label: 'Account',
                key: '/account',
            }, {
                label: 'Logout',
                key: '/logout',
            }],
        },
    ];

    return (
        <Menu mode="horizontal"
              theme="dark"
              selectedKeys={[location.pathname]}
              items={items}
        />
    );
}

export default AdminMenu;
