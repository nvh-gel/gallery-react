import React, {useEffect, useState} from "react";
import {Button, Divider, Image, Space, Table, Tag, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import axios from "axios";
import URL_CONFIG from "../../utils/URL_CONFIG";
import ModelData from "../../interface/ModelData";
import {DeleteOutlined, DownloadOutlined, LoginOutlined, SwapOutlined} from "@ant-design/icons";

const {Link} = Typography;

const columns: ColumnsType<ModelData> = [
    {
        // title: 'Name',
        key: 'name',
        dataIndex: ['name', 'url'],
        colSpan: 20,
        render: (_, {name, url, rel, images}) => (
            <>
                <Link href={url}>{name}</Link>
                <Divider type="vertical"/>
                {rel.map((tag) => <Tag key={tag} color="green">{tag.toUpperCase()}</Tag>)}
                <Divider/>
                {/*{images.map((image) => <Image key={image} src={image} width={300}/>)}*/}
                {images.map((image) => <Image key={image}
                                              src="https://i.pinimg.com/originals/26/94/fb/2694fbabf07537f8860153597b5d80bc.jpg"
                                              width={480}/>)}
            </>
        ),
    },
    {
        // title: 'Action',
        key: 'action',
        colSpan: 2,
        render: (_) => (
            <Space size="middle">
                <Button type="primary" shape="circle"><DownloadOutlined/></Button>
                <Button type="default" shape="circle"><LoginOutlined/></Button>
                <Button type="link" shape="circle"><SwapOutlined/></Button>
                <Button type="default" shape="circle" danger><DeleteOutlined/></Button>
            </Space>
        ),
    },
];

function CrawlerPage() {

    const [data, setData] = useState([]);

    function loadData() {

        const url = URL_CONFIG.BASE + "/crawl/model/1/20";
        const token = localStorage.getItem("token");
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).catch((e: Error) => {
            alert(e.message)
        }).then((response) => {
            console.log(response?.data)
            const result = response?.data.data;
            result.forEach((m: ModelData) => {
                m.key = m.objectId
            });
            setData(result);
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Table dataSource={data} columns={columns} showHeader={false}/>
    );
}

export default CrawlerPage;
