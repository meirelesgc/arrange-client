import { useNavigate } from 'react-router-dom';

import { Table as AntTable } from "antd";

import { useFetchDocs, useDeleteDoc } from '../../hooks/useDoc'

import config from "./table.config/Doc";

export function Table() {
    const { data, isLoading } = useFetchDocs()
    const { mutate } = useDeleteDoc()
    const navigate = useNavigate();

    const handleOpen = record => {
        navigate(`/doc/${record.id}/`)
    }

    const handleDelete = record => {
        mutate(record.id)
    }

    return <AntTable
        bordered
        columns={config(handleOpen, handleDelete)}
        dataSource={data}
        rowKey={'id'}
        loading={isLoading}
        pagination={false} />
}