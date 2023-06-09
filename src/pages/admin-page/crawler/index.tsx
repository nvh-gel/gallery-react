import { SearchOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { Button, Carousel, Col, Divider, Image, Input, List, Row, Space, Tag, Typography, message } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Action from "../../../components/action";
import RatingForm from "../../../components/form/model-rating";
import { AdminPageProp } from "../../../interface/AdminPageProp";
import { ModelData } from "../../../interface/ModelData";
import { hasAccessTo } from "../../../interface/User";
import Dictionary from "../../../utils/Dictionary";
import { config } from "../../../utils/Requests";
import { Urls } from "../../../utils/Urls";
import "./crawler.css";

const { Link } = Typography;

function CrawlerPage(props: AdminPageProp) {

    const { currentUser, setSpinning, navigate } = props;
    const { pageParam } = useParams();
    const currentPage = pageParam && pageParam !== null ? parseInt(pageParam) : 1;
    const [page, setPage] = useState(currentPage);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const size = 10;
    const [editData, setEditData] = useState<Dictionary<ModelData>>({});
    const pathName = "/admin/crawler"
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

    const paging: PaginationConfig = {
        onChange: handlePageChange,
        current: page,
        pageSize: size,
        total: total,
        responsive: true,
        hideOnSinglePage: true,
        showQuickJumper: false,
        showSizeChanger: false,
    }

    const loadData = useCallback((page: number, size: number) => {
        setSpinning(true)
        const url = `${Urls.BASE}${Urls.CRAWL}${Urls.MODEL}/${page}/${size}`;
        axios.get(url, config)
            .catch((e: Error) => {
                setSpinning(false);
                message.error(e.message);
            })
            .then((response) => {
                const result = response?.data.data;
                result.forEach((m: ModelData) => {
                    m.key = m.objectId
                });
                const total: number = response?.data.extra.total
                setData(result);
                setTotal(total);
                setSpinning(false);
            });
    }, [setSpinning])

    const meta = (item: ModelData) => {
        return (
            <List.Item.Meta
                title={
                    <Space direction="vertical">
                        <Link href={item.url} target="_blank">{item.name}</Link>
                        <Divider />
                    </Space>
                }
                description={item.rel.map((tag) => {
                    let color = tag.isPublisher ? 'blue' : 'green'
                    color = tag.isCategory ? 'red' : color
                    return <Tag key={tag.name} color={color} className="model-tag">{tag.name.toUpperCase()}</Tag>;
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
                            <Image key={`${image}-${key}`} src={image} width={685} height={360} />
                        );
                    })}
                </Carousel>
            </Image.PreviewGroup>
        );
    }

    function handleToggleSearch() {
        setShowSearchBox(!showSearchBox);
    }

    function handleTopModel() {
        setSpinning(true);
        setData([]);
        const url = `${Urls.BASE}${Urls.CRAWL}${Urls.MODEL}/top/${size}`;
        axios.get(url, config)
            .catch((e: Error) => {
                setSpinning(false);
            })
            .then((response) => {
                const result = response?.data.data;
                setData(result);
                setTotal(size);
                setSpinning(false);
            })
    }

    function handleSearch(e: any) {
        setSearchValue(e.target.value);
    }

    const header = (
        <Row style={{ height: '1rem' }} justify="end" align="middle">
            <Col></Col>
            <Col>
                <Space direction="horizontal">
                    <Input
                        style={{ borderRadius: '50px', display: showSearchBox ? 'block' : 'none' }}
                        onInput={handleSearch}
                    />
                    <Button shape="circle" onClick={handleToggleSearch}>
                        <SearchOutlined />
                    </Button>
                    <Button shape="circle" onClick={handleTopModel}>
                        <VerticalAlignTopOutlined />
                    </Button>
                </Space>
            </Col>
        </Row>
    );

    function handlePageChange(pageNumber: number, pageSize: number) {
        setData([]);
        setPage(pageNumber);
        navigate("/admin/crawler/" + pageNumber);
    }

    useEffect(() => {
        if (!hasAccessTo(currentUser, pathName)) {
            navigate("/admin/unauthorized");
        }
        loadData(page, size);
    }, [page, size, setSpinning, loadData, currentUser, navigate]);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (searchValue !== undefined) {
                setSpinning(true);
                setData([]);
                setPage(1);
                const url = `${Urls.BASE}${Urls.CRAWL}${Urls.SEARCH}/${page}/${size}?name=${searchValue}`;
                axios.get(url, config)
                    .catch((e: Error) => {
                        setSpinning(false);
                    })
                    .then((response) => {
                        const result = response?.data.data;
                        setData(result);
                        setTotal(size);
                        setSpinning(false);
                    });
            }
        }, 1000);
        return () => clearTimeout(timeOut);
    }, [searchValue, page, setSpinning]);

    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            pagination={paging}
            header={header}
            renderItem={(item: ModelData) => {
                return (
                    <List.Item key={item.objectId}>
                        <Row align="middle" justify="space-between">
                            <Col span={4}>{meta(item)}</Col>
                            <Col span={12}>{carousel(item)}</Col>
                            <Col span={6}>
                                <RatingForm
                                    item={item}
                                    editData={editData}
                                    setEditData={setEditData}
                                    setSpinning={setSpinning}
                                />
                            </Col>
                            <Col span={2}>
                                <Action
                                    item={item}
                                    setSpinning={setSpinning}
                                    loadData={loadData}
                                    page={page}
                                    size={size}
                                    editData={editData}
                                    setEditData={setEditData}
                                />
                            </Col>
                        </Row>
                    </List.Item>
                );
            }}
        >
        </List>
    );
}

export default CrawlerPage;
