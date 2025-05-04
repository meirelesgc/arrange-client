import { useState } from "react";

import { message, Table as AntTable, Button, Card, Flex, Typography } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { usePatchMetrics } from "../../hooks/useArrange";

import config from '../tables/table.config/Metrics'
import { useParams } from "react-router-dom";

export function Table({ output }) {
    const { id } = useParams()
    const { mutate } = usePatchMetrics()
    const [messageApi, contextHolder] = message.useMessage();

    const [_output, _setOutput] = useState(Object.entries(output).map(([key, value], index) => ({
        key: index, param: key, output: value || []
    })))

    function handleChange(param, value) {
        const updated = _output.map(item => item.param === param ? { ...item, output: value } : item)
        _setOutput(updated)
    }

    function outputRollback(data) {
        return data.reduce((acc, item) => {
            acc[item.param] = item.output;
            return acc;
        }, {});
    }

    function handleSend() {
        const convertedOutput = outputRollback(_output);
        const hasMultipleValues = Object.values(convertedOutput).some(values => values.length > 1);
        if (hasMultipleValues) {
            messageApi.error("Cada parâmetro deve conter no máximo um valor.");
            return;
        }
        mutate({ id, output: convertedOutput });
    }

    return <Flex vertical gap='2.3rem'>
        {contextHolder}
        <AntTable
            bordered
            columns={config(handleChange)}
            dataSource={_output}
            rowKey={'key'}
            pagination={false} />
        <Card >
            <Button size="large" type="primary" style={{ width: '100%' }} onClick={handleSend}>Enviar metricas</Button>
        </Card>
    </Flex>
}
