import { Typography, Space, Divider } from "antd"

function Button({ record, handleDelete }) {
    return <Space split={<Divider type="vertical" />}>
        <Typography.Link onClick={() => handleDelete(record)}>Deletar</Typography.Link>
    </ Space>
}

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-BR',
    { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
);

export default function Config(handleDelete) {
    return [
        {
            dataIndex: 'status',
            key: 'status',
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
            dataIndex: 'full_name',
            key: 'full_name',
            title: 'Nome Completo',
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
                    handleDelete={handleDelete} />
            },
            width: '15%',
            align: 'center'
        }
    ]
}