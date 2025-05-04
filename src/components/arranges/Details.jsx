import { Descriptions, Button, Flex, Card, Typography, Skeleton, Divider } from "antd"
import { ClockCircleOutlined, SyncOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { Table } from "../tables/DetailsTable";

import { useGetDetails, usePutDetails } from "../../hooks/useArrange"

import { useParams } from "react-router-dom";

export default function Details() {
    const { id } = useParams()
    const { data, isLoading } = useGetDetails(id)
    const { mutate } = usePutDetails()

    if (isLoading) return <Card style={{ padding: '20px' }}>
        <Skeleton />
    </Card>

    function handleArrange() {
        mutate(id)
    }

    const statusIcon = { "STANDBY": { icon: <ClockCircleOutlined />, label: "Aguardando" }, "IN-PROCESS": { icon: <SyncOutlined spin />, label: "Em Processo" }, "FAILED": { icon: <ExclamationCircleOutlined />, label: "Falha" }, "DONE": { icon: <CheckCircleOutlined />, label: "Concluído" } };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const metadata = [
        { key: '1', label: 'Status', children: <p>{statusIcon[data.status].label ?? data.status}</p> },
        { key: '2', label: 'Duração', children: <p>{data.duration ? `${data.duration} segundos` : '—'}</p> },
        { key: '3', label: 'Atualizado em', children: <p>{data.updated_at ? formatDate(data.updated_at) : '—'}</p> }
    ];

    return <Flex vertical gap='2.3rem'>
        <Card style={{ padding: '20px' }}>
            <Flex vertical gap={'large'}>
                <Flex vertical>
                    <Typography.Title level={2} strong>Dados do documento</Typography.Title>
                    <Typography.Text type="secondary" strong>
                        Essas informações nos ajudam a organizar as tabelas posteriormente
                    </Typography.Text>
                </Flex>
            </Flex>
            <Divider />
            <Flex justify="space-between" align="center" gap={'large'}>
                <Descriptions items={metadata} />
                <Button size="large" type="primary" onClick={handleArrange}>Realizar extração</Button>
            </Flex>
        </Card>
        {!data.output ? <div>EM OBRAS</div> : <Table output={data.output} />}
    </Flex>
}