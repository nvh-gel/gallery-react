import React from "react";
import {Menu, MenuProps} from "antd";
import {NavLink, useLocation} from "react-router-dom";

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
    },
]

function AdminMenu() {

    const location = useLocation();

    return (
        <Menu mode="horizontal"
              theme="dark"
              selectedKeys={[location.pathname]}
              items={items}
        />
    );
}

export default AdminMenu;