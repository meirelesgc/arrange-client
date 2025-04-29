import { Table as AntTable } from "antd";

import { useFetchParams, useDeleteParam } from '../../hooks/useParam'

import config from "./table.config/Param";

export function Table() {
    const { data, isLoading } = useFetchParams()
    const { mutate } = useDeleteParam()

    const handleDelete = record => {
        mutate(record.id)
    }

    return <AntTable
        bordered
        columns={config(handleDelete)}
        dataSource={data}
        rowKey={'id'}
        loading={isLoading}
        pagination={false} />
}