import React, {useCallback, useEffect, useState} from "react";
import {Button, Carousel, Col, Divider, Image, List, message, Row, Space, Tag, Tooltip, Typography} from "antd";
import axios from "axios";
import URLS from "../../utils/URLS";
import ModelData from "../../interface/ModelData";
import {DeleteOutlined, DownloadOutlined, LoginOutlined, SwapOutlined} from "@ant-design/icons";
import "./crawler.css";
import {PaginationConfig} from "antd/es/pagination";
import RatingForm from "../../components/form/modelrating";

const {Link} = Typography;

function CrawlerPage(props: any) {

    const {setSpinning} = props;
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [size, setSize] = useState(10);
    const paging: PaginationConfig = {
        onChange: handlePageChange,
        pageSize: size,
        total: total,
        responsive: true,
        hideOnSinglePage: true,
        showQuickJumper: false,
        showSizeChanger: false,
    }
    const token = localStorage.getItem("token");

    const loadData = useCallback((page: number, size: number) => {
        setSpinning(true);
        const pagingParam = `/${page}/${size}`;
        const url = URLS.BASE + URLS.CRAWL_MODEL + pagingParam;
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).catch((e: Error) => {
            setSpinning(false);
            alert(e.message)
        }).then((response) => {
            const result = response?.data.data;
            result.forEach((m: ModelData) => {
                m.key = m.objectId
            });
            const total: number = response?.data.extra.total
            setData(result);
            setTotal(total);
            setSpinning(false);
        });
    }, [setSpinning, token])

    const meta = (item: ModelData) => {
        return (
            <List.Item.Meta
                title={
                    <Space direction="vertical">
                        <Link href={item.url}>{item.name}</Link>
                        <Divider/>
                    </Space>
                }
                description={item.rel.map((tag) => {
                    let color = tag.length > 8 ? "blue" : "green";
                    color = tag.length > 15 ? "red" : color;
                    return <Tag key={tag} color={color} className="model-tag">{tag.toUpperCase()}</Tag>;
                })}
            />
        );
    }

    const carousel = (item: ModelData) => {
        return (
            <Image.PreviewGroup key={item.objectId}>
                <Carousel autoplay>
                    {item.images.map((image) => {
                        const key = Math.random();
                        return (
                            <Image key={`${image}-${key}`} src={image} width={685} height={360}/>
                        );
                    })}
                </Carousel>
            </Image.PreviewGroup>
        );
    }


    function handleError(e: Error) {
        message.error(e.message).then();
    }

    function handleSkip(e: any, objectId: string) {
        setSpinning(true);
        const url = URLS.BASE + URLS.CRAWL_MODEL + URLS.SKIP + '/' + objectId;
        axios.put(url, null, {headers: {Authorization: `Bearer ${token}`}})
            .catch(handleError)
            .then((response) => {
                message.success(response?.data.message).then(() => loadData(page, size));
            })
    }

    function action(item: ModelData) {
        return (
            <Space size="middle" direction="vertical">
                <Tooltip placement="right" title="Save">
                    <Button type="primary" shape="circle" name="save"><DownloadOutlined/></Button>
                </Tooltip>
                <Tooltip placement="right" title="Move">
                    <Button type="default" shape="circle"><LoginOutlined/></Button>
                </Tooltip>
                <Tooltip placement="right" title="Link">
                    <Button type="dashed" shape="circle"><SwapOutlined/></Button>
                </Tooltip>
                <Tooltip placement="right" title="Skip">
                    <Button type="default" shape="circle" danger
                            onClick={(e: any) => {
                                return handleSkip(e, item.objectId)
                            }}
                    >
                        <DeleteOutlined/>
                    </Button>
                </Tooltip>
            </Space>
        );
    }

    function handlePageChange(pageNumber: number, pageSize: number) {
        setSpinning(true);
        setData([]);
        setPage(pageNumber);
        setSize(pageSize);
    }

    useEffect(() => {
        loadData(page, size);
    }, [page, size, setSpinning, token, loadData])

    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            pagination={paging}
            renderItem={(item: ModelData) => {
                return (
                    <List.Item key={item.objectId}>
                        <Row align="middle" justify="space-between">
                            <Col span={4}>{meta(item)}</Col>
                            <Col span={12}>{carousel(item)}</Col>
                            <Col span={6}><RatingForm item={item}/></Col>
                            <Col span={2}>{action(item)}</Col>
                        </Row>
                    </List.Item>
                );
            }}
        />
    );
}

export default CrawlerPage;
