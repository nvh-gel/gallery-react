import { Typography } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface UserManagerProp {
    setSpinning: Dispatch<SetStateAction<boolean>>,
}

class UserManager extends React.Component<UserManagerProp> {

    render(): React.ReactNode {
        return (
            <Typography.Title level={2}>User Manager Page</Typography.Title>
        );
    }
}

export default UserManager;
