import { Input } from "antd";

export default function Config(handleChange) {
    const paramTranslation = {
        email: "E-mail",
        phone: "Telefone",
        gender: "Sexo",
        full_name: "Nome completo",
        insurance: "Convênio",
        date_of_birth: "Data de nascimento",
        admission_date: "Data de admissão",
    };

    const genderTranslation = {
        MALE: "Masculino",
        FEMALE: "Feminino"
    };

    function outputRender(_, record) {
        const value = record.param === 'gender'
            ? genderTranslation[record.output] || record.output
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
