import { Typography, Space, Divider } from "antd"

function Button({ record, handleOpen, handleDelete }) {
    return <Space split={<Divider type="vertical" />}>
        <Typography.Link onClick={() => handleOpen(record)}>Abrir</Typography.Link>
        <Typography.Link onClick={() => handleDelete(record)}>Deletar</Typography.Link>
    </ Space>
}

export default function Config(handleOpen, handleDelete) {
    return [
        {
            dataIndex: 'id',
            key: 'id'
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
            width: '20%',
            ellipsis: true
        },
        {
            key: "action",
            render: (_, record) => {
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