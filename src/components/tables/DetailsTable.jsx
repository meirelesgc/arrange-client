import { useState } from "react";
import { useParams } from "react-router-dom";

import { message, Table as AntTable, Button, Card, Flex } from "antd";

import { usePatchDetails } from "../../hooks/useArrange";
import config from '../tables/table.config/Details';

export default function Table({ _output, _setOutput, isLoading }) {
    const { id } = useParams();
    const { mutate } = usePatchDetails();
    const [messageApi, contextHolder] = message.useMessage();

    function handleChange(param, value) {
        const updated = _output.map(item =>
            item.param === param ? { ...item, output: value } : item
        );
        _setOutput(updated);
    }

    function outputRollback(data) {
        return data.reduce((acc, item) => {
            acc[item.param] = item.output;
            return acc;
        }, {});
    }

    function handleSend() {
        const convertedOutput = outputRollback(_output);
        mutate({ id, output: convertedOutput });
    }

    return <Flex vertical gap='2.3rem'>
        {contextHolder}
        <AntTable
            loading={isLoading}
            bordered
            columns={config(handleChange)}
            dataSource={_output}
            rowKey={'key'}
            pagination={false} />
        <Card>
            <Button size="large" type="primary" style={{ width: '100%' }} onClick={handleSend}>
                Enviar detalhes
            </Button>
        </Card>
    </Flex>
}
