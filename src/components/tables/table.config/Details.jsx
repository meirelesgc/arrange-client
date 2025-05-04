import { Input } from "antd";

export default function Config(handleChange) {

    function outputRender(_, record) {
        return <Input style={{ width: '100%' }} value={record.output}
            onChange={(e) => handleChange(record.param, e.target.value)} />
    }

    return [
        {
            title: "Parâmetro",
            dataIndex: "param",
            key: "param",
            width: '50%',
        },
        {
            title: "Dado extraído",
            dataIndex: "output",
            key: "output",
            width: '50%',
            render: outputRender
        }
    ];
}
