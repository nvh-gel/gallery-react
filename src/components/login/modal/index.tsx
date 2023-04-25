import React from "react";
import LoginForm from "../form";
import {Modal} from "antd";

function LoginModal(props: any) {

    const {setCurrentUser, modalLoginOpen, setModalLoginOpen} = props;

    return (
        <Modal title="Login"
               centered
               open={modalLoginOpen}
               onCancel={() => setModalLoginOpen(false)}
               width={800}
               footer={null}
        >
            <LoginForm
                setCurrentUser={setCurrentUser}
                setModalLoginOpen={setModalLoginOpen}/>
        </Modal>
    );
}

export default LoginModal;
