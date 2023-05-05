import { Typography } from "antd";
import React from "react";
import { AdminPageProp } from "../../../interface/AdminPageProp";
import { hasAccessTo } from "../../../interface/User";

class TransactionPage extends React.Component<AdminPageProp> {

    private pathName = "/admin/transaction";

    constructor(props: AdminPageProp) {
        super(props)
        if(!hasAccessTo(props.currentUser, this.pathName)) {
            props.navigate("/admin/unauthorized");
        }
    }

    render(): React.ReactNode {
        return (
            <Typography.Title level={2}>Transaction Page</Typography.Title>
        );
    }
}

export default TransactionPage;
