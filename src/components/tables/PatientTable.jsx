import { Table as AntTable } from "antd";

import { useFetchPatients, useDeletePatient } from '../../hooks/usePatient'

import config from "./table.config/Patient";

export function Table({ setPatients }) {
    const { data, isLoading } = useFetchPatients()
    const { mutate } = useDeletePatient()

    const handleDelete = record => {
        mutate(record.id)
    }

    const rowSelection = {
        width: '5%',
        onChange: (selectedRowKeys, selectedRows) => {
            setPatients(selectedRows)
        }
    };

    return <AntTable
        bordered
        columns={config(handleDelete)}
        dataSource={data}
        rowKey={'id'}
        loading={isLoading}
        pagination={false}
        rowSelection={rowSelection} />
}