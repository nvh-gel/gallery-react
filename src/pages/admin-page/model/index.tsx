import { Typography } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface ModelManagerProp {
    setSpinning: Dispatch<SetStateAction<boolean>>,
}

class ModelManager extends React.Component<ModelManagerProp> {

    render(): React.ReactNode {
        return (
            <Typography.Title level={2}>Model Manager Page</Typography.Title>
        );
    }
}

export default ModelManager;
