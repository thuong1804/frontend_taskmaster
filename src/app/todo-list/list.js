'use client';
import { Avatar, Button, List, Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const ListContent = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [isCheckLogin, setIsCheckLogin] = useState([])
    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setList(res.results);
            });
    }, []);
    console.log({ list, data })

    useEffect(() => {
        const fetchData = async () => {
            await axios({
                method: 'get',
                url: 'http://localhost:3005/task/get-task',
            }).then((res) => {
                console.log({ res })
                return setData(res.data.content)
            });
        }
        fetchData();
    }, [])

    const onLoadMore = () => {
        setLoading(true);

    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;

    return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            // avatar={<Avatar } />}
                            title={item.taskTitle}
                            description={item.taskDescription}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}
export default ListContent