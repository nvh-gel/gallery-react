import { Button, Form, Input, message } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import axios from "axios";
import { Buffer } from "buffer";
import User from "../../../interface/User";
import URLS from "../../../utils/URLS";

function LoginForm(props: any) {

    const { setCurrentUser, setModalLoginOpen, setSpinning } = props;

    function attemptLogin(data: any) {
        setSpinning(true);
        const url = URLS.BASE + URLS.AUTH + URLS.LOGIN;
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
            }
            setCurrentUser(user);
            localStorage.setItem('username', user.username);
            localStorage.setItem('token', user.token);
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
                name="username">
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password">
                <Input type="password" />
            </Form.Item>
            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 6, span: 8 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;
