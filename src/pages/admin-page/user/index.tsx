import { Typography } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router";
import User, { hasAccessTo } from "../../../interface/User";

interface UserManagerProp {
    currentUser: User,
    setSpinning: Dispatch<SetStateAction<boolean>>,
    navigate: NavigateFunction,
}

class UserManager extends React.Component<UserManagerProp> {

    private pathName = "/admin/user";

    constructor(props: UserManagerProp) {
        super(props);
        const currentUser = this.props.currentUser;
        if (!hasAccessTo(currentUser, this.pathName)) {
            this.props.navigate('/admin/unauthorized');
        }
    }

    render(): React.ReactNode {
        return (
            <Typography.Title level={2}>User Manager Page</Typography.Title>
        );
    }
}

export default UserManager;
