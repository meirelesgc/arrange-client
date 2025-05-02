import { useParams } from "react-router-dom";

import { Button, Card, Descriptions, Divider, Flex, Skeleton, Typography } from "antd"

import { useGetMetrics, usePutMetrics } from "../../hooks/useArrange"

import { Table } from "../tables/MetricsTable";

export default function Metrics() {
    const { id } = useParams();
    const { data, isLoading } = useGetMetrics(id)
    const { mutate } = usePutMetrics()

    function handleArrange() {
        mutate(id)
    }

    if (isLoading) return <Card style={{ padding: '20px' }}>
        <Skeleton />
    </Card>


    const metadata = [
        { key: '1', label: 'Status', children: <p>{data.status}</p> },
        { key: '2', label: 'Duração', children: <p>{data.duration ?? '—'}</p> },
        { key: '3', label: 'Atualizado em', children: <p>{data?.updated_at ?? '—'}</p> }
    ]

    return <Flex vertical gap='2.3rem'>
        <Card style={{ padding: '20px' }}>
            <Flex vertical gap={'large'}>
                <Flex vertical>
                    <Typography.Title level={2} strong>Metricas extraidas</Typography.Title>
                    <Typography.Text type="secondary" strong>
                        Dados médicos baseados na lista de parametros previamente cadastrados
                    </Typography.Text>
                </Flex>
            </Flex>
            <Divider />
            <Flex justify="space-between" align="center" gap={'large'}>
                <Descriptions items={metadata} />
                <Button size="large" type="primary" onClick={handleArrange}>Realizar extração</Button>
            </Flex>
        </Card>
        <Table output={data.output} />
    </Flex>

}
