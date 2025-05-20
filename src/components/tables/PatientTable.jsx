import { useState } from "react";
import { useParams } from "react-router-dom"

import { message, Table as AntTable, Button, Card, Flex } from "antd";

import { usePatchPatient } from "../../hooks/useArrange";
import config from '../tables/table.config/Patient';

export function Table({ output }) {
    const { id } = useParams();
    const { mutate } = usePatchPatient()
    const [messageApi, contextHolder] = message.useMessage();

    const [_output, _setOutput] = useState(
        Object.entries(output).map(([key, value], index) => ({
            key: index, param: key, output: value || ""
        }))
    );
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
    return <Flex vertical gap='2.3rem' >
        {contextHolder}
        <AntTable
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