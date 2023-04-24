import React from "react";
import {Col, Row, Space, Typography} from "antd";
import LoginForm from "../../components/login";

function LoginPage(props: any) {

    const {currentUser} = props;

    return (
        <Row>
            <Col span={6}></Col>
            <Col span={12}>
                <Space direction="vertical" className="center-aligned">
                    <Typography.Title level={2}>
                        {currentUser === null ? "Login" : "Hello " + currentUser.username}
                    </Typography.Title>
                    {currentUser === null ? <LoginForm setCurrentUser={props.setCurrentUser}/> : ""}
                </Space>
            </Col>
        </Row>
    );
}

export default LoginPage;
