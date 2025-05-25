import { Table as AntTable, Button, Card, message, Flex } from "antd";

export default function ArTable({ data, setData, isLoading, configColumns, }) {
    const [msg, ctx] = message.useMessage();

    function handleChange(param, value) {
        setData(prev =>
            prev.map(item =>
                item.param === param ? { ...item, output: value } : item
            )
        );
    }

    return <Flex vertical gap="2.3rem">
        {ctx}
        <AntTable
            loading={isLoading}
            columns={configColumns(handleChange)}
            dataSource={data}
            rowKey="param"
            pagination={false}
            bordered />
    </Flex>
}