import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import { useState } from "react";
import "./image_box.css";

export default function ImageBox(props: any) {

    const { images } = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    function handlePreviousImg() {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        setCurrentIndex(newIndex);
    }

    function handleNextImg() {
        const newIndex = currentIndex > images.length - 2 ? images.length - 1 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return (
        <Space direction="horizontal" className="image-box">
            <Image src={images[currentIndex]} preview={false} width={700} />
            <Button onClick={handlePreviousImg} className="button-left">
                <LeftOutlined />
            </Button>
            <Button onClick={handleNextImg} className="button-right">
                <RightOutlined />
            </Button>
        </Space>
    )
};
