import { Col, Row, Space } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import LoginForm from "../../../components/form/login";
import User from "../../../interface/User";

interface AdminLoginProp {
    currentUser: User | null,
    setSpinning: Dispatch<SetStateAction<boolean>>,
    setCurrentUser: Dispatch<SetStateAction<User | null>>,
    target: string,
}

const AdminLogin: React.FC<AdminLoginProp> = (props) => {

    return (
        <Space direction="vertical" style={{ width: '100%', height: '100%' }}>
            <Row style={{ height: '200px' }}></Row>
            <Row justify="center" align="middle">
                <Col span={8}>
                    <LoginForm
                        setSpinning={props.setSpinning}
                        setCurrentUser={props.setCurrentUser}
                    />
                </Col>
            </Row>
        </Space >
    );
}

export default AdminLogin;
