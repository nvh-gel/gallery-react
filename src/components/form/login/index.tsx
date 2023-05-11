import { GoogleCircleFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, message } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import axios from "axios";
import { Buffer } from "buffer";
import User from "../../../interface/User";
import { Urls } from "../../../utils/Urls";

function LoginForm(props: any) {

    const { setCurrentUser, setModalLoginOpen, setSpinning } = props;
    const url = Urls.BASE + Urls.OAUTH2 + Urls.AUTHORIZATION + Urls.GOOGLE;
    const redirectUrl = Urls.ROOT + Urls.OAUTH2 + Urls.CALLBACK;
    const link = `${url}?redirect_uri=${redirectUrl}`;

    function attemptLogin(data: any) {
        debugger
        setSpinning(true);
        const url = Urls.BASE + Urls.AUTH + Urls.LOGIN;
        axios.post(url, {
            username: data.username,
            password: Buffer.from(data.password, 'binary').toString('base64')
        }).catch((ex: Error) => {
            setSpinning(false);
            message.error(ex.message);
        }).then((response) => {
            const data = response?.data.data;
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
            if (setModalLoginOpen) { setModalLoginOpen(false); }
            setSpinning(false);
        });
    }

    return (
        <Form name="login"
            className="form"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={attemptLogin}
        >
            <Form.Item
                label="Username"
                name="username"
                required>
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                required>
                <Input type="password" />
            </Form.Item>
            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 6, span: 8 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
                <Row justify="space-between">
                    <Col span={8}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" href={link}>
                            <GoogleCircleFilled />Google
                        </Button>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;
