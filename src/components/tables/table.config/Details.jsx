import { Input } from "antd";

export default function Config(handleChange) {
    const paramTranslation = {
        cnpj: "CNPJ",
        issued_by: "Emitido por",
        document_type: "Tipo de documento",
        hospital_name: "Nome do hospital",
        printing_datetime: "Data/hora da impressão",
    };

    const documentTypeTranslation = {
        MEDICAL_EVOLUTION: "Evolução médica",
        LABORATORY_EXAM: "Exame laboratorial",
        MEDICAL_PRESCRIPTION: "Prescrição médica",
        MEDICAL_REPORT: "Relatório médico",
        FOLLOW_UP_LETTER: "Carta de seguimento",
        DISCHARGE_SUMMARY: "Resumo de alta",
        MEDICAL_CERTIFICATE: "Atestado médico",
        CONSENT_TERMS: "Termos de consentimento",
        MEDICAL_RECORD: "Prontuário médico"
    };

    function outputRender(_, record) {
        const value = record.param === 'document_type'
            ? documentTypeTranslation[record.output] || record.output
            : record.output;

        return <Input style={{ width: '100%' }} value={value}
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
