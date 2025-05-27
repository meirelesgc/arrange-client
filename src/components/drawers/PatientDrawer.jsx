import { Typography, Drawer as AntDrawer, Form, Input, DatePicker, Select, Flex, Space, Button } from 'antd';
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useCreatePatient } from '../../hooks/usePatient';

export default function Drawer({ title, toggleDrawer, open }) {
    const [form] = Form.useForm();
    const { mutate } = useCreatePatient();

    const handleAbort = () => {
        form.resetFields();
        toggleDrawer();
    };

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                const completeValues = {
                    full_name: values.full_name,
                    date_of_birth: values.date_of_birth ? values.date_of_birth.format('YYYY-MM-DD') : null,
                    gender: values.gender || null,
                    phone: values.phone || null,
                    email: values.email || null,
                };
                mutate(completeValues);
                form.resetFields();
                toggleDrawer();
            })
            .catch(() => { });
    };


    return <AntDrawer title={title} onClose={toggleDrawer} open={open} size="large"
        footer={
            <Flex gap='large' justify='space-around'>
                <Button type="primary" icon={<CheckOutlined />} onClick={handleSubmit}>Enviar</Button>
                <Button icon={<CloseOutlined />} onClick={handleAbort}>Cancelar</Button>
            </Flex>
        }>
        <Form layout="vertical" form={form} initialValues={{ gender: undefined }}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Title level={5} strong>Nome completo:</Typography.Title>
                <Form.Item name="full_name" rules={[{ required: true, message: 'Nome é obrigatório' }]}>
                    <Input />
                </Form.Item>
            </Space>

            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Title level={5} strong>Data de nascimento:</Typography.Title>
                <Form.Item name="date_of_birth">
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>
            </Space>

            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Title level={5} strong>Gênero:</Typography.Title>
                <Form.Item name="gender">
                    <Select options={[
                        { label: 'Masculino', value: 'MALE' },
                        { label: 'Feminino', value: 'FEMALE' },
                    ]} placeholder="Selecione o gênero" />
                </Form.Item>
            </Space>

            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Title level={5} strong>Telefone:</Typography.Title>
                <Form.Item name="phone">
                    <Input />
                </Form.Item>
            </Space>

            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Title level={5} strong>Email:</Typography.Title>
                <Form.Item name="email" rules={[{ type: 'email', message: 'Email inválido' }]}>
                    <Input />
                </Form.Item>
            </Space>
        </Form>
    </AntDrawer>
}
