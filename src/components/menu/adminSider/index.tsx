import React from "react";
import {Menu, MenuProps, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";

const items: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);

function AdminSider() {

    const {colorBgContainer} = theme.useToken().token;

    return (
        <Sider width={200}
               style={{background: colorBgContainer}}
               breakpoint="lg"
               collapsedWidth="0"
               onBreakpoint={(broken) => {
                   console.log(broken);
               }}
               onCollapse={(collapsed, type) => {
                   console.log(collapsed, type);
               }}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
                items={items}

            />
        </Sider>
    );
}

export default AdminSider;
