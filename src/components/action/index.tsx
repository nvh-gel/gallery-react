import { DeleteOutlined, DownloadOutlined, LoginOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip, message } from "antd";
import axios from "axios";
import CrawlItemProp from "../../interface/CrawlItemProp";
import URLS from "../../utils/URLS";

export default function Action({ item, setSpinning, loadData }: CrawlItemProp) {

    const token = localStorage.getItem('token');

    function handleSkip(e: any, objectId: string) {
        if (setSpinning) {
            setSpinning(true);
        }
        const url = URLS.BASE + URLS.CRAWL_MODEL + URLS.SKIP + '/' + objectId;
        axios.put(url, null, { headers: { Authorization: `Bearer ${token}` } })
            .catch((e: Error) => { message.error(e.message); })
            .then((response) => {
                if (loadData) {
                    message.success(response?.data.message).then(() => loadData(1, 10));
                }
            });
    }

    return (
        <Space size="middle" direction="vertical">
            <Tooltip placement="right" title="Save">
                <Button type="primary" shape="circle" name="save"><DownloadOutlined /></Button>
            </Tooltip>
            <Tooltip placement="right" title="Move">
                <Button type="default" shape="circle"><LoginOutlined /></Button>
            </Tooltip>
            <Tooltip placement="right" title="Link">
                <Button type="dashed" shape="circle"><SwapOutlined /></Button>
            </Tooltip>
            <Tooltip placement="right" title="Skip">
                <Button type="default" shape="circle" danger
                    onClick={(e: any) => {
                        return handleSkip(e, item.objectId)
                    }}
                >
                    <DeleteOutlined />
                </Button>
            </Tooltip>
        </Space>
    );
}
