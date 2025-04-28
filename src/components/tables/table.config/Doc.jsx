import { Typography, Space, Divider, Tooltip } from "antd"
import { ClockCircleOutlined, SyncOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

function Button({ record, handleOpen, handleDelete }) {
    return <Space split={<Divider type="vertical" />}>
        <Typography.Link onClick={() => handleOpen(record)}>Abrir</Typography.Link>
        <Typography.Link onClick={() => handleDelete(record)}>Deletar</Typography.Link>
    </ Space>
}

const statusIcon = {
    "STANDBY": { icon: <ClockCircleOutlined />, tooltip: "Aguardando" },
    "IN-PROCESS": { icon: <SyncOutlined spin />, tooltip: "Em Processo" },
    "FAILED": { icon: <ExclamationCircleOutlined />, tooltip: "Falha" },
    "DONE": { icon: <CheckCircleOutlined />, tooltip: "Concluído" }
};

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-BR',
    { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
);

export default function Config(handleOpen, handleDelete) {
    return [
        {
            dataIndex: 'status',
            key: 'status',
            render: (record) => {
                const { icon, tooltip } = statusIcon[record] || {}
                return <Tooltip title={tooltip}>
                    {icon}
                </Tooltip>
            },
            width: '5%',
            align: 'center'
        },
        {
            dataIndex: 'id',
            key: 'id',
            title: "Identificador",
            width: '20%',
            ellipsis: true
        },
        {
            dataIndex: 'name',
            key: 'name',
            title: 'Nome',
            width: '40%',
            ellipsis: true
        },
        {
            dataIndex: "created_at",
            key: "created_at",
            title: "Adicionado em",
            render: formatDate,
            width: '20%',
            ellipsis: true
        },
        {
            key: "action",
            render: (record) => {
                return <Button
                    record={record}
                    handleOpen={handleOpen}
                    handleDelete={handleDelete} />
            },
            width: '15%',
            align: 'center'
        }
    ]
}