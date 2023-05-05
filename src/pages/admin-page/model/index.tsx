import { Typography } from "antd";
import React from "react";
import { AdminPageProp } from "../../../interface/AdminPageProp";
import { hasAccessTo } from "../../../interface/User";

class ModelManager extends React.Component<AdminPageProp> {

    private pathName = "/admin/model";

    constructor(props: AdminPageProp) {
        super(props);
        const currentUser = props.currentUser;
        if (!hasAccessTo(currentUser, this.pathName)) {
            props.navigate("/admin/unauthorized")
        }
    }

    render(): React.ReactNode {
        return (
            <Typography.Title level={2}>Model Manager Page</Typography.Title>
        );
    }
}

export default ModelManager;
