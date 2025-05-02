import { Select } from "antd";

export default function Config(handleChange) {

    function outputRender(key, record) {
        return <Select mode="tags" style={{ width: '100%' }} value={record.output} onChange={(e) => handleChange(record.param, e)} />
    }
    return [
        {
            title: "Parâmetro",
            dataIndex: "param",
            key: "param",
            width: '50%',
        },
        {
            title: "Dado extraido",
            dataIndex: "output",
            key: "output",
            width: '50%',
            render: outputRender
        }
    ];
}
