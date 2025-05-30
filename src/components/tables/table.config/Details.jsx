import { Input } from "antd";

export default function Config(handleChange) {

    const paramTranslation = {
        cnpj: "CNPJ",
        issued_by: "Emitido por",
        document_type: "Tipo de documento",
        hospital_name: "Nome do hospital",
        printing_datetime: "Data/hora da impressão",
    };

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
            render: (param) => paramTranslation[param] || param
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
