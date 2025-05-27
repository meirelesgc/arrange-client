import { Table as AntTable } from "antd";

import { useFetchPatients, useDeletePatient } from '../../hooks/usePatient'

import config from "./table.config/Patient";

export function Table() {
    const { data, isLoading } = useFetchPatients()
    const { mutate } = useDeletePatient()

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