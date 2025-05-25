import { Descriptions, Button, Flex, Card, Typography, Skeleton, Divider } from "antd"
import { ClockCircleOutlined, SyncOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { useParams } from "react-router-dom";

export default function Banner({ title, description, data, mutate, onSave, disableSave = false }) {
    const { id } = useParams()

    function handleArrange() {
        mutate(id)
    }

    function handleSave() {
        if (onSave) onSave(id);
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
                    <Typography.Title level={2} strong>{title}</Typography.Title>
                    <Typography.Text type="secondary" strong>{description}</Typography.Text>
                </Flex>
            </Flex>
            <Divider />
            <Flex justify="space-between" align="center" gap={'large'}>
                <Descriptions items={metadata} />
                <Flex gap="middle">
                    <Button size="large" onClick={handleSave} disabled={disableSave}>
                        Salvar alterações
                    </Button>
                    <Button size="large" type="primary" onClick={handleArrange}>
                        Realizar extração
                    </Button>
                </Flex>
            </Flex>
        </Card>
    </Flex>
}